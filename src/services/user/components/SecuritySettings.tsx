import { CircleQuestionMark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/shared/ui/shadcn/tooltip';
import { ChangePassword } from './ChangePassword';

import type { IUser } from '../types/user';

interface IProps {
    user: IUser;
}

export const SecuritySettings = ({}: IProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="mb-1 text-base font-medium">
                        {t('user.authentication')}
                    </h2>
                    <Tooltip>
                        <TooltipTrigger>
                            <CircleQuestionMark size={18} />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-52">
                            <p>{t('user.socialsTooltip')}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center justify-between">
                        <span>{t('user.gmailLogin')}</span>
                        <span className="font-medium">{t('common.yes')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>{t('user.loginGithub')}</span>
                        <span className="font-medium">{t('common.no')}</span>
                    </div>
                </div>
            </div>
            <ChangePassword />
        </div>
    );
};
