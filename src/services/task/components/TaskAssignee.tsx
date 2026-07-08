import { useState } from 'react';
import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/ui/shadcn/popover';
import { ValuePicker } from '@/shared/ui/ValuePicker';
import { TaskAssigneeMembers } from './TaskAssigneeMembers';

import type { IUser } from '@/services/user/types/user';

interface IProps {
    taskAssignee?: Pick<
        IUser,
        'id' | 'username' | 'avatar' | 'fullName'
    > | null;
    handleAssigneeChange: (
        assignee: Pick<IUser, 'id' | 'username' | 'avatar' | 'fullName'> | null,
    ) => void;
}

export const TaskAssignee = ({
    taskAssignee,
    handleAssigneeChange,
}: IProps) => {
    const { t } = useTranslation();
    const { workspaceId } = useParams();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="mb-1 flex items-center gap-1 text-base font-medium text-[#ada9a3]">
                <Users width={18} />
                <span>{t('task.assignee')}</span>
            </div>
            <Popover
                open={open}
                onOpenChange={(nextOpen) => {
                    setOpen(nextOpen);
                }}
            >
                <PopoverTrigger>
                    <ValuePicker>
                        {taskAssignee && (
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage
                                        src={taskAssignee.avatar || ''}
                                    />
                                    <AvatarFallback className="text-[10px]">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                    {taskAssignee.fullName}
                                </span>
                            </div>
                        )}
                    </ValuePicker>
                </PopoverTrigger>
                <PopoverContent>
                    <TaskAssigneeMembers
                        workspaceId={workspaceId}
                        handleAssigneeChange={handleAssigneeChange}
                        setOpen={setOpen}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
