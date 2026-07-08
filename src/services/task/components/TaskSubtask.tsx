import { useEffect, useState } from 'react';
import { Trash2 as DeleteIcon } from 'lucide-react';
import ContentEditable from 'react-contenteditable';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { useAppSelector } from '@/shared/hooks/redux';
import { Checkbox } from '@/shared/ui/shadcn/checkbox';
import { cn } from '@/shared/utils/cn';
import { selectCurrentBoardId } from '@/store/slices/board-slice';
import {
    useDeleteSubtaskMutation,
    useUpdateSubtaskMutation,
} from '../api/hooks';

import type { ITaskTodo } from '../types/task-todo';

interface IProps {
    taskId: string;
    colId: string;
    subtask: ITaskTodo;
}

export const TaskSubtask = ({ subtask, colId, taskId }: IProps) => {
    const { t } = useTranslation();
    const boardId = useAppSelector(selectCurrentBoardId);
    const [localSubtask, setLocalSubtask] = useState(subtask);

    const [updateSubtask] = useUpdateSubtaskMutation();
    const [deleteSubtask] = useDeleteSubtaskMutation();

    const debouncedUpdate = useDebouncedCallback(async (updated: ITaskTodo) => {
        try {
            await updateSubtask({
                boardId,
                colId,
                taskId,
                subtaskId: updated.id,
                body: { title: updated.title, completed: updated.completed },
            }).unwrap();
        } catch {
            toast.error(t('task.subtaskUpdateError'));
            setLocalSubtask(subtask);
        }
    }, 500);

    const handleChange = (value?: string, type?: 'title' | 'completed') => {
        const updated: ITaskTodo =
            type === 'completed'
                ? { ...localSubtask, completed: !localSubtask.completed }
                : { ...localSubtask, title: value ?? '' };

        setLocalSubtask(updated);
        debouncedUpdate(updated);
    };

    const handleDeleteSubtask = () => {
        try {
            deleteSubtask({
                boardId,
                colId,
                taskId,
                subtaskId: subtask.id,
            }).unwrap();
        } catch (error) {
            toast.error(t('task.subtaskDeleteError'));
        }
    };

    useEffect(() => {
        setLocalSubtask(subtask);
    }, [subtask]);

    return (
        <div className="group relative flex items-center gap-2">
            <Checkbox
                checked={localSubtask.completed}
                onCheckedChange={() => handleChange(undefined, 'completed')}
            />
            <ContentEditable
                html={localSubtask.title}
                onChange={(e) => handleChange(e.target.value, 'title')}
                className={cn(
                    'cursor-text border-b border-transparent text-lg outline-none',
                    'focus:border-blue-500',
                    localSubtask.completed &&
                        'text-muted-foreground line-through',
                )}
            />
            <DeleteIcon
                onClick={handleDeleteSubtask}
                size={18}
                className="cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
            />
        </div>
    );
};
