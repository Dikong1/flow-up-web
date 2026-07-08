import type { ITask } from '../../types/task';

export interface MoveTaskArgs {
    boardId: string;
    colId: string;
    taskId: string;
    body: MoveTaskBody;
}
export interface MoveTaskBody {
    targetColId: string;
    newOrder: number;
}
export type MoveTaskResponse = ITask;
