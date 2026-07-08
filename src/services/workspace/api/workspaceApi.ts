import { baseApi } from '@/shared/api/baseApi';
import { workspaceRoutes } from './routes';

import type { AddMemberArgs, AddMemberResponse } from './contracts/add-member';
import type {
    ChangeMemberRoleArgs,
    ChangeMemberRoleResponse,
} from './contracts/change-member-role';
import type {
    CheckInviteArgs,
    CheckInviteResponse,
} from './contracts/check-invite';
import type {
    CreateWorkspaceArgs,
    CreateWorkspaceResponse,
} from './contracts/create-workspace';
import type {
    DeleteMemberArgs,
    DeleteMemberResponse,
} from './contracts/delete-member';
import type {
    DeleteWorkspaceArgs,
    DeleteWorkspaceResponse,
} from './contracts/delete-workspace';
import type {
    GetActivityArgs,
    GetActivityResponse,
} from './contracts/get-activity';
import type {
    GetMyWorkspaceRoleArgs,
    GetMyWorkspaceRoleResponse,
} from './contracts/get-my-role';
import type {
    GetStatisticsArgs,
    GetStatisticsResponse,
} from './contracts/get-statistics';
import type {
    GetWorkspaceArgs,
    GetWorkspaceResponse,
} from './contracts/get-workspace';
import type {
    GetWorkspaceMembersArgs,
    GetWorkspaceMembersResponse,
} from './contracts/get-workspace-members';
import type { GetWorkspacesResponse } from './contracts/get-workspaces';
import type {
    JoinWorkspaceArgs,
    JoinWorkspaceResponse,
} from './contracts/join-workspace';
import type {
    LeaveWorkspaceArgs,
    LeaveWorkspaceResponse,
} from './contracts/leave-workspace';
import type {
    UpdateWorkspaceArgs,
    UpdateWorkspaceResponse,
} from './contracts/update-workspace';

export const workspaceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWorkspaces: builder.query<GetWorkspacesResponse, void>({
            query: () => ({
                url: workspaceRoutes.root(),
                method: 'GET',
            }),
            providesTags: ['Workspace'],
        }),
        getWorkspace: builder.query<GetWorkspaceResponse, GetWorkspaceArgs>({
            query: (id) => ({
                url: workspaceRoutes.byId(id),
                method: 'GET',
            }),
            providesTags: (_, __, id) => [{ type: 'Workspace', id }],
        }),
        createWorkspace: builder.mutation<
            CreateWorkspaceResponse,
            CreateWorkspaceArgs
        >({
            query: ({ body }) => ({
                url: workspaceRoutes.root(),
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Workspace'],
        }),
        updateWorkspace: builder.mutation<
            UpdateWorkspaceResponse,
            UpdateWorkspaceArgs
        >({
            query: ({ id, body }) => ({
                url: workspaceRoutes.byId(id),
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, __, arg) => [
                { type: 'Workspace', id: arg.id },
                { type: 'Workspace' },
            ],
        }),
        deleteWorkspace: builder.mutation<
            DeleteWorkspaceResponse,
            DeleteWorkspaceArgs
        >({
            query: ({ id }) => ({
                url: workspaceRoutes.byId(id),
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Workspace' }],
        }),
        getWorkspaceMembers: builder.query<
            GetWorkspaceMembersResponse,
            GetWorkspaceMembersArgs
        >({
            query: (id) => ({
                url: workspaceRoutes.members(id),
                method: 'GET',
            }),
            providesTags: (_, __, workspaceId) => [
                { type: 'WorkspaceMember', id: workspaceId },
            ],
        }),
        addMember: builder.mutation<AddMemberResponse, AddMemberArgs>({
            query: ({ id, body }) => ({
                url: workspaceRoutes.inviteLink(id),
                method: 'POST',
                body,
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'WorkspaceMember', id },
            ],
        }),
        checkInvite: builder.query<CheckInviteResponse, CheckInviteArgs>({
            query: (token) => ({
                url: workspaceRoutes.inviteByToken(token),
                method: 'GET',
            }),
        }),
        joinWorkspace: builder.mutation<
            JoinWorkspaceResponse,
            JoinWorkspaceArgs
        >({
            query: (token) => ({
                url: workspaceRoutes.acceptInvite(token),
                method: 'POST',
            }),
        }),
        getMyWorkspaceRole: builder.query<
            GetMyWorkspaceRoleResponse,
            GetMyWorkspaceRoleArgs
        >({
            query: (workspaceId) => ({
                url: workspaceRoutes.myRole(workspaceId),
                method: 'GET',
                responseHandler: 'text',
            }),
        }),
        changeMemberRole: builder.mutation<
            ChangeMemberRoleResponse,
            ChangeMemberRoleArgs
        >({
            query: ({ workspaceId, userId, body }) => ({
                url: workspaceRoutes.memberById(workspaceId, userId),
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, __, { workspaceId }) => [
                { type: 'WorkspaceMember', id: workspaceId },
            ],
        }),
        deleteMember: builder.mutation<DeleteMemberResponse, DeleteMemberArgs>({
            query: ({ workspaceId, userId }) => ({
                url: workspaceRoutes.memberById(workspaceId, userId),
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, { workspaceId }) => [
                { type: 'WorkspaceMember', id: workspaceId },
            ],
        }),
        getActivity: builder.query<GetActivityResponse, GetActivityArgs>({
            query: (id) => ({
                url: workspaceRoutes.activity(id),
                method: 'GET',
            }),
            providesTags: (_, __, workspaceId) => [
                { type: 'WorkspaceActivity', id: workspaceId },
            ],
        }),
        getStatistics: builder.query<GetStatisticsResponse, GetStatisticsArgs>({
            query: (id) => ({
                url: workspaceRoutes.statistics(id),
                method: 'GET',
            }),
            providesTags: (_, __, workspaceId) => [
                { type: 'WorkspaceStatistics', id: workspaceId },
            ],
        }),
        leaveWorkspace: builder.mutation<
            LeaveWorkspaceResponse,
            LeaveWorkspaceArgs
        >({
            query: (id) => ({
                url: workspaceRoutes.leave(id),
                method: 'POST',
            }),
        }),
    }),
    overrideExisting: false,
});
