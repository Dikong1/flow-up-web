import type { ITaskTodo } from '../../types/task-todo';

export interface CreateSubtaskArgs {
    boardId: string;
    colId: string;
    taskId: string;
    body: CreateSubtaskBody;
}
export interface CreateSubtaskBody {
    title: string;
}
export type CreateSubtaskResponse = ITaskTodo;
