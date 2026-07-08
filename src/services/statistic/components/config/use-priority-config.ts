import { useMemo } from 'react';

import type {
    ITaskPriority,
    TTaskPriorityName,
} from '@/services/task/types/task-priority';

export const usePriorityConfig = (priorities: ITaskPriority[] | undefined) => {
    return useMemo(() => {
        const config: Partial<
            Record<
                TTaskPriorityName | 'Without',
                { color: string; label: string }
            >
        > = {
            Without: { color: '#6b7280', label: 'Without' },
        };

        if (!priorities) return config;

        for (const priority of priorities) {
            config[priority.name] = {
                color: priority.color,
                label: priority.name,
            };
        }

        return config;
    }, [priorities]);
};
