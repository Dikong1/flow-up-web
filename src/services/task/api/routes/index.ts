const tasksBase = (boardId: string, colId: string) =>
    `/boards/${boardId}/columns/${colId}/tasks`;

export const taskRoutes = {
    root: (boardId: string, colId: string) => tasksBase(boardId, colId),

    byId: (boardId: string, colId: string, taskId: string) =>
        `${tasksBase(boardId, colId)}/${taskId}`,

    move: (boardId: string, colId: string, taskId: string) =>
        `${tasksBase(boardId, colId)}/${taskId}/move`,

    subtasksRoot: (boardId: string, colId: string, taskId: string) =>
        `${tasksBase(boardId, colId)}/${taskId}/subtasks`,

    subtaskById: (
        boardId: string,
        colId: string,
        taskId: string,
        subtaskId: string,
    ) => `${tasksBase(boardId, colId)}/${taskId}/subtasks/${subtaskId}`,

    attachmentsPresignUpload: (
        boardId: string,
        colId: string,
        taskId: string,
    ) => `${tasksBase(boardId, colId)}/${taskId}/attachments/presign-upload`,

    attachmentsComplete: (
        boardId: string,
        colId: string,
        taskId: string,
        attachmentId: string,
    ) =>
        `${tasksBase(
            boardId,
            colId,
        )}/${taskId}/attachments/${attachmentId}/complete`,

    attachmentsPresignDownload: (
        boardId: string,
        colId: string,
        taskId: string,
        attachmentId: string,
    ) =>
        `${tasksBase(
            boardId,
            colId,
        )}/${taskId}/attachments/${attachmentId}/presign-download`,

    attachmentById: (
        boardId: string,
        colId: string,
        taskId: string,
        attachmentId: string,
    ) => `${tasksBase(boardId, colId)}/${taskId}/attachments/${attachmentId}`,

    commentsRoot: (boardId: string, colId: string, taskId: string) =>
        `${tasksBase(boardId, colId)}/${taskId}/comments`,

    commentById: (
        boardId: string,
        colId: string,
        taskId: string,
        comId: string,
    ) => `${tasksBase(boardId, colId)}/${taskId}/comments/${comId}`,
} as const;
