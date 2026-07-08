import { baseApi } from '@/shared/api/baseApi';

type SendFeedbackArgs = {
    email: string;
    message: string;
};

const feedbackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendFeedback: builder.mutation<void, SendFeedbackArgs>({
            query: (body) => ({
                url: '/mail/send-feedback',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useSendFeedbackMutation } = feedbackApi;
