import type { IWorkspace } from '../../types/workspace';

export interface CreateWorkspaceBody {
    name: string;
}
export interface CreateWorkspaceArgs {
    body: CreateWorkspaceBody;
}
export type CreateWorkspaceResponse = IWorkspace;
