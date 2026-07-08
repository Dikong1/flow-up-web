import type { IUser } from '@/services/user/types/user';
import type { IUpdateTaskDto } from '../../types';
import type { ITask } from '../../types/task';

export type TaskAssigneePick = Pick<
    IUser,
    'id' | 'username' | 'avatar' | 'fullName'
>;

export interface UpdateTaskArgs {
    boardId: string;
    colId: string;
    taskId: string;
    assignee: TaskAssigneePick | null | undefined;
    body: UpdateTaskBody;
}
export type UpdateTaskBody = IUpdateTaskDto;
export type UpdateTaskResponse = ITask;
