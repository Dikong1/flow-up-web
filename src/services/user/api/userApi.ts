import { baseApi } from '@/shared/api/baseApi';
import { userRoutes } from './routes';

import type { ChangeNameArgs } from './contracts/change-name';
import type { ChangePasswordArgs } from './contracts/change-password';
import type {
    CompleteUploadAvatarArgs,
    CompleteUploadAvatarResponse,
} from './contracts/complete-avatar';
import type { GetMeResponse } from './contracts/get-me';
import type {
    PresignUploadAvatarArgs,
    PresignUploadAvatarResponse,
} from './contracts/presign-avatar';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<GetMeResponse, void>({
            query: () => ({
                url: userRoutes.me(),
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        presignUploadAvatar: builder.mutation<
            PresignUploadAvatarResponse,
            PresignUploadAvatarArgs
        >({
            query: ({ body }) => ({
                url: userRoutes.presignAvatar(),
                method: 'POST',
                body,
            }),
        }),
        completeUploadAvatar: builder.mutation<
            CompleteUploadAvatarResponse,
            CompleteUploadAvatarArgs
        >({
            query: ({ body }) => ({
                url: userRoutes.completeAvatar(),
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        changeName: builder.mutation<GetMeResponse, ChangeNameArgs>({
            query: ({ body }) => ({
                url: userRoutes.me(),
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        changePassword: builder.mutation<void, ChangePasswordArgs>({
            query: ({ body }) => ({
                url: userRoutes.changePassword(),
                method: 'PATCH',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});
