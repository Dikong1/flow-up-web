import { boardApi } from '../boardApi';

export const {
    useGetBoardQuery,
    useCreateBoardMutation,
    useEditBoardMutation,
    useDeleteBoardMutation,
    usePresignUploadImageMutation,
    useCompleteUploadImageMutation,
    useGetTaskListQuery,
} = boardApi;
