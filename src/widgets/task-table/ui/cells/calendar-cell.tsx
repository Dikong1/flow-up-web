import { formatActivityTime } from '@/shared/lib/formate-activity-time';
import { useTranslation } from 'react-i18next';

export const CalendarCell = ({ value }: { value: string | undefined }) => {
    const { t } = useTranslation();

    if (!value) {
        return <>{t('common.notSet')}</>;
    }

    return <span className="italic">{formatActivityTime(value)}</span>;
};
