import { z } from 'zod';
import i18n from '@/config/i18n/i18n';

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: i18n.t('errors.invalidEmail') }),
    password: z
        .string()
        .min(6, { message: i18n.t('errors.minLength', { count: 6 }) }),
});

export type TLoginFormValues = z.infer<typeof loginSchema>;
