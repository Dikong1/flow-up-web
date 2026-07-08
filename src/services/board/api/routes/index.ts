export const boardRoutes = {
    root: (workspaceId: string) => `/workspaces/${workspaceId}/boards`,

    byId: (workspaceId: string, boardId: string) =>
        `/workspaces/${workspaceId}/boards/${boardId}`,

    presignUploadImage: (workspaceId: string, boardId: string) =>
        `/workspaces/${workspaceId}/boards/${boardId}/image/presign-upload`,

    completeUploadAvatar: (workspaceId: string, boardId: string) =>
        `/workspaces/${workspaceId}/boards/${boardId}/image/complete`,
} as const;
