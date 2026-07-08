import { ExternalLink, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAppSelector } from '@/shared/hooks/redux';
import dayjs from '@/shared/lib/day-js';
import { AlertDialogBlock } from '@/shared/ui/AlertDialogBlock';
import { cn } from '@/shared/utils/cn';
import { selectCurrentBoardId } from '@/store/slices/board-slice';
import { useDeleteTaskMutation } from '../api/hooks';

import type { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import type { ITaskPreview } from '../types/task-preview';

interface IProps {
    task: ITaskPreview;
    color?: string;
    openTask?: (cId: string, tId: string) => void;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export const TaskCard = ({
    task,
    color,
    openTask,
    dragHandleProps,
}: IProps) => {
    const { t } = useTranslation();

    const [deleteTask] = useDeleteTaskMutation();

    const currentBoardId = useAppSelector(selectCurrentBoardId);

    const navigateToDetails = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (openTask) {
            openTask(task.colId, task.id);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask({
                boardId: currentBoardId,
                colId: task.colId,
                taskId: task.id,
            }).unwrap();
        } catch (error) {
            toast.error(`${t('task.deleteError')}`);
        }
    };

    return (
        <div
            className={cn('group relative mb-2 cursor-pointer p-3')}
            onClick={navigateToDetails}
            {...(dragHandleProps ?? {})}
        >
            <div
                style={{ backgroundColor: color }}
                className="absolute inset-0 rounded-sm brightness-50 dark:brightness-40"
            />
            <div className="relative z-10">
                <h3
                    style={{ borderColor: color }}
                    className="line-clamp-2 max-w-full overflow-hidden border-b pb-1 leading-tight font-medium wrap-break-word text-white max-sm:line-clamp-1"
                >
                    {task.name}
                </h3>
                <div className="flex items-center justify-between pt-1 text-[11px] text-white brightness-100">
                    <div className="flex gap-3 font-medium">
                        <div>
                            <div className="">{t('task.priority')}</div>
                            <div className="flex items-center gap-1">
                                <div
                                    style={{
                                        backgroundColor:
                                            task.priority?.color ?? '#9CA3AF',
                                    }}
                                    className="h-3 w-3 rounded-full bg-amber-700"
                                ></div>
                                <span>
                                    {task.priority?.name ? (
                                        t(
                                            `priority.${task.priority.name.toLowerCase()}`,
                                        )
                                    ) : (
                                        <span className="font-normal">
                                            {t('priority.without')}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div>{t('task.dueDate')}</div>
                            <div>
                                {task.dueDate ? (
                                    dayjs(task.dueDate).format('L')
                                ) : (
                                    <span className="font-normal">
                                        {t('common.notSet')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AlertDialogBlock
                            title={t('task.deleteConfirmTitle')}
                            description={t('task.deleteConfirmDescription')}
                            cancelLabel={t('common.cancel')}
                            actionLabel={t('common.yes')}
                            onClickAction={handleDelete}
                        >
                            <button
                                onClick={(e) => e.stopPropagation()}
                                className="cursor-pointer transition-colors hover:text-white/70"
                            >
                                <Trash2 size={16} />
                            </button>
                        </AlertDialogBlock>
                        <button
                            title={t('task.open')}
                            onClick={navigateToDetails}
                            className="cursor-pointer transition-colors hover:text-white/70"
                        >
                            <ExternalLink size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
