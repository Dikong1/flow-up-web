import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';

import { useGetAllColumnsQuery } from '@/services/column/api/hooks';
import { Badge } from '@/shared/ui/shadcn/badge';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/shadcn/select';
import { useMoveTaskMutation } from '@/services/task/api/hooks';
import type { TableTask } from '@/services/task/types/table-task';

interface Props {
    task: TableTask;
}

export const StatusCell = ({ task }: Props) => {
    const { t } = useTranslation();
    const { boardId } = useParams();

    const { data: columns } = useGetAllColumnsQuery(boardId ?? skipToken);
    const [moveTask] = useMoveTaskMutation();

    const [selectedColId, setSelectedColId] = useState(task.colId);

    useEffect(() => {
        setSelectedColId(task.colId);
    }, [task.colId]);

    const selectedColumn = columns?.find(
        (column) => column.id === selectedColId,
    );

    const todoCols = columns?.filter((col) => col.status === 'TODO') ?? [];
    const inProgressCols =
        columns?.filter((col) => col.status === 'IN_PROGRESS') ?? [];
    const doneCols = columns?.filter((col) => col.status === 'DONE') ?? [];

    const handleChange = async (newColId: string) => {
        const previousColId = selectedColId;

        // оптимистичное обновление
        setSelectedColId(newColId);

        try {
            if (boardId) {
                moveTask({
                    taskId: task.id,
                    boardId,
                    colId: task.colId,
                    body: {
                        targetColId: newColId,
                    },
                });

                console.log('Moved to column:', newColId);
            }
        } catch {
            // откат
            setSelectedColId(previousColId);
        }
    };

    return (
        <Select value={selectedColId} onValueChange={handleChange}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue>
                    <Badge
                        style={{ backgroundColor: selectedColumn?.color }}
                        className="relative flex items-center gap-1"
                    >
                        <span className="text-white">
                            {selectedColumn?.name}
                        </span>
                    </Badge>
                </SelectValue>
            </SelectTrigger>

            <SelectContent>
                {todoCols.length > 0 && (
                    <SelectGroup>
                        <SelectLabel>{t('column.todo')}</SelectLabel>

                        {todoCols.map((col) => (
                            <SelectItem key={col.id} value={col.id}>
                                <Badge
                                    style={{
                                        backgroundColor: col.color,
                                    }}
                                    className="flex items-center gap-1"
                                >
                                    <span className="text-white">
                                        {col.name}
                                    </span>
                                </Badge>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                )}

                {inProgressCols.length > 0 && (
                    <SelectGroup>
                        <SelectLabel>{t('column.inProgress')}</SelectLabel>

                        {inProgressCols.map((col) => (
                            <SelectItem key={col.id} value={col.id}>
                                <Badge
                                    style={{
                                        backgroundColor: col.color,
                                    }}
                                    className="flex items-center gap-1"
                                >
                                    <span className="text-white">
                                        {col.name}
                                    </span>
                                </Badge>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                )}

                {doneCols.length > 0 && (
                    <SelectGroup>
                        <SelectLabel>{t('column.done')}</SelectLabel>

                        {doneCols.map((col) => (
                            <SelectItem key={col.id} value={col.id}>
                                <Badge
                                    style={{
                                        backgroundColor: col.color,
                                    }}
                                    className="flex items-center gap-1"
                                >
                                    <span className="text-white">
                                        {col.name}
                                    </span>
                                </Badge>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                )}
            </SelectContent>
        </Select>
    );
};
