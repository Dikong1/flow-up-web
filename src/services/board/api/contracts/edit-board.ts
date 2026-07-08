import type { IBoard } from '../../types/board';
import type { BoardParams } from './board-params';

export interface EditBoardBody {
    name: string;
}
export interface EditBoardArgs extends BoardParams {
    body: EditBoardBody;
}
export type EditBoardResponse = IBoard;
