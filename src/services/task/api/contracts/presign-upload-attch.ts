interface ITaskPresignedAtchBody {
    fileName: string;
    mimeType: string;
    size: number;
}

export interface GetTaskAttachmentPresignedUrlArgs {
    boardId: string;
    colId: string;
    taskId: string;
    body: ITaskPresignedAtchBody;
}
export interface GetTaskAttachmentPresignedUrlResponse {
    attachmentId: string;
    key: string;
    uploadUrl: string;
    method: 'PUT';
}
