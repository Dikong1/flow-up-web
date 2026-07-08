import { Plus, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useModal } from '@/app/providers/ModalProvider';
import { CreateBoard } from '@/services/board/components/CreateBoard';
import { useGetIcon } from '@/shared/hooks/use-get-icon';
import { routes } from '@/shared/routes';
import { AlertDialogBlock } from '@/shared/ui/AlertDialogBlock';
import { Button } from '@/shared/ui/shadcn/button';
import { cn } from '@/shared/utils/cn';
import { getErrorMessage } from '@/shared/utils/get-error-message';
import {
    useDeleteWorkspaceMutation,
    useLeaveWorkspaceMutation,
} from '../api/hooks/';
import { WorkspaceSettingsModal } from './WorkspaceSettings';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { IWorkspace } from '../types/workspace';
import type { IWorkspacePermission } from '../types/workspace-permission';

interface IProps {
    workspace: IWorkspace;
    permissions: IWorkspacePermission;
}

export const WorkspaceHeader = ({ workspace, permissions }: IProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { open, close } = useModal();

    const [leaveWorkspace] = useLeaveWorkspaceMutation();
    const [deleteWorkspace] = useDeleteWorkspaceMutation();
    const workspaceStatus = workspace.isArchived ? 'ARCHIVED' : 'ACTIVE';
    const Icon = useGetIcon(workspace.icon);

    const handleCreateBoard = () => {
        open({
            title: t('board.createNew'),
            description: t('board.createDescription'),
            content: <CreateBoard close={close} workspaceId={workspace.id} />,
        });
    };

    const handleDeleteWorkspace = async () => {
        const toastId = toast.loading(t('common.deleting'));

        try {
            await deleteWorkspace({
                id: workspace.id,
            }).unwrap();

            toast.success(t('workspace.deleteSuccess'), { id: toastId });
            navigate(routes.home());
        } catch (error) {
            toast.success(t('workspace.deleteError'), { id: toastId });
        }
    };

    const handleOpenSettings = () => {
        open({
            title: t('workspace.settingsTitle'),
            description: '',
            content: (
                <WorkspaceSettingsModal
                    workspaceId={workspace.id}
                    workspaceName={workspace.name}
                    isArchived={workspace.isArchived}
                    icon={workspace.icon}
                    close={close}
                    onDeleteWorkspace={handleDeleteWorkspace}
                />
            ),
        });
    };

    const handleLeaveWorkspace = async () => {
        toast.loading(t('workspace.leaveLoading'));
        try {
            await leaveWorkspace(workspace.id).unwrap();

            toast.success(t('workspace.leaveSuccess'));
            navigate(routes.home());
        } catch (error) {
            toast.error(getErrorMessage(error as FetchBaseQueryError));
        }
    };

    return (
        <div className="mb-4 w-full border-b pb-2">
            <div className="mb-3 flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:justify-start max-lg:gap-2">
                <div>
                    <div className="mb-3 flex items-center gap-2 max-lg:mb-1">
                        <Icon size={28} />
                        <h1 className="text-3xl capitalize">
                            {workspace.name}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-medium">
                            {t('workspace.statusLabel')}:
                        </span>

                        <div
                            className={cn(
                                'inline-flex items-center rounded-md px-2 py-1 text-sm font-semibold',
                                'border',
                                workspace.isArchived
                                    ? 'bg-muted text-muted-foreground border-border'
                                    : 'bg-accent text-primary border-primary/20',
                            )}
                        >
                            {t(
                                `workspace.status.${workspaceStatus.toLowerCase()}`,
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 max-sm:w-full max-sm:flex-col">
                    <AlertDialogBlock
                        title={t('workspace.leaveWarningTitle')}
                        description={t('workspace.leaveWarningDescription')}
                        cancelLabel={t('common.cancel')}
                        actionLabel={t('common.yes')}
                        onClickAction={handleLeaveWorkspace}
                    >
                        <Button variant="destructive">
                            {t(`workspace.leave`)}
                        </Button>
                    </AlertDialogBlock>
                    {permissions.canEditWorkspace && (
                        <Button
                            onClick={handleOpenSettings}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Settings />
                            {t('sidebar.settings')}
                        </Button>
                    )}
                    {permissions.canCreateBoard && (
                        <Button
                            onClick={handleCreateBoard}
                            className="flex items-center gap-2"
                        >
                            <Plus />
                            {t('board.createNew')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
