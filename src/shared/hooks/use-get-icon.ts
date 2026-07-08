import { WORKSPACE_ICON_MAP } from '@/services/workspace/constants/workspace-icon-map';

import type { TWorkspaceIcon } from '@/services/workspace/types/workspace-icon';

export const useGetIcon = (icon?: TWorkspaceIcon | null) => {
    return WORKSPACE_ICON_MAP[icon ?? 'home'];
};
