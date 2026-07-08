import type { IWorkspace } from '../../types/workspace';

export interface UpdateWorkspaceBody {
    name: string;
    isArchived: boolean;
    icon: string;
}
export interface UpdateWorkspaceArgs {
    id: string;
    body: UpdateWorkspaceBody;
}
export type UpdateWorkspaceResponse = IWorkspace;
