import { useMemo, useState } from 'react';
import { BellDot, Home, LogOut, Settings, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { useModal } from '@/app/providers/ModalProvider';
import { useLogoutMutation } from '@/services/auth/api/hooks/';
import { useGetAllNotificationsQuery } from '@/services/notifications/api/hooks/';
import { NotificationList } from '@/services/notifications/components/NotificationList';
import { UserSettings } from '@/services/user/components/UserSettings';
import { useGetWorkspacesQuery } from '@/services/workspace/api/hooks/';
import { CreateWorkspace } from '@/services/workspace/components/CreateWorkspace';
import { WorkspaceList } from '@/services/workspace/components/WorkspaceList';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { routes } from '@/shared/routes';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/ui/shadcn/sidebar';
import { cn } from '@/shared/utils/cn';
import { logout } from '@/store/slices/auth-slice';
import { selectUser, setUser } from '@/store/slices/user-slice';
import { SettingsModal } from './SettingsModal';

export const AppSidebar = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const { open, close } = useModal();
    const [logoutFromServer] = useLogoutMutation();

    const {
        data: notifications,
        isLoading: isLoadingNotifications,
        isError: isErrorNotifications,
        refetch,
    } = useGetAllNotificationsQuery();

    const unreadNotications = useMemo(() => {
        if (!notifications) return [];
        return notifications.filter((item) => item.read !== true);
    }, [notifications]);

    const {
        data: workspaces,
        isLoading: isLoadingWorkspaces,
        isError: isErrorWorkspaces,
    } = useGetWorkspacesQuery();

    const [openNotifications, setOpenNotifications] = useState(false);

    const onCreateWorkspace = () => {
        open({
            title: t('workspace.create'),
            description: t('workspace.createDescription'),
            content: <CreateWorkspace close={close} />,
        });
    };

    const handleOpenProfile = () => {
        open({
            title: t('profile.title'),
            description: t('profile.description'),
            content: <UserSettings close={close} />,
        });
    };

    const handleOpenSettings = () => {
        open({
            title: t('sidebar.settings'),
            description: t('common.settingsDescription'),
            content: <SettingsModal close={close} />,
        });
    };

    const handleLogout = async () => {
        dispatch(setUser(null));
        dispatch(logout());

        try {
            await logoutFromServer().unwrap();
        } catch (error) {
            console.error(error);
        }

        navigate('/auth', { replace: true });
    };

    return (
        <Sidebar className="z-1000 shrink-0">
            <SidebarHeader>
                <SidebarMenuButton asChild>
                    <button type="button" onClick={handleOpenProfile}>
                        <User className="size-5 shrink-0" />
                        <span className="font-medium">{user?.fullName}</span>
                    </button>
                </SidebarMenuButton>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-0">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={routes.home()}>
                                    <Home className="size-5 shrink-0" />
                                    <span className="font-medium">
                                        {t('sidebar.home')}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpenNotifications((prev) => !prev);
                                    }}
                                    className={cn(
                                        openNotifications &&
                                            'bg-accent text-primary',
                                    )}
                                >
                                    <BellDot className="size-5 shrink-0" />
                                    <span className="font-medium">
                                        {t('notifications.title')}
                                    </span>

                                    {unreadNotications.length > 0 ? (
                                        <span className="bg-primary ml-auto flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white group-data-[collapsible=icon]:hidden">
                                            {unreadNotications.length}
                                        </span>
                                    ) : null}
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    <WorkspaceList
                        title={t('sidebar.workspaces')}
                        items={workspaces}
                        isLoading={isLoadingWorkspaces}
                        isError={isErrorWorkspaces}
                        createElement={{
                            createTitle: t('workspace.create'),
                            createAction: onCreateWorkspace,
                        }}
                    />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuButton asChild>
                    <button type="button" onClick={handleOpenSettings}>
                        <Settings className="size-5 shrink-0" />
                        <span className="text-sm font-medium">
                            {t('sidebar.settings')}
                        </span>
                    </button>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                    <button type="button" onClick={handleLogout}>
                        <LogOut className="size-5 shrink-0" />
                        <span className="text-sm font-medium">
                            {t('sidebar.logout')}
                        </span>
                    </button>
                </SidebarMenuButton>
            </SidebarFooter>

            <NotificationList
                open={openNotifications}
                isLoading={isLoadingNotifications}
                isError={isErrorNotifications}
                notifications={notifications}
                refetch={refetch}
                close={() => setOpenNotifications(false)}
            />
        </Sidebar>
    );
};
