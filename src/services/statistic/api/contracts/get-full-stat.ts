import type {
    ITaskCumulativeSeries,
    ITasksFlowSeries,
    TaskCountByPriority,
} from '../../types';

export type GetFullStatArgs = string;
export type GetFullStatResponse = {
    flow: ITasksFlowSeries;
    cumulative: ITaskCumulativeSeries;
    byPriority: TaskCountByPriority;
};
