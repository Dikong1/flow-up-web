import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { formatActivityTime } from '@/shared/lib/formate-activity-time';
import { routes } from '@/shared/routes';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/ui/shadcn/card';

import type { ITaskRecent } from '../types/task-recent';

interface IProps {
    taskRecent: ITaskRecent;
}

export const TaskBlock = ({ taskRecent }: IProps) => {
    const taskBreadcrumbs = `${taskRecent.task.column.board.workspace.name}/${taskRecent.task.column.board.name}/${taskRecent.task.column.name}`;

    return (
        <Card className="w-52 gap-0 py-4">
            <CardHeader className="gap-0">
                <CardTitle className="flex items-center justify-between">
                    <span className="max-w-[145px] truncate text-base">
                        {taskRecent.task.name}
                    </span>
                    <Link
                        className="shrink-0"
                        to={routes.task({
                            workspaceId:
                                taskRecent.task.column.board.workspace.id,
                            boardId: taskRecent.task.column.board.id,
                            colId: taskRecent.task.column.id,
                            taskId: taskRecent.taskId,
                        })}
                    >
                        <ArrowRight
                            size={18}
                            className="hover:text-foreground/70 mt-0.5 transition-colors"
                        />
                    </Link>
                </CardTitle>
                <span className="text-muted-foreground truncate text-sm">
                    {taskBreadcrumbs}
                </span>
            </CardHeader>
            <CardContent className="text-muted-foreground pt-1 text-sm">
                <span>{formatActivityTime(taskRecent.lastOpenedAt)}</span>
            </CardContent>
        </Card>
    );
};
