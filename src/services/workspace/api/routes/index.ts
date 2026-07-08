export const workspaceRoutes = {
    root: () => '/workspaces',
    byId: (id: string) => `/workspaces/${id}`,

    members: (id: string) => `/workspaces/${id}/members`,
    memberById: (workspaceId: string, userId: string) =>
        `/workspaces/${workspaceId}/members/${userId}`,

    inviteLink: (id: string) => `/workspaces/${id}/invite-link`,
    inviteByToken: (token: string) => `/workspaces/invite/${token}`,
    acceptInvite: (token: string) => `/workspaces/invite/${token}/accept`,

    myRole: (workspaceId: string) => `/workspaces/${workspaceId}/role`,

    activity: (id: string) => `/workspaces/${id}/activity`,
    statistics: (id: string) => `/workspaces/${id}/statistics`,
    leave: (id: string) => `/workspaces/${id}/leave`,
} as const;
