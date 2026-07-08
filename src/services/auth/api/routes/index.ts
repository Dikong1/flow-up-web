export const authRoutes = {
    register: () => '/auth/register',
    login: () => '/auth/login',
    refresh: () => '/auth/refresh',
    googleLogin: () => '/auth/google/login',
    logout: () => '/auth/logout',
    sendCode: () => '/mail/send-code',
    verifyCode: () => '/mail/verify-code',
} as const;
