import { taskApi } from '../taskApi';

export const {
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useMoveTaskMutation,
    useCreateSubtaskMutation,
    useUpdateSubtaskMutation,
    useGetTaskByIdQuery,
    useDeleteTaskMutation,
    useDeleteSubtaskMutation,
    useGetTaskAttachmentPresignedUrlMutation,
    useCompleteTaskAttachmentMutation,
    useLazyGetDownloadPresignedUrlQuery,
    useDeleteTaskAttachmentMutation,
    useGetCommentsQuery,
    useAddCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation,
} = taskApi;
