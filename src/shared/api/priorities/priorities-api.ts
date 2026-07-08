import { baseApi } from '@/shared/api/baseApi';

import type { ITaskPriority } from '@/services/task/types/task-priority';

const prioritiesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPriorities: builder.query<ITaskPriority[], void>({
            query: () => ({
                url: '/priorities',
                method: 'GET',
            }),
            providesTags: ['Priorities'],
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllPrioritiesQuery } = prioritiesApi;
