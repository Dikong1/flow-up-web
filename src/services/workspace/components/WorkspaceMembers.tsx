import { ServerCrash, UserPlus, UserX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useModal } from '@/app/providers/ModalProvider';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { cn } from '@/shared/utils/cn';
import { useGetWorkspaceMembersQuery } from '../api/hooks/';
import { AddMember } from './AddMember';
import { WorkspaceMember } from './WorkspaceMember';

import type { IWorkspacePermission } from '../types/workspace-permission';

interface IWorkspaceMembersProps {
    workspaceId: string;
    permissions: IWorkspacePermission;
}

export const WorkspaceMembers = ({
    workspaceId,
    permissions,
}: IWorkspaceMembersProps) => {
    const { t } = useTranslation();
    const { open, close } = useModal();
    const {
        data: members,
        isLoading,
        isError,
    } = useGetWorkspaceMembersQuery(workspaceId);

    const sortedMembers = [...(members ?? [])].sort((a, b) => {
        if (a.role === 'OWNER') return -1;
        if (b.role === 'OWNER') return 1;
        return 0;
    });

    const isEmpty = !members || members.length <= 1;

    const handleAddMember = () => {
        open({
            title: t('workspace.addMemberTitle'),
            description: t('workspace.addMemberDescription'),
            content: <AddMember close={close} workspaceId={workspaceId} />,
        });
    };

    const renderMembers = (() => {
        if (isLoading) return <Spinner className="size-7" />;

        if (isError)
            return (
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center">
                    <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-2xl">
                        <ServerCrash className="text-destructive h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-base font-medium">
                            {t('common.somethingWentWrong')}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            {t('common.tryAgainLater')}
                        </p>
                    </div>
                </div>
            );

        if (isEmpty)
            return (
                <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center">
                    <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-2xl">
                        <UserX className="text-muted-foreground h-5 w-5" />
                    </div>
                    <div className="">
                        <p className="text-base font-medium">
                            {t('workspace.membersEmpty')}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            {t('workspace.membersEmptyDescription')}
                        </p>
                    </div>
                </div>
            );

        return sortedMembers.map((member) => (
            <WorkspaceMember
                key={member.id}
                workspaceId={workspaceId}
                permissions={permissions}
                member={member}
            />
        ));
    })();

    return (
        <>
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-medium capitalize">
                    {t('workspace.membersTitle')} ({members?.length ?? 0})
                </h2>
                {permissions.canInviteMember && (
                    <button
                        aria-label={t('workspace.addMemberTitle')}
                        onClick={handleAddMember}
                        className="hover:text-primary transition-colors"
                    >
                        <UserPlus size={21} />
                    </button>
                )}
            </div>
            <div
                className={cn(
                    'relative flex h-full min-h-64 flex-col rounded-lg border px-5 py-2',
                    {
                        'items-center justify-center':
                            isEmpty || isLoading || isError,
                    },
                )}
            >
                {renderMembers}
            </div>
        </>
    );
};
