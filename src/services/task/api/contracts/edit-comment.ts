import type { ITaskComment } from '../../types/task-comment';

export interface EditCommentArgs {
    boardId: string;
    colId: string;
    taskId: string;
    comId: string;
    body: EditCommentBody;
}
export interface EditCommentBody {
    content: string;
}
export type EditCommentResponse = ITaskComment;
