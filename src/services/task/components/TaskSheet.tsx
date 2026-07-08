import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { TaskDetails } from '@/services/task/components/TaskDetails';
import { Sheet, SheetContent, SheetTitle } from '@/shared/ui/shadcn/sheet';

export const TaskSheet = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const taskId = searchParams.get('taskId');
    const colId = searchParams.get('colId');

    useEffect(() => {
        if (taskId) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [searchParams]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-xs:py-8! max-xs:px-6! max-xxs:py-6! max-xss:px-2! w-full overflow-y-auto px-16 py-14 max-md:px-10 max-md:py-8 md:w-[45%]">
                <SheetTitle className="sr-only">{t('common.edit')}</SheetTitle>
                <div className="relative h-full">
                    {taskId && colId && (
                        <TaskDetails
                            close={() => setSearchParams({})}
                            colId={colId}
                            taskId={taskId}
                        />
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
