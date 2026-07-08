import * as permissions from '../constants/workspace-permissions';

import type { IPermissionContext } from '../types/permission-context';

export const getPermissions = (ctx: IPermissionContext) => ({
    canEditWorkspace: permissions.canEditWorkspace(ctx),
    canDeleteWorkspace: permissions.canDeleteWorkspace(ctx),
    canInviteMember: permissions.canInviteMember(ctx),
    canDeleteMember: permissions.canDeleteMember(ctx),
    canChangeRole: permissions.canChangeRole(ctx),
    canCreateBoard: permissions.canCreateBoard(ctx),
    canEditBoard: permissions.canEditBoard(ctx),
    canDeleteBoard: permissions.canDeleteBoard(ctx),
    canCreateColumn: permissions.canCreateColumn(ctx),
    canEditColumn: permissions.canEditColumn(ctx),
    canDeleteColumn: permissions.canDeleteColumn(ctx),
    canCreateTask: permissions.canCreateTask(ctx),
    canEditTask: permissions.canEditTask(ctx),
    canDeleteTask: permissions.canDeleteTask(ctx),
    canMoveTask: permissions.canMoveTask(ctx),
    canCreateComment: permissions.canCreateComment(ctx),
    canEditComment: permissions.canEditComment(ctx),
    canDeleteComment: permissions.canDeleteComment(ctx),
});
