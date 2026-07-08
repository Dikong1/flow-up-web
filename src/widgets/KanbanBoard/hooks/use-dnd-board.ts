import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
    useChangeOrderMutation,
    useGetAllColumnsQuery,
} from '@/services/column/api/hooks/';
import { useMoveTaskMutation } from '@/services/task/api/hooks';
import { arrayMove, normalizeOrders, sortByOrder } from '../lib/';

import type { DragStart, DropResult } from '@hello-pangea/dnd';
import type { IColumn } from '@/services/column/types/column';

export const useDndBoard = (boardId: string | undefined) => {
    const { t } = useTranslation();
    const {
        data: columns,
        isLoading,
        isError,
        error,
    } = useGetAllColumnsQuery(boardId ?? skipToken);

    const [moveTask] = useMoveTaskMutation();
    const [changeOrderCol] = useChangeOrderMutation();

    const [localColumns, setLocalColumns] = useState<IColumn[]>([]);

    const columnsSnapshotRef = useRef<IColumn[]>([]);
    const activeTaskRef = useRef<{
        id: string;
        fromColId: string;
        fromOrder: number;
    } | null>(null);

    const isDirtyRef = useRef(false);

    const colIds = useMemo(() => localColumns.map((c) => c.id), [localColumns]);

    useEffect(() => {
        if (!columns) return;
        if (isDirtyRef.current) return;

        const sorted = sortByOrder(columns).map((c) => ({
            ...c,
            tasks: sortByOrder(c.tasks),
        }));

        setLocalColumns(sorted);
    }, [columns]);

    const onDragStart = useCallback(
        (start: DragStart) => {
            isDirtyRef.current = true;
            columnsSnapshotRef.current = localColumns;

            if (start.type === 'TASK') {
                const taskId = start.draggableId;
                const fromColId = String(start.source.droppableId);
                const fromIndex = start.source.index;

                const col = localColumns.find((c) => c.id === fromColId);
                const fromOrder =
                    col?.tasks?.[fromIndex]?.order ?? fromIndex + 1;

                activeTaskRef.current = { id: taskId, fromColId, fromOrder };
            } else {
                activeTaskRef.current = null;
            }
        },
        [localColumns],
    );

    const onDragEnd = useCallback(
        async (result: DropResult) => {
            if (!boardId) return;

            const { destination, source, type } = result;

            if (!destination) {
                activeTaskRef.current = null;
                isDirtyRef.current = false;
                return;
            }

            if (type === 'COLUMN') {
                const from = source.index;
                const to = destination.index;

                if (from === to) {
                    isDirtyRef.current = false;
                    return;
                }

                const movedCol = localColumns[from];
                if (!movedCol) {
                    isDirtyRef.current = false;
                    return;
                }

                setLocalColumns((prev) =>
                    normalizeOrders(arrayMove(prev, from, to)),
                );

                try {
                    await changeOrderCol({
                        boardId,
                        colId: movedCol.id,
                        body: {
                            newOrder: to + 1,
                        },
                    }).unwrap();
                } catch {
                    toast.error(t('column.moveColumnError'));
                    setLocalColumns(columnsSnapshotRef.current);
                } finally {
                    isDirtyRef.current = false;
                }

                return;
            }

            if (type === 'TASK') {
                const taskId = result.draggableId;

                const fromColId = source.droppableId;
                const toColId = destination.droppableId;

                const fromIndex = source.index;
                const toIndex = destination.index;

                setLocalColumns((prev) => {
                    const next = prev.map((c) => ({
                        ...c,
                        tasks: [...c.tasks],
                    }));

                    const fromCol = next.find((c) => c.id === fromColId);
                    const toCol = next.find((c) => c.id === toColId);
                    if (!fromCol || !toCol) return prev;

                    const [moved] = fromCol.tasks.splice(fromIndex, 1);
                    if (!moved) return prev;

                    const movedUpdated =
                        fromColId === toColId
                            ? moved
                            : { ...moved, colId: toColId };

                    toCol.tasks.splice(toIndex, 0, movedUpdated);

                    if (fromColId === toColId) {
                        fromCol.tasks = normalizeOrders(fromCol.tasks);
                        toCol.tasks = fromCol.tasks;
                    } else {
                        fromCol.tasks = normalizeOrders(fromCol.tasks);
                        toCol.tasks = normalizeOrders(toCol.tasks);
                    }

                    return next;
                });

                const newOrder = toIndex + 1;

                const prevMeta = activeTaskRef.current;
                if (
                    prevMeta &&
                    prevMeta.fromColId === toColId &&
                    prevMeta.fromOrder === newOrder
                ) {
                    activeTaskRef.current = null;
                    isDirtyRef.current = false;
                    return;
                }

                try {
                    await moveTask({
                        boardId,
                        colId: fromColId,
                        taskId,
                        body: {
                            targetColId: toColId,
                            newOrder,
                        },
                    }).unwrap();
                } catch {
                    toast.error(t('task.moveTaskError'));
                    setLocalColumns(columnsSnapshotRef.current);
                } finally {
                    activeTaskRef.current = null;
                    isDirtyRef.current = false;
                }
            }
        },
        [boardId, localColumns, changeOrderCol, moveTask, t],
    );

    return {
        isLoading,
        isError,
        error,
        columns,
        localColumns,
        colIds,
        onDragStart,
        onDragEnd,
    };
};
