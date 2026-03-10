import { baseApi } from "@/shared/api/baseApi";
import { boardRoutes } from "./routes";
import type { GetBoardArgs, GetBoardResponse } from "./contracts/get-board";
import type { CreateBoardArgs, CreateBoardResponse } from "./contracts/create-board";
import type { EditBoardArgs, EditBoardResponse } from "./contracts/edit-board";
import type { DeleteBoardArgs, DeleteBoardResponse } from "./contracts/delete-board";
import type { GetMyBoardRoleArgs, GetMyBoardRoleResponse } from "./contracts/get-my-role";
import type { ChangeBoardRoleArgs, ChangeBoardRoleResponse } from "./contracts/change-role";
import type { GetBoardMembersArgs, GetBoardMembersResponse } from "./contracts/get-members";
import type { CompleteUploadImageArgs, CompleteUploadImageResponse } from "./contracts/complete-upload-image";
import type { PresignUploadImageArgs, PresignUploadImageResponse } from "./contracts/presign-upload-image";

export const boardApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getBoard: builder.query<GetBoardResponse, GetBoardArgs>({
			query: ({ workspaceId, boardId }) => ({
				url: boardRoutes.byId(workspaceId, boardId),
				method: "GET",
			}),
			providesTags: (_, __, { boardId }) => [{ type: "Board", id: boardId }],
		}),

		createBoard: builder.mutation<CreateBoardResponse, CreateBoardArgs>({
			query: ({ workspaceId, body }) => ({
				url: boardRoutes.root(workspaceId),
				method: "POST",
				body: {
					name: body.name,
					...(body.template !== "empty" && { template: body.template }),
				}
			}),
			invalidatesTags: (_, __, { workspaceId }) => [
				{ type: "Workspace", id: workspaceId },
			],
		}),

		editBoard: builder.mutation<EditBoardResponse, EditBoardArgs>({
			query: ({ workspaceId, boardId, body }) => ({
				url: boardRoutes.byId(workspaceId, boardId),
				method: "PATCH",
				body,
			}),
			invalidatesTags: (_, __, { workspaceId }) => [
				{ type: "Workspace", id: workspaceId },
			],
		}),

		deleteBoard: builder.mutation<DeleteBoardResponse, DeleteBoardArgs>({
			query: ({ workspaceId, boardId }) => ({
				url: boardRoutes.byId(workspaceId, boardId),
				method: "DELETE",
			}),
			invalidatesTags: (_, __, { workspaceId }) => [
				{ type: "Workspace", id: workspaceId },
			],
		}),

		getMyBoardRole: builder.query<GetMyBoardRoleResponse, GetMyBoardRoleArgs>({
			query: ({ workspaceId, boardId }) => ({
				url: boardRoutes.role(workspaceId, boardId),
				method: "GET",
			}),
		}),

		changeBoardRole: builder.mutation<ChangeBoardRoleResponse, ChangeBoardRoleArgs>({
			query: ({ workspaceId, boardId, body }) => ({
				url: boardRoutes.changeRole(workspaceId, boardId),
				method: "POST",
				body,
			}),
		}),

		getBoardMembers: builder.query<GetBoardMembersResponse, GetBoardMembersArgs>({
			query: ({ workspaceId, boardId }) => ({
				url: boardRoutes.members(workspaceId, boardId),
				method: "GET",
			}),
		}),

		presignUploadImage: builder.mutation<
			PresignUploadImageResponse,
			PresignUploadImageArgs
		>({
			query: ({ workspaceId, boardId, body }) => ({
				url: boardRoutes.presignUploadImage(workspaceId, boardId),
				method: "POST",
				body,
			}),
		}),

		completeUploadImage: builder.mutation<
			CompleteUploadImageResponse,
			CompleteUploadImageArgs
		>({
			query: ({ workspaceId, boardId, body }) => ({
				url: boardRoutes.completeUploadAvatar(workspaceId, boardId),
				method: "POST",
				body,
			}),
			invalidatesTags: (_, __, { workspaceId }) => [
				{ type: "Workspace", id: workspaceId },
			],
		}),
	}),
	overrideExisting: false,
});