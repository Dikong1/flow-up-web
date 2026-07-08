import { baseApi } from '@/shared/api/baseApi';
import { authRoutes } from './routes';

import type {
    GoogleLoginArgs,
    GoogleLoginResponse,
} from './contracts/google-login';
import type { LoginArgs, LoginResponse } from './contracts/login';
import type { LogoutArgs, LogoutResponse } from './contracts/logout';
import type { RefreshResponse } from './contracts/refresh';
import type { RegisterArgs, RegisterResponse } from './contracts/register';
import type { SendCodeArgs, SendCodeResponse } from './contracts/send-code';
import type {
    VerifyCodeArgs,
    VerifyCodeResponse,
} from './contracts/verify-code';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterArgs>({
            query: ({ body }) => ({
                url: authRoutes.register(),
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginArgs>({
            query: ({ body }) => ({
                url: authRoutes.login(),
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        refresh: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: authRoutes.refresh(),
                method: 'POST',
            }),
        }),
        googleLogin: builder.query<GoogleLoginResponse, GoogleLoginArgs>({
            query: () => ({
                url: authRoutes.googleLogin(),
                method: 'GET',
            }),
        }),
        logout: builder.mutation<LogoutResponse, LogoutArgs>({
            query: () => ({
                url: authRoutes.logout(),
                method: 'POST',
            }),
        }),
        sendCode: builder.mutation<SendCodeResponse, SendCodeArgs>({
            query: () => ({
                url: authRoutes.sendCode(),
                method: 'POST',
            }),
        }),
        verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeArgs>({
            query: ({ body }) => ({
                url: authRoutes.verifyCode(),
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});
