import { z } from 'zod';
import i18n from '@/config/i18n/i18n';

export const createTaskSchema = z.object({
    name: z
        .string()
        .min(2, { message: i18n.t('errors.minLength', { count: 2 }) })
        .max(50, { message: i18n.t('errors.maxLength', { count: 50 }) }),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
