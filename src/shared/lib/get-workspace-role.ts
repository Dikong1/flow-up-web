import i18n from 'i18next';

import type { TWorkspaceRole } from '@/services/workspace/types/workspace-role';

export const getWorkspaceRole = (role: TWorkspaceRole) => {
    const map: Record<TWorkspaceRole, string> = {
        OWNER: 'role.owner',
        EDITOR: 'role.admin',
        MEMBER: 'role.member',
    };

    return i18n.t(map[role]);
};
