import { GripVertical } from 'lucide-react';
import { TaskList } from '@/services/task/components/TaskList';
import { useWorkspacePermissions } from '@/services/workspace/hooks/use-workspace-permissions';
import { cn } from '@/shared/utils/cn';
import { DeleteColumn } from './DeleteColumn';
import { EditColumn } from './EditColumn';

import type { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import type { IColumn } from '../types/column';

interface IProps {
    column: IColumn;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export const Column = ({ column, dragHandleProps }: IProps) => {
    const columnApiColor = column.color ?? '#3c3c3c';
    const { permissions } = useWorkspacePermissions({});

    return (
        <div
            className={cn(
                'relative h-[75vh] w-[380px] shadow-xl max-md:w-[350px] max-sm:w-[330px]',
                'max-xs:w-[300px]!',
            )}
        >
            <div
                className="absolute inset-0 rounded-lg brightness-[0.4] dark:brightness-[0.3]"
                style={{ backgroundColor: columnApiColor }}
            />
            <div className="relative z-10 flex h-full flex-col p-5">
                <div
                    className="group mb-2 flex w-full shrink-0 items-center justify-between border-b pb-1"
                    style={{ borderColor: columnApiColor }}
                >
                    <h2 className="text-lg font-semibold text-white">
                        {column.name}
                    </h2>
                    <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 pointer-coarse:gap-1 pointer-coarse:opacity-100">
                        {permissions?.canEditColumn && (
                            <EditColumn
                                status={column.status}
                                color={columnApiColor}
                                colId={column.id}
                                boardId={column.boardId}
                                title={column.name}
                            />
                        )}
                        {permissions?.canDeleteColumn && (
                            <DeleteColumn
                                boardId={column.boardId}
                                colId={column.id}
                            />
                        )}
                        {permissions?.canEditColumn && (
                            <div
                                {...(dragHandleProps ?? {})}
                                className="cursor-grab"
                            >
                                <GripVertical size={20} color="#ffffff" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="min-h-0 flex-1">
                    <TaskList
                        colId={column.id}
                        color={columnApiColor}
                        tasks={column.tasks}
                    />
                </div>
            </div>
        </div>
    );
};
