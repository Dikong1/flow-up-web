import type { ITaskTodo } from '../../types/task-todo';

export interface UpdateSubtaskArgs {
    boardId: string;
    colId: string;
    taskId: string;
    subtaskId: string;
    body: UpdateSubtaskBody;
}
export interface UpdateSubtaskBody {
    title?: string;
    completed?: boolean;
}
export type UpdateSubtaskResponse = ITaskTodo;
