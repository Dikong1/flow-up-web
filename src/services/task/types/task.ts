import type { IUser } from '@/services/user/types/user';
import type { ITaskAttachment } from './task-attachment';
import type { ITaskPriority } from './task-priority';
import type { ITaskTodo } from './task-todo';

export interface ITask {
    id: string;
    name: string;
    colId: string;
    description?: string;
    assigneeId?: string;
    assignee: Pick<IUser, 'id' | 'username' | 'avatar' | 'fullName'> | null;
    order: number;
    priorityId?: string;
    priority?: ITaskPriority;
    todos: ITaskTodo[];
    attachments: ITaskAttachment[];
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
}
