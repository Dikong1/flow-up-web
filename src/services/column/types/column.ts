import type { ITaskPreview } from '@/services/task/types/task-preview';
import type { TColumnStatus } from './column-status';

export interface IColumn {
    id: string;
    name: string;
    order: number;
    boardId: string;
    status: TColumnStatus;
    color?: string;
    tasks: ITaskPreview[];
}
