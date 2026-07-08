import type { ITaskComment } from '../../types/task-comment';

export interface GetCommentsArgs {
    boardId: string;
    colId: string;
    taskId: string;
}
export type GetCommentsResponse = ITaskComment[];
