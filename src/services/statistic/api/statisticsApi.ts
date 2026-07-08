import { baseApi } from '@/shared/api/baseApi';
import { statisticRoutes } from './routes';

import type {
    GetFullStatArgs,
    GetFullStatResponse,
} from './contracts/get-full-stat';

export const statisticApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFullStat: builder.query<GetFullStatResponse, GetFullStatArgs>({
            query: (workspaceId) => ({
                url: statisticRoutes.full(workspaceId),
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});
