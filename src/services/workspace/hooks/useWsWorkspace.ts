import { useEffect } from 'react';
import { useWs } from '@/app/providers/WsProvider';
import { useUpdateWorkspaceActivity } from '@/shared/hooks/use-update-workspace-activity';

export const useWsWorkspace = (workspaceId: string | undefined) => {
    const { socket, status, joinWorkspace, leaveWorkspace } = useWs();
    const { handleUpdateWorkspaceActivity } =
        useUpdateWorkspaceActivity(workspaceId);

    useEffect(() => {
        if (!socket) return;

        socket.on('WORKSPACE_UPDATED', handleUpdateWorkspaceActivity);

        return () => {
            socket.off('WORKSPACE_UPDATED', handleUpdateWorkspaceActivity);
        };
    }, [socket, handleUpdateWorkspaceActivity]);

    useEffect(() => {
        if (status !== 'connected' || !workspaceId) return;

        joinWorkspace(workspaceId);

        return () => leaveWorkspace(workspaceId);
    }, [status, workspaceId, joinWorkspace, leaveWorkspace]);
};
