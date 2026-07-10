import type { TableTask } from '@/services/task/types/table-task';

export type GetTaskListResponse = TableTask[];
export type GetTaskListArgs = {
    workspaceId: string;
    boardId: string;
};
