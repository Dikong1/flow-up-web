import { History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGetRecentTasksQuery } from '@/services/user-activity/api/hooks/';
import { TaskBlock } from '@/services/user-activity/components/TaskBlock';
import { useTitle } from '@/shared/hooks/use-title';
import { AnimatedTitle } from '@/shared/ui/AnimatedTitle';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/shared/ui/shadcn/carousel';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { getErrorMessage } from '@/shared/utils/get-error-message';

const HomePage = () => {
    useTitle('Home');
    const { data, isLoading, isError, error } = useGetRecentTasksQuery();
    const { t } = useTranslation();

    const getRandomTitle = () => {
        const randNumber = Math.floor(Math.random() * 5) + 1;

        return `title${randNumber}`;
    };

    const content = (() => {
        if (isLoading)
            return (
                <div className="flex justify-center py-5">
                    <Spinner className="size-6" />
                </div>
            );
        if (isError)
            return (
                <div className="py-24 text-center text-lg font-semibold text-red-600">
                    {t('column.loadError', { error: getErrorMessage(error) })}
                </div>
            );
        if (data?.length === 0)
            return (
                <div className="py-24 text-center text-lg text-gray-500">
                    {t('task.empty')}
                </div>
            );
        if (!data) return;

        return (
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full"
            >
                <CarouselContent className="">
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="basis-auto">
                            <TaskBlock taskRecent={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        );
    })();

    return (
        <div className="w-full">
            <AnimatedTitle>{t(`home.${getRandomTitle()}`)}</AnimatedTitle>
            <div className="mx-auto w-full max-w-5xl pt-10">
                <h2 className="mb-1 flex items-center gap-1.5 text-lg">
                    <History size={20} className="mt-0.5" color="#9a9fa5" />
                    <span className="text-muted-foreground">
                        {t('home.lastOpenedTasks')}
                    </span>
                </h2>
                {content}
            </div>
        </div>
    );
};

export default HomePage;
