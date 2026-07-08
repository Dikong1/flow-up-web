import { userApi } from '../userApi';

export const {
    useGetMeQuery,
    usePresignUploadAvatarMutation,
    useCompleteUploadAvatarMutation,
    useChangeNameMutation,
    useChangePasswordMutation,
} = userApi;
