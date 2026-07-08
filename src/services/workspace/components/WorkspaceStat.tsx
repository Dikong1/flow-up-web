import { CheckCheck, Gavel, SquareCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { routes } from '@/shared/routes';
import { useGetStatisticsQuery } from '../api/hooks/';
import { WorkspaceStatItem } from './WorkspaceStatItem';

interface IProps {
    workspaceId: string;
}

export const WorkspaceStats = ({ workspaceId }: IProps) => {
    const { t } = useTranslation();
    const { data = { total: 0, inProgress: 0, done: 0 } } =
        useGetStatisticsQuery(workspaceId);

    const inProgressPercent = data.total
        ? Math.round((data.inProgress * 100) / data.total)
        : 0;

    const donePercent = data.total
        ? Math.round((data.done * 100) / data.total)
        : 0;

    return (
        <>
            <div className="mb-3 flex items-center justify-between max-xl:mb-2">
                <h2 className="text-xl font-medium">{t('statistics.title')}</h2>
                <Link
                    to={routes.workspaceStatistics({ workspaceId })}
                    className="text-primary hover:text-primary/65 cursor-pointer text-right font-medium transition-colors"
                >
                    {t('statistics.viewAll')}
                </Link>
            </div>
            <div className="mb-5 border-b pb-10">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 max-xl:gap-3">
                    <WorkspaceStatItem
                        icon={SquareCheck}
                        label={t('workspace.stats.totalTasks', {
                            count: data?.total,
                        })}
                        progressValue={data?.total ? 100 : 0}
                    />
                    <WorkspaceStatItem
                        icon={Gavel}
                        label={t('workspace.stats.inProgressTasks', {
                            count: data?.inProgress,
                        })}
                        progressValue={inProgressPercent}
                    />
                    <WorkspaceStatItem
                        icon={CheckCheck}
                        label={t('workspace.stats.doneTasks', {
                            count: data?.done,
                        })}
                        progressValue={donePercent}
                    />
                </div>
            </div>
        </>
    );
};
