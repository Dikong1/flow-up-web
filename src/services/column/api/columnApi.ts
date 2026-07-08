import { baseApi } from '@/shared/api/baseApi';
import { columnRoutes } from './routes';

import type {
    ChangeOrderArgs,
    ChangeOrderResponse,
} from './contracts/change-order';
import type {
    CreateColumnArgs,
    CreateColumnResponse,
} from './contracts/create-column';
import type {
    DeleteColumnArgs,
    DeleteColumnResponse,
} from './contracts/delete-column';
import type {
    EditColumnArgs,
    EditColumnResponse,
} from './contracts/edit-column';
import type {
    GetAllColumnsArgs,
    GetAllColumnsResponse,
} from './contracts/get-all-columns';

export const columnApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllColumns: builder.query<GetAllColumnsResponse, GetAllColumnsArgs>({
            query: (boardId) => ({
                url: columnRoutes.root(boardId),
                method: 'GET',
            }),
            providesTags: (result, _, boardId) =>
                result
                    ? [
                          ...result.map((col) => ({
                              type: 'Columns' as const,
                              id: col.id,
                          })),
                          { type: 'Columns' as const, id: `LIST-${boardId}` },
                      ]
                    : [{ type: 'Columns' as const, id: `LIST-${boardId}` }],
        }),
        createColumn: builder.mutation<CreateColumnResponse, CreateColumnArgs>({
            query: ({ boardId, body }) => ({
                url: columnRoutes.root(boardId),
                method: 'POST',
                body,
            }),
            invalidatesTags: (_, __, { boardId }) => [
                { type: 'Columns', id: `LIST-${boardId}` },
            ],
        }),
        changeOrder: builder.mutation<ChangeOrderResponse, ChangeOrderArgs>({
            query: ({ boardId, colId, body }) => ({
                url: columnRoutes.changeOrder(boardId, colId),
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, __, { boardId }) => [
                { type: 'Columns', id: `LIST-${boardId}` },
            ],
        }),
        editColumn: builder.mutation<EditColumnResponse, EditColumnArgs>({
            query: ({ boardId, colId, body }) => ({
                url: columnRoutes.byId(boardId, colId),
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, __, { colId }) => [
                { type: 'Columns', id: colId },
            ],
        }),
        deleteColumn: builder.mutation<DeleteColumnResponse, DeleteColumnArgs>({
            query: ({ boardId, colId }) => ({
                url: columnRoutes.byId(boardId, colId),
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, { colId }) => [
                { type: 'Columns', id: colId },
            ],
        }),
    }),
    overrideExisting: false,
});
