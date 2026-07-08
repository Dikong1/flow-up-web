import type { IPermissionContext } from '../types/permission-context';

// --- Workspace ---
export const canEditWorkspace = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

export const canDeleteWorkspace = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER';

// --- Members ---
export const canInviteMember = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

export const canDeleteMember = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER';

export const canChangeRole = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER';

// --- Board ---
export const canCreateBoard = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

export const canEditBoard = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

export const canDeleteBoard = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER';

// --- Column ---
export const canCreateColumn = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

export const canEditColumn = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

export const canDeleteColumn = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

// --- Task ---
export const canCreateTask = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

export const canEditTask = (ctx: IPermissionContext): boolean => {
    if (ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR')
        return true;
    if (ctx.isAssignee) return true;
    return false;
};

export const canDeleteTask = (ctx: IPermissionContext): boolean =>
    ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR';

export const canMoveTask = (ctx: IPermissionContext): boolean => {
    if (ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR')
        return true;
    if (ctx.isAssignee) return true;
    return false;
};

// --- Comments ---
export const canCreateComment = (ctx: IPermissionContext): boolean => {
    if (ctx.workspaceRole === 'OWNER' || ctx.workspaceRole === 'EDITOR')
        return true;
    if (ctx.isAssignee) return true;
    return false;
};

export const canEditComment = (ctx: IPermissionContext): boolean =>
    !!ctx.isAssignee;

export const canDeleteComment = (ctx: IPermissionContext): boolean => {
    if (ctx.workspaceRole === 'OWNER') return true;
    if (ctx.isAssignee) return true;
    return false;
};
