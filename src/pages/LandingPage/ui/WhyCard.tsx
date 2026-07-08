import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';

import type { LucideIcon } from 'lucide-react';

interface IProps {
    labelKey: string;
    icon: LucideIcon;
    className?: string;
}

export const WhyCard = ({ labelKey, icon: Icon, className }: IProps) => {
    const { t } = useTranslation();

    return (
        <div className={cn('', className)}>
            <div className="flex flex-col items-center gap-2 max-sm:gap-1">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold max-sm:text-lg">
                    {t(`${labelKey}.title`)}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed max-sm:text-sm">
                    {t(`${labelKey}.description`)}
                </p>
            </div>
        </div>
    );
};
