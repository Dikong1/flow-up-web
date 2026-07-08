export interface ITaskRecent {
    task: {
        column: {
            board: {
                workspace: {
                    id: string;
                    name: string;
                };
                id: string;
                name: string;
            };
            id: string;
            name: string;
        };
        id: string;
        name: string;
    };
    taskId: string;
    lastOpenedAt: string;
}
