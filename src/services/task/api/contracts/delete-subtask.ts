export interface DeleteSubtaskArgs {
    boardId: string;
    colId: string;
    taskId: string;
    subtaskId: string;
}
export type DeleteSubtaskResponse = boolean;
