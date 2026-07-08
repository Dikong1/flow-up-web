import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSendFeedbackMutation } from '@/shared/api/feedback/feedbackApi';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { cn } from '@/shared/utils/cn';

const schema = z.object({
    email: z.email('feedback.emailError'),
    message: z
        .string()
        .trim()
        .min(10, 'feedback.messageShort')
        .max(2000, 'feedback.messageLong'),
});

type FormData = z.infer<typeof schema>;

export const FeedbackForm = () => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const [sendFeedback] = useSendFeedbackMutation();

    const onSendFeedback = async (data: FormData) => {
        const toastId = toast.loading(t('common.loading'));

        try {
            await sendFeedback(data).unwrap();

            toast.success(t('feedback.sendSuccess'), { id: toastId });
            reset();
        } catch (error) {
            console.error(error);
            toast.error(t('feedback.sendError'), { id: toastId });
        }
    };

    return (
        <form
            onSubmit={handleSubmit((data) => onSendFeedback(data))}
            className="flex w-full max-w-xl flex-col gap-5 max-sm:gap-2"
        >
            <div>
                <Label className="mb-1.5">{t('feedback.email')}</Label>
                <Input
                    className={cn(
                        'max-sm:text-sm max-sm:placeholder:text-sm',
                        errors.email?.message && 'border-destructive',
                    )}
                    {...register('email')}
                    placeholder="johndoe@example.com"
                />
                {errors.email && (
                    <p className="text-destructive pt-0.5 text-sm">
                        {t(`${errors.email.message}`)}
                    </p>
                )}
            </div>
            <div>
                <Label className="mb-1.5">{t('feedback.message')}</Label>
                <Textarea
                    className={cn(
                        'max-h-96 max-sm:text-sm',
                        errors.message?.message && 'border-destructive',
                    )}
                    {...register('message')}
                />
                {errors.message && (
                    <p className="text-destructive pt-0.5 text-sm">
                        {t(`${errors.message.message}`)}
                    </p>
                )}
            </div>
            <Button type="submit">{t('feedback.button')}</Button>
        </form>
    );
};
