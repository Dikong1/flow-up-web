import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/shadcn/button';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { cn } from '@/shared/utils/cn';
import { useGetCommentsQuery } from '../api/hooks';
import { TaskCommentItem } from './TaskCommentItem';

interface IProps {
    boardId: string;
    colId: string;
    taskId: string;
}

export const TaskCommentsList = ({ boardId, colId, taskId }: IProps) => {
    const { t } = useTranslation();
    const {
        data: comments,
        isLoading,
        isError,
        refetch,
    } = useGetCommentsQuery({ boardId, colId, taskId });
    const isNoComments = !comments || comments.length <= 0 || isError;

    const content = (() => {
        if (isLoading) return <Spinner className="size-5" />;

        if (isError)
            return (
                <div className="text-destructive text-center text-sm">
                    <p>{t('comments.errorLoad')}</p>
                    <p>{t('common.tryAgainLater')}</p>
                    <Button onClick={() => refetch()} className="mt-2">
                        {t('common.tryAgain')}
                    </Button>
                </div>
            );

        if (!comments || comments?.length <= 0)
            return (
                <p className="text-muted-foreground italic">
                    {' '}
                    {t('comments.empty')}
                </p>
            );

        return comments?.map((com) => (
            <TaskCommentItem
                key={com.id}
                comment={com}
                boardId={boardId}
                colId={colId}
                taskId={taskId}
            />
        ));
    })();

    return (
        <div
            className={cn(
                'scrollbar-thin scrollbar-thumb-border scrollbar-gutter-stable scrollbar-track-transparent hover:scrollbar-thumb-border flex max-h-[500px] flex-col gap-1 overflow-y-auto py-5',
                isNoComments && 'items-center',
            )}
        >
            {content}
        </div>
    );
};
