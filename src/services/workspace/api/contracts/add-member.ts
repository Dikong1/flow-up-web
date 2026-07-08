import type { TWorkspaceRole } from '../../types/workspace-role';

export interface AddMemberBody {
    role: TWorkspaceRole;
    expiresIn: number;
}
export interface AddMemberArgs {
    id: string;
    body: AddMemberBody;
}
export interface AddMemberResponse {
    inviteUrl: string;
}
