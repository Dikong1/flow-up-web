export interface GetDownloadPresignedUrlArgs {
    boardId: string;
    colId: string;
    taskId: string;
    attachmentId: string;
}
export interface GetDownloadPresignedUrlResponse {
    method: string;
    url: string;
}
