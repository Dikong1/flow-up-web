export const userRoutes = {
    me: () => '/users/me',
    presignAvatar: () => '/users/me/avatar/presign-upload',
    completeAvatar: () => '/users/me/avatar/complete',
    changePassword: () => '/users/me/change-password',
} as const;
