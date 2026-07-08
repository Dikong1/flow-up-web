import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar';
import { selectUser } from '@/store/slices/user-slice';
import { useAppSelector } from '../hooks/redux';
import { getUserInitials } from '../utils/get-user-initials';

interface IUserInfoProps {
    userId: string;
    role: string;
    username: string;
    userAvatar: string;
}

export const UserInfo = ({
    userId,
    role,
    username,
    userAvatar,
}: IUserInfoProps) => {
    const currentUser = useAppSelector(selectUser);

    const { t } = useTranslation();

    return (
        <>
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={userAvatar ?? ''} />
                    <AvatarFallback>{getUserInitials(username)}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-1 font-medium">
                        <span>{username}</span>
                        <span>
                            {currentUser?.id === userId &&
                                `(${t('common.you')})`}
                        </span>
                    </div>
                    <div className="text-sm italic">
                        {t(`workspaceRole.${role.toLowerCase()}`)}
                    </div>
                </div>
            </div>
        </>
    );
};
