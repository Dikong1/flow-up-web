import type { TWorkspaceRole } from './workspace-role';

export interface IPermissionContext {
    workspaceRole: TWorkspaceRole;
    isAssignee?: boolean;
}
