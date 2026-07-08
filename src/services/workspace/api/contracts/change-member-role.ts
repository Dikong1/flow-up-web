import type { IWorkspaceMember } from '../../types/workspace-member';
import type { TWorkspaceRole } from '../../types/workspace-role';

export interface ChangeMemberRoleBody {
    role: TWorkspaceRole;
}
export interface ChangeMemberRoleArgs {
    workspaceId: string;
    userId: string;
    body: ChangeMemberRoleBody;
}
export type ChangeMemberRoleResponse = IWorkspaceMember;
