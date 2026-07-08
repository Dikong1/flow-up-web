import { ClockFading, History, ServerCrash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { cn } from '@/shared/utils/cn';
import { useGetActivityQuery } from '../api/hooks/';
import { WorkspaceActivityItem } from './WorkspaceActivityItem';

interface IProps {
    workspaceId: string;
}

export const WorkspaceRecent = ({ workspaceId }: IProps) => {
    const { t } = useTranslation();
    const { data, isLoading, isError } = useGetActivityQuery(workspaceId);
    const isEmpty = isLoading || isError || !data || data.length === 0;

    const content = (() => {
        if (isLoading) return <Spinner className="size-7" />;

        if (isError || !data)
            return (
                <div className="flex flex-col items-center gap-1 text-center">
                    <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-2xl">
                        <ServerCrash className="text-destructive h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-base font-medium">
                            {t('activity.errorTitle')}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            {t('activity.errorDescription')}
                        </p>
                    </div>
                </div>
            );

        if (!data || data.length === 0)
            return (
                <div className="flex w-full flex-col items-center gap-1 text-center">
                    <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-2xl">
                        <ClockFading className="text-muted-foreground h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-base font-medium">
                            {t('activity.emptyTitle')}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            {t('activity.emptyDescription')}
                        </p>
                    </div>
                </div>
            );

        return (
            <div className="flex flex-1 flex-col rounded-lg">
                {data.map((activity) => (
                    <WorkspaceActivityItem
                        key={activity.id}
                        activity={activity}
                    />
                ))}
            </div>
        );
    })();

    return (
        <>
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-medium">
                    {t('activity.recentTitle')}
                </h2>
                <History size={21} />
            </div>
            <div
                className={cn(
                    'relative min-h-64 rounded-lg border px-5',
                    isEmpty && 'flex items-center justify-center',
                )}
            >
                {content}
            </div>
        </>
    );
};
