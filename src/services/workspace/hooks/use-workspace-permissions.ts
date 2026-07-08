import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMyWorkspaceRoleQuery } from '@/services/workspace/api/hooks/';
import { useCurrentWorkspace } from '@/shared/hooks/use-current-workspace';
import { getPermissions } from '../lib/get-permissions';

import type { TWorkspaceRole } from '@/services/workspace/types/workspace-role';

interface IParams {
    isAssignee?: boolean;
}

export const useWorkspacePermissions = ({ isAssignee }: IParams) => {
    const { workspaceId } = useCurrentWorkspace();
    const { data: role } = useGetMyWorkspaceRoleQuery(workspaceId ?? skipToken);
    let effectiveRole: TWorkspaceRole = 'MEMBER';

    if (role) {
        effectiveRole = role;
    }

    return {
        role: effectiveRole,
        permissions: getPermissions({
            workspaceRole: effectiveRole,
            isAssignee,
        }),
    };
};
