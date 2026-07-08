import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { useCreateWorkspaceMutation } from '../api/hooks/';
import { createWorkspaceSchema } from '../schemas/create-workspace.schema';

import type { CreateWorkspaceFormValues } from '../schemas/create-workspace.schema';

export const CreateWorkspace = ({ close }: { close: () => void }) => {
    const { t } = useTranslation();
    const [create, { isLoading }] = useCreateWorkspaceMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateWorkspaceFormValues>({
        resolver: zodResolver(createWorkspaceSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: CreateWorkspaceFormValues) => {
        if (isLoading) return;

        try {
            await create({
                body: data,
            }).unwrap();

            toast.success(t('workspace.createSuccess'));
            close();
        } catch {
            toast.error(t('workspace.createError'));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="grid gap-1">
                    <Label htmlFor="name">{t('workspace.nameLabel')}</Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && (
                        <p className="text-destructive text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <Button disabled={isLoading} type="submit">
                    {!isLoading ? t('common.create') : <Spinner />}
                </Button>
            </div>
        </form>
    );
};
