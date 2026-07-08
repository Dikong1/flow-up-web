import type { ITask } from '../../types/task';

export interface CreateTaskArgs {
    boardId: string;
    colId: string;
    body: CreateTaskBody;
}
export interface CreateTaskBody {
    name: string;
}
export type CreateTaskResponse = ITask;
