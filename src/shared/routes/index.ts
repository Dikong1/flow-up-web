export const routes = {
    home: () => '/dashboard',
    workspace: (args: { workspaceId: string }) =>
        `/dashboard/workspaces/${args.workspaceId}`,
    workspaceStatistics: (args: { workspaceId: string }) =>
        `/dashboard/workspaces/${args.workspaceId}/statistics`,
    board: (args: { workspaceId: string; boardId: string }) =>
        `/dashboard/workspaces/${args.workspaceId}/boards/${args.boardId}`,
    task: (args: {
        workspaceId: string;
        boardId: string;
        colId: string;
        taskId: string;
    }) =>
        `/dashboard/workspaces/${args.workspaceId}/boards/${args.boardId}?colId=${args.colId}&taskId=${args.taskId}`,
} as const;
