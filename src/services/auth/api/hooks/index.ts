import { authApi } from '../authApi';

export const {
    useRegisterMutation,
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation,
    useSendCodeMutation,
    useVerifyCodeMutation,
} = authApi;
