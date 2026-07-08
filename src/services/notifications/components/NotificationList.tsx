import { PanelLeftClose, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '@/shared/hooks/use-click-outside';
import { Button } from '@/shared/ui/shadcn/button';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { cn } from '@/shared/utils/cn';
import { NotificationItem } from './NotificationItem';

import type { Notification } from '../types/notification';

interface IProps {
    open: boolean;
    close: () => void;
    notifications: Notification[] | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
}

export const NotificationList = ({
    open,
    close,
    notifications,
    isLoading,
    isError,
    refetch,
}: IProps) => {
    const { t } = useTranslation();
    const ref = useClickOutside<HTMLDivElement>(close);

    const isEmptyList =
        !isLoading && !isError && (notifications?.length ?? 0) === 0;

    const content = (() => {
        if (isLoading) {
            return <Spinner className="size-7" />;
        }

        if (isError) {
            return (
                <div className="flex flex-col items-center gap-1 text-center">
                    <span className="text-destructive font-medium">
                        {t('notifications.error')}
                    </span>
                    <Button
                        variant="ghost"
                        onClick={refetch}
                        aria-label={t('notifications.title')}
                    >
                        <RotateCcw />
                    </Button>
                </div>
            );
        }

        if (isEmptyList) {
            return (
                <div className="font-medium italic">
                    {t('notifications.empty')}
                </div>
            );
        }

        return notifications!.map((item) => (
            <NotificationItem key={item.id} notification={item} />
        ));
    })();

    return (
        <div
            ref={ref}
            className={cn(
                'fixed top-0 -left-[120%] h-dvh px-4 py-3 transition-all duration-350',
                'bg-background z-1000 w-[350px] border',
                open && 'left-(--sidebar-width) max-lg:left-0 max-lg:w-full',
            )}
        >
            <div className="flex h-full flex-col">
                <div className="mb-5 flex shrink-0 items-center justify-between">
                    <span className="text-base font-medium">
                        {t('notifications.title')}
                    </span>
                    <Button variant="ghost" onClick={close}>
                        <PanelLeftClose />
                    </Button>
                </div>
                <div
                    className={cn(
                        'scrollbar-gutter-stable scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-border flex-1 overflow-y-auto overscroll-contain',
                        isEmptyList || isLoading || isError
                            ? 'flex items-center justify-center'
                            : 'flex flex-col gap-3 max-sm:gap-2',
                    )}
                >
                    {content}
                </div>
            </div>
        </div>
    );
};
