import { useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';
import { useChangeNameMutation } from '../api/hooks/';
import { AvatarBlock } from './AvatarBlock';

import type { IUser } from '../types/user';

interface IProps {
    user: IUser;
}

export const ProfileSettings = ({ user }: IProps) => {
    const [changeName, { isLoading }] = useChangeNameMutation();

    const { t } = useTranslation();

    const [isEdit, setIsEdit] = useState(false);
    const [fullName, setFullName] = useState(user.fullName);

    const initialState = useRef({
        fullName: user.fullName,
    });
    const isDirty = initialState.current.fullName !== fullName;

    const handleChangeName = async () => {
        try {
            await changeName({ body: { name: fullName } }).unwrap();

            toast.success(t('user.changeNameSuccess'));
        } catch (error) {
            toast.error(t('user.changeNameError'));
        }

        setIsEdit(false);
    };

    return (
        <>
            <AvatarBlock user={user} />
            <div className="mb-5">
                <Label className="mb-1">{t('auth.fullName')}</Label>
                <div className="relative">
                    <Input
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        disabled={!isEdit || isLoading}
                    />
                    <button
                        onClick={() => setIsEdit((prev) => !prev)}
                        className="absolute top-1/2 right-3 z-10 -translate-y-1/2"
                    >
                        <Pencil size={16} />
                    </button>
                </div>
            </div>
            <div className="flex justify-end">
                <Button onClick={handleChangeName} disabled={!isDirty}>
                    {t('common.save')}
                </Button>
            </div>
        </>
    );
};
