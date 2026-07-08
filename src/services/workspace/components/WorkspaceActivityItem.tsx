import { Trans } from 'react-i18next';
import { formatActivityTime } from '@/shared/lib/formate-activity-time';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar';
import { getUserInitials } from '@/shared/utils/get-user-initials';

import type { IWorkspaceActivity } from '../types/workspace-activity';

interface IProps {
    activity: IWorkspaceActivity;
}

export const WorkspaceActivityItem = ({ activity }: IProps) => {
    const uiLabel = () => {
        switch (activity.type) {
            case 'TASK_CREATED':
                return (
                    <Trans
                        i18nKey="activity.taskCreated"
                        values={{
                            user: activity.user.fullName,
                            taskName: activity.metadata.taskName,
                        }}
                        components={{
                            strong: <strong className="font-semibold" />,
                        }}
                    />
                );

            case 'TASK_MOVED':
                return (
                    <Trans
                        i18nKey="activity.taskMoved"
                        values={{
                            user: activity.user.fullName,
                            taskName: activity.metadata.taskName,
                            columnName: activity.metadata.columnName,
                        }}
                        components={{
                            strong: <strong className="font-semibold" />,
                        }}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-between border-b py-4 max-md:flex-col max-md:items-start">
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={activity.user.avatar ?? ''} />
                    <AvatarFallback>
                        {getUserInitials(activity.user.fullName)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 truncate text-base wrap-break-word max-lg:flex-wrap max-md:text-sm">
                    {uiLabel()}
                </div>
            </div>
            <div className="text-md text-muted-foreground italic max-md:text-sm">
                {formatActivityTime(activity.createdAt)}
            </div>
        </div>
    );
};
