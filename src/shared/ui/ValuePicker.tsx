import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface IValuePickerProps {
    children?: ReactNode;
}

export const ValuePicker = ({ children }: IValuePickerProps) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex cursor-pointer items-center rounded-md px-2 py-1 text-sm font-medium transition-colors">
                {children ?? <span>{t('common.notSet')}</span>}
            </div>
        </>
    );
};
