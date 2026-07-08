import { useMemo } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { Column } from '@/services/column/components/Column';
import { ColumnSkeleton } from '@/services/column/components/ColumnSkeleton';
import { cn } from '@/shared/utils/cn';
import { getErrorMessage } from '@/shared/utils/get-error-message';
import { useDndBoard } from '../hooks/use-dnd-board';

interface IProps {
    boardId: string;
}

export const KanbanBoard = ({ boardId }: IProps) => {
    const { t } = useTranslation();
    const { isLoading, isError, localColumns, error, onDragStart, onDragEnd } =
        useDndBoard(boardId);

    const content = useMemo(() => {
        if (isLoading)
            return (
                <div className="flex min-w-max gap-4 max-md:gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <ColumnSkeleton key={i} />
                    ))}
                </div>
            );

        if (isError)
            return (
                <div className="py-24 text-center text-lg font-semibold text-red-600">
                    {t('column.loadError', { error: getErrorMessage(error) })}
                </div>
            );

        if (localColumns.length === 0)
            return (
                <div className="py-24 text-center text-lg text-gray-500">
                    {t('column.noColumns')}
                </div>
            );

        return (
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="board"
                    direction="horizontal"
                    type="COLUMN"
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex min-w-max gap-4 max-md:gap-2"
                        >
                            {localColumns.map((column, index) => (
                                <Draggable
                                    key={column.id}
                                    draggableId={column.id}
                                    index={index}
                                >
                                    {(colProvided) => (
                                        <section
                                            ref={colProvided.innerRef}
                                            {...colProvided.draggableProps}
                                            className="shrink-0"
                                        >
                                            <Column
                                                column={column}
                                                dragHandleProps={
                                                    colProvided.dragHandleProps
                                                }
                                            />
                                        </section>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }, [isLoading, isError, localColumns, t, error]);

    return (
        <div
            className={cn(
                'overflow-x-auto overflow-y-hidden pb-5',
                'overscroll-x-contain overscroll-y-auto',
                'scrollbar-gutter-stable',
                'scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-border',
            )}
        >
            {content}
        </div>
    );
};
