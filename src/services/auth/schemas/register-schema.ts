import { z } from 'zod';
import i18n from '@/config/i18n/i18n';

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(2, { message: i18n.t('errors.minLength', { count: 2 }) })
            .max(64, { message: i18n.t('errors.maxLength', { count: 64 }) }),
        email: z
            .string()
            .trim()
            .pipe(z.email({ message: i18n.t('errors.invalidEmail') })),
        username: z
            .string()
            .min(4, { message: i18n.t('errors.minLength', { count: 4 }) })
            .max(12, { message: i18n.t('errors.maxLength', { count: 12 }) }),
        password: z
            .string()
            .min(8, { message: i18n.t('errors.minLength', { count: 8 }) })
            .max(32, { message: i18n.t('errors.maxLength', { count: 32 }) }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: i18n.t('auth.passwordMismatch'),
    });

export type TRegisterFormValues = z.infer<typeof registerSchema>;
