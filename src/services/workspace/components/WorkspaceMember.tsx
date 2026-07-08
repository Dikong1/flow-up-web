import { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useModal } from '@/app/providers/ModalProvider';
import { useAppSelector } from '@/shared/hooks/redux';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/shared/ui/shadcn/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu';
import { UserInfo } from '@/shared/ui/UserInfo';
import { selectUser } from '@/store/slices/user-slice';
import { useDeleteMemberMutation } from '../api/hooks/';
import { ChangeRoleMember } from './ChangeRoleMember';

import type { IWorkspaceMember } from '../types/workspace-member';
import type { IWorkspacePermission } from '../types/workspace-permission';

interface IProps {
    member: IWorkspaceMember;
    permissions: IWorkspacePermission;
    workspaceId: string;
}

export const WorkspaceMember = ({
    member,
    permissions,
    workspaceId,
}: IProps) => {
    const { t } = useTranslation();
    const { open, close } = useModal();
    const currentUser = useAppSelector(selectUser);

    const [deleteMember] = useDeleteMemberMutation();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const handleChangeRole = () => {
        open({
            title: t('workspace.changeRoleTitle'),
            description: '',
            content: (
                <ChangeRoleMember
                    workspaceId={workspaceId}
                    member={member}
                    close={close}
                />
            ),
        });
    };

    const handleDeleteMember = async () => {
        try {
            await deleteMember({
                workspaceId,
                userId: member.user.id,
            }).unwrap();

            toast.success(t('workspace.memberDeletedSuccess'));
        } catch (error) {
            toast.error(t('workspace.memberDeletedError'));
        }

        setOpenDeleteAlert(false);
    };

    return (
        <>
            <div
                key={member.id}
                className="flex w-full items-center justify-between border-b px-2 py-2"
            >
                <UserInfo
                    userId={member.user.id}
                    role={member.role}
                    username={member.user.fullName}
                    userAvatar={member.user.avatar}
                />
                {permissions.canChangeRole &&
                    currentUser?.id !== member.user.id && (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Ellipsis className="cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="-translate-x-[50px]">
                                    <DropdownMenuItem
                                        onClick={handleChangeRole}
                                        className="font-medium"
                                    >
                                        {t('workspace.changeRoleAction')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setOpenDeleteAlert(true)}
                                        className="font-medium text-red-700"
                                    >
                                        {t('workspace.deleteMemberAction')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialog
                                open={openDeleteAlert}
                                onOpenChange={setOpenDeleteAlert}
                            >
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            {t(
                                                'workspace.deleteMemberConfirmTitle',
                                            )}
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {t(
                                                'workspace.deleteMemberConfirmDescription',
                                            )}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            {t('common.cancel')}
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDeleteMember}
                                        >
                                            {t('common.yes')}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
            </div>
        </>
    );
};
