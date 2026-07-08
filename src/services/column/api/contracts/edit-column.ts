import type { IColumn } from '../../types/column';
import type { TColumnStatus } from '../../types/column-status';

export interface EditColumnBody {
    name: string;
    status: TColumnStatus;
    color?: string;
}
export interface EditColumnArgs {
    boardId: string;
    colId: string;
    body: EditColumnBody;
}
export type EditColumnResponse = IColumn;
