import { baseApi } from '@/shared/api/baseApi';
import { notificationRoutes } from './routes';

import type {
    GetAllNotificationsArgs,
    GetAllNotificationsResponse,
} from './contracts/get-all-notifications';
import type {
    MarkNotificationArgs,
    MarkNotificationResponse,
} from './contracts/mark-notification';

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query<
            GetAllNotificationsResponse,
            GetAllNotificationsArgs
        >({
            query: () => ({
                url: notificationRoutes.root(),
                method: 'GET',
            }),
            providesTags: ['Notifications'],
        }),
        markNotification: builder.mutation<
            MarkNotificationResponse,
            MarkNotificationArgs
        >({
            query: ({ id }) => ({
                url: notificationRoutes.byId(id),
                method: 'PATCH',
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    notificationApi.util.updateQueryData(
                        'getAllNotifications',
                        undefined,
                        (draft) => {
                            const n = draft.find((x) => x.id === id);
                            if (n) n.read = true;
                        },
                    ),
                );

                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        notificationApi.util.updateQueryData(
                            'getAllNotifications',
                            undefined,
                            (draft) => {
                                const idx = draft.findIndex((x) => x.id === id);
                                if (idx !== -1) draft[idx] = data;
                            },
                        ),
                    );
                } catch {
                    patch.undo();
                }
            },
        }),
    }),
    overrideExisting: false,
});
