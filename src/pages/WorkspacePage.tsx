import { skipToken } from '@reduxjs/toolkit/query';
import { FolderX, LayoutGrid, ServerCrash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { BoardList } from '@/services/board/components/BoardList';
import { useGetWorkspaceQuery } from '@/services/workspace/api/hooks/';
import { WorkspaceHeader } from '@/services/workspace/components/WorkspaceHeader';
import { WorkspaceMembers } from '@/services/workspace/components/WorkspaceMembers';
import { WorkspaceRecent } from '@/services/workspace/components/WorkspaceRecent';
import { WorkspaceStats } from '@/services/workspace/components/WorkspaceStat';
import { useWorkspacePermissions } from '@/services/workspace/hooks/use-workspace-permissions';
import { useWsWorkspace } from '@/services/workspace/hooks/useWsWorkspace';
import { useTitle } from '@/shared/hooks/use-title';
import { Button } from '@/shared/ui/shadcn/button';
import { Spinner } from '@/shared/ui/shadcn/spinner';

const WorkspacePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { workspaceId } = useParams();
    const {
        data: workspace,
        isError,
        isLoading,
        refetch,
    } = useGetWorkspaceQuery(workspaceId ?? skipToken);
    const { permissions } = useWorkspacePermissions({});
    useWsWorkspace(workspaceId);
    useTitle(workspace?.name ?? '');

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center pt-48">
                <Spinner className="size-12" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="bg-destructive/10 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <ServerCrash className="text-destructive h-7 w-7" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">
                        {t('workspace.workspaceByIdError')}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {t('common.tryAgainLater')}
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                    {t('common.tryAgain')}
                </Button>
            </div>
        );
    }

    if (!workspace) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-2xl">
                    <FolderX className="text-muted-foreground h-7 w-7" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">
                        {t('errors.workspaceNotFound')}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {t('workspace.workspaceNotFoundDescription')}
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/')}
                >
                    {t('common.goBack')}
                </Button>
            </div>
        );
    }

    return (
        <>
            <WorkspaceHeader workspace={workspace} permissions={permissions} />
            <WorkspaceStats workspaceId={workspace.id} />
            <div className="border-b pb-10">
                <div className="mb-3 flex items-center gap-1">
                    <LayoutGrid size={20} />
                    <h2 className="text-xl font-medium">
                        {t('board.listTitle')}
                    </h2>
                </div>
                <BoardList boards={workspace.boards} />
            </div>
            <div className="max-xs:gap-3! flex gap-10 pt-5 max-2xl:flex-col-reverse max-2xl:gap-12 max-md:gap-6">
                <div className="flex-auto">
                    <WorkspaceRecent workspaceId={workspace.id} />
                </div>
                <div className="flex flex-[0_0_30%] flex-col max-2xl:flex-auto">
                    <WorkspaceMembers
                        permissions={permissions}
                        workspaceId={workspace.id}
                    />
                </div>
            </div>
        </>
    );
};

export default WorkspacePage;
