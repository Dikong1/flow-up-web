import type { IWorkspaceMember } from '../../types/workspace-member';

export interface DeleteMemberArgs {
    workspaceId: string;
    userId: string;
}
export type DeleteMemberResponse = IWorkspaceMember;
