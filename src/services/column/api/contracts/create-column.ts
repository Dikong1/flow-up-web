import type { IColumn } from '../../types/column';
import type { TColumnStatus } from '../../types/column-status';

export interface CreateColumnBody {
    name: string;
    status: TColumnStatus;
    color?: string;
}
export interface CreateColumnArgs {
    boardId: string;
    body: CreateColumnBody;
}
export type CreateColumnResponse = IColumn;
