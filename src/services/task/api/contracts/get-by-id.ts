import type { ITask } from '../../types/task';

export interface GetTaskByIdArgs {
    boardId: string;
    colId: string;
    taskId: string;
}
export type GetTaskByIdResponse = ITask;
