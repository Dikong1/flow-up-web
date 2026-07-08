import type { ITaskComment } from '../../types/task-comment';

export interface AddCommentArgs {
    boardId: string;
    colId: string;
    taskId: string;
    body: AddCommentBody;
}
export interface AddCommentBody {
    content: string;
}
export type AddCommentResponse = ITaskComment;
