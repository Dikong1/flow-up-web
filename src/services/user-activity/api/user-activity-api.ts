import { baseApi } from '@/shared/api/baseApi';
import { userActivityRoutes } from './routes';

import type {
    CreateTrackTaskArgs,
    CreateTrackTaskResponse,
} from './contracts/create-track-task';
import type {
    GetRecentTasksArgs,
    GetRecentTasksResponse,
} from './contracts/get-recent-tasks';

export const userActivityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecentTasks: builder.query<
            GetRecentTasksResponse,
            GetRecentTasksArgs
        >({
            query: () => ({
                url: userActivityRoutes.root(),
                method: 'GET',
            }),
            providesTags: ['TasksRecent'],
        }),

        createTrackTask: builder.mutation<
            CreateTrackTaskResponse,
            CreateTrackTaskArgs
        >({
            query: ({ body }) => ({
                url: userActivityRoutes.root(),
                method: 'POST',
                body,
            }),
            invalidatesTags: ['TasksRecent'],
        }),
    }),
    overrideExisting: false,
});
