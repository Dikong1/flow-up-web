import type { ITask } from './task';

export interface TableTask extends ITask {
    column: {
        id: string;
        name: string;
    };
}
