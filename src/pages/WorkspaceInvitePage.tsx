import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import {
    useCheckInviteQuery,
    useJoinWorkspaceMutation,
} from '@/services/workspace/api/hooks/';
import { getWorkspaceRole } from '@/shared/lib/get-workspace-role';
import { routes } from '@/shared/routes';
import { Button } from '@/shared/ui/shadcn/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/shadcn/dialog';
import { Spinner } from '@/shared/ui/shadcn/spinner';

const WorkspaceInvitePage = () => {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation();

    const { token } = useParams();
    if (!token) {
        return <div>{t('errors.inviteNotFound')}</div>;
    }

    const {
        data,
        isLoading: isLoadingInvite,
        isError: isErrorInvite,
    } = useCheckInviteQuery(token);
    const [join] = useJoinWorkspaceMutation();

    const navigate = useNavigate();

    const handleJoinWorkspace = () => {
        toast.promise(join(token).unwrap(), {
            loading: t('workspace.inviteLoading'),
            success: (result) => {
                setOpen(false);
                navigate(
                    routes.workspace({ workspaceId: data?.workspaceId ?? '' }),
                );

                if (typeof result === 'object' && 'message' in result) {
                    return result.message;
                }

                return t('workspace.inviteSuccess');
            },
            error: t('workspace.inviteError'),
        });
    };

    return (
        <>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('workspace.inviteTitle')}</DialogTitle>
                        <DialogDescription>
                            {t('workspace.inviteDescription')}
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        {data && (
                            <>
                                <div>
                                    {t('workspace.inviteWorkspaceLabel')}:{' '}
                                    <span className="font-medium">
                                        {data.workspaceName}
                                    </span>
                                </div>
                                <div>
                                    {t('workspace.inviteRoleLabel')}:{' '}
                                    <span className="font-medium">
                                        {getWorkspaceRole(data.role)}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    <Button
                        onClick={handleJoinWorkspace}
                        disabled={isErrorInvite || isLoadingInvite}
                    >
                        {isLoadingInvite ? (
                            <Spinner />
                        ) : (
                            t('workspace.inviteAccept')
                        )}
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WorkspaceInvitePage;
