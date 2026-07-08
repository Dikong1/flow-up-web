export const notificationRoutes = {
    root: () => '/notifications',
    byId: (id: string) => `/notifications/${id}`,
} as const;
