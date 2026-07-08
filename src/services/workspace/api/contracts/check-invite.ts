import type { TWorkspaceRole } from '../../types/workspace-role';

export type CheckInviteArgs = string;
export interface CheckInviteResponse {
    workspaceId: string;
    role: TWorkspaceRole;
    workspaceName: string;
}
