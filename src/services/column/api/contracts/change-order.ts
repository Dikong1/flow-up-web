import type { IColumn } from '../../types/column';

export interface ChangeOrderBody {
    newOrder: number;
}
export interface ChangeOrderArgs {
    boardId: string;
    colId: string;
    body: ChangeOrderBody;
}
export type ChangeOrderResponse = IColumn;
