import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CopyLinkInput } from '@/shared/ui/CopyLinkInput';
import { Button } from '@/shared/ui/shadcn/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/shadcn/select';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/shared/ui/shadcn/tabs';
import { useAddMemberMutation } from '../api/hooks/';

import type { TWorkspaceRole } from '../types/workspace-role';

interface IProps {
    close: () => void;
    workspaceId: string;
}

export const AddMember = ({ workspaceId }: IProps) => {
    const { t } = useTranslation();
    const [role, setRole] = useState<TWorkspaceRole>('MEMBER');
    const [addMember, { data, isLoading }] = useAddMemberMutation();

    const handleAddMember = () => {
        if (!data) {
            addMember({ body: { role, expiresIn: 300 }, id: workspaceId });
        }
    };

    return (
        <>
            <div className="">
                <Tabs defaultValue="link" className="">
                    <TabsList className="mb-1 w-full">
                        <TabsTrigger value="link">
                            {t('workspace.inviteLinkTab')}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="link">
                        <Select
                            value={role}
                            onValueChange={(value: TWorkspaceRole) =>
                                setRole(value)
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={t(
                                        'workspace.selectRolePlaceholder',
                                    )}
                                />
                            </SelectTrigger>
                            <SelectContent className="text-lg">
                                <SelectItem value="MEMBER">
                                    {t('workspaceRole.member')}
                                </SelectItem>
                                <SelectItem value="EDITOR">
                                    {t('workspaceRole.editor')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="mt-2">
                            <CopyLinkInput
                                link={
                                    data?.inviteUrl
                                        ? `${data.inviteUrl}`
                                        : t('workspace.inviteLinkPlaceholder')
                                }
                            />
                        </div>
                        <Button
                            disabled={data ? true : false}
                            onClick={handleAddMember}
                            className="mt-3 w-full"
                        >
                            {isLoading ? (
                                <Spinner />
                            ) : (
                                <span>{t('workspace.generateInviteLink')}</span>
                            )}
                        </Button>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};
