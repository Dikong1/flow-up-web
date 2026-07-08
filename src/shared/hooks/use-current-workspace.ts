import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';
import { useGetWorkspaceQuery } from '@/services/workspace/api/hooks/';

export const useCurrentWorkspace = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { data } = useGetWorkspaceQuery(
        workspaceId ? workspaceId : skipToken,
    );

    return {
        workspaceId,
        currentWorkspace: data ?? null,
    };
};
