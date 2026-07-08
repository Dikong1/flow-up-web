import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGetWorkspaceMembersQuery } from '@/services/workspace/api/hooks/';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/shared/ui/shadcn/command';
import { Spinner } from '@/shared/ui/shadcn/spinner';
import { cn } from '@/shared/utils/cn';

import type { IUser } from '@/services/user/types/user';

interface IProps {
    workspaceId: string | undefined;
    handleAssigneeChange: (
        assignee: Pick<IUser, 'id' | 'username' | 'avatar' | 'fullName'> | null,
    ) => void;
    setOpen: (v: boolean) => void;
}

export const TaskAssigneeMembers = ({
    workspaceId,
    handleAssigneeChange,
    setOpen,
}: IProps) => {
    const { t } = useTranslation();

    const {
        data: members,
        isLoading,
        isError,
    } = useGetWorkspaceMembersQuery(workspaceId ?? skipToken);

    const [assigneeId, setAssigneeId] = useState('');

    const content = (() => {
        if (isLoading) return <Spinner />;

        if (isError) return <div>{t('task.assigneeLoadError')}</div>;

        return (
            <>
                <CommandItem
                    onSelect={() => {
                        handleAssigneeChange(null);
                        setOpen(false);
                    }}
                    className="text-red-500"
                >
                    {t('task.assigneeRemove')}
                </CommandItem>
                {members?.map((member) => (
                    <CommandItem
                        key={member.id}
                        value={member.user.username}
                        onSelect={(_) => {
                            setAssigneeId(
                                member.userId === assigneeId
                                    ? ''
                                    : member.userId,
                            );
                            handleAssigneeChange(member.user);
                            setOpen(false);
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={member.user.avatar || ''} />
                                <AvatarFallback className="text-[10px]">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                                {member.user.fullName}
                            </span>
                        </div>
                        <Check
                            className={cn(
                                'ml-auto',
                                assigneeId === member.userId
                                    ? 'opacity-100'
                                    : 'opacity-0',
                            )}
                        />
                    </CommandItem>
                ))}
            </>
        );
    })();

    return (
        <Command>
            <CommandInput
                placeholder={t('workspace.membersSearchPlaceholder')}
                className="h-9"
            />
            <CommandList>
                <CommandEmpty>{t('common.noResults')}</CommandEmpty>
                <CommandGroup>{content}</CommandGroup>
            </CommandList>
        </Command>
    );
};
