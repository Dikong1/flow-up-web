import type { ITaskComment } from '../../types/task-comment';

export interface DeleteCommentArgs {
    boardId: string;
    colId: string;
    taskId: string;
    comId: string;
}
export type DeleteCommentResponse = ITaskComment;
