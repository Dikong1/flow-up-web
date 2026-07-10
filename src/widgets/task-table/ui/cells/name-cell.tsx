import type { TableTask } from '@/services/task/types/table-task';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

interface Props {
    task: TableTask;
}

export const NameCell = ({ task }: Props) => {
    const [, setSearchParams] = useSearchParams();

    const openTask = useCallback(
        (colId: string, taskId: string) => {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.set('colId', colId);
                next.set('taskId', taskId);
                return next;
            });
        },
        [setSearchParams],
    );

    return (
        <button onClick={() => openTask(task.colId, task.id)}>
            {task.name}
        </button>
    );
};
