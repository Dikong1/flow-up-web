import { useTranslation } from 'react-i18next';
import { AlertDialogBlock } from '@/shared/ui/AlertDialogBlock';
import { Button } from '@/shared/ui/shadcn/button';

import type { IUser } from '../types/user';

interface IProps {
    user: IUser;
}

export const AccountSettings = ({ user }: IProps) => {
    const { t } = useTranslation();

    const handleDeleteAccount = () => {};

    return (
        <div>
            <div>
                <h2 className="mb-1 text-base font-medium">
                    {t('user.generalInfo')}
                </h2>
                <ul className="mb-2 flex flex-col gap-1 text-sm">
                    <li className="flex items-center justify-between">
                        <span>{t('auth.email')}:</span>
                        <span className="font-medium">{user.email}</span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span>{t('auth.username')}:</span>
                        <span className="font-medium">{user.username}</span>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-1 text-base font-medium">
                    {t('common.dangerZone')}
                </h2>
                <div>
                    <AlertDialogBlock
                        title={t('user.deleteAccountTitle')}
                        description={t('user.deleteAccountDescription')}
                        cancelLabel={t('common.no')}
                        actionLabel={t('common.yes')}
                        onClickAction={handleDeleteAccount}
                    >
                        <Button className="bg-red-600 hover:bg-red-400">
                            {t('user.deleteAccount')}
                        </Button>
                    </AlertDialogBlock>
                </div>
            </div>
        </div>
    );
};
