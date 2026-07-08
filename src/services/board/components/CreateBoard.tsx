import { zodResolver } from '@hookform/resolvers/zod';
import { KanbanSquare, LayoutGrid } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { cn } from '@/shared/utils/cn';
import { useCreateBoardMutation } from '../api/hooks';
import { createBoardSchema } from '../schemas/create-board.schema';

import type { CreateBoardFormValues } from '../schemas/create-board.schema';

interface IProps {
    close: () => void;
    workspaceId: string;
}

const templates = [
    {
        value: 'empty',
        icon: LayoutGrid,
    },
    {
        value: 'default',
        icon: KanbanSquare,
    },
] as const;

export const CreateBoard = ({ close, workspaceId }: IProps) => {
    const { t } = useTranslation();
    const [create, { isLoading }] = useCreateBoardMutation();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreateBoardFormValues>({
        resolver: zodResolver(createBoardSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            template: 'empty',
        },
    });

    const selectedTemplate = watch('template');

    const handleCreate = async (data: CreateBoardFormValues) => {
        if (isLoading) return;

        try {
            await create({ workspaceId, body: data }).unwrap();
            toast.success(t('board.createSuccess'));
            close();
        } catch {
            toast.error(t('board.createError'));
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleCreate)}
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-1">
                <Label htmlFor="board-name">{t('common.name')}</Label>
                <Input
                    id="board-name"
                    {...register('name')}
                    placeholder={t('board.namePlaceholder')}
                    className={cn(errors.name && 'border-destructive')}
                />
                {errors.name && (
                    <p className="text-destructive text-sm">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label>{t('board.template')}</Label>

                <div className="grid gap-3 sm:grid-cols-2">
                    {templates.map((template) => {
                        const Icon = template.icon;
                        const isSelected = selectedTemplate === template.value;

                        return (
                            <button
                                key={template.value}
                                type="button"
                                onClick={() =>
                                    setValue('template', template.value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    })
                                }
                                className={cn(
                                    'rounded-xl border p-4 text-left transition-all',
                                    'hover:border-primary/60 hover:bg-accent/40',
                                    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
                                    isSelected && 'border-primary bg-primary/5',
                                )}
                            >
                                <div className="mb-1 flex items-start gap-1">
                                    <Icon className="size-5" />
                                    <h3 className="leading-tight font-medium">
                                        {t(
                                            `board.templates.${template.value}.title`,
                                        )}
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        {t(
                                            `board.templates.${template.value}.description`,
                                        )}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <input type="hidden" {...register('template')} />
                {errors.template && (
                    <p className="text-destructive text-sm">
                        {errors.template.message}
                    </p>
                )}
            </div>

            <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading ? <Spinner /> : t('common.create')}
            </Button>
        </form>
    );
};
