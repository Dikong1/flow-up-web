export interface DeleteTaskAttachmentArgs {
    boardId: string;
    colId: string;
    taskId: string;
    attachmentId: string;
}
export type DeleteTaskAttachmentResponse = boolean;
