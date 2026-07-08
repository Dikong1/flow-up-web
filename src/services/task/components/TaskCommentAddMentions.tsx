import { useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';
import { useGetWorkspaceMembersQuery } from '@/services/workspace/api/hooks/';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar';
import { getUserInitials } from '@/shared/utils/get-user-initials';

interface IProps {
    mentionQuery: string | null;
    onPick: (username: string) => void;

    selectedIndex: number;
    setSelectedIndex: (i: number) => void;

    onListChange: (usernames: string[]) => void;
}

export const TaskCommentAddMentions = ({
    mentionQuery,
    onPick,
    selectedIndex,
    setSelectedIndex,
    onListChange,
}: IProps) => {
    const { workspaceId } = useParams();
    const { data: members = [], isLoading } = useGetWorkspaceMembersQuery(
        workspaceId ?? skipToken,
    );

    useEffect(() => {
        if (mentionQuery === null || isLoading || members.length === 0) {
            onListChange([]);
            return;
        }

        const q = mentionQuery.toLowerCase();
        const list = members
            .filter((m) => m.user.username.toLowerCase().startsWith(q))
            .slice(0, 8)
            .map((m) => m.user.username);

        onListChange(list);

        if (selectedIndex > list.length - 1) setSelectedIndex(0);
    }, [
        mentionQuery,
        isLoading,
        members,
        onListChange,
        selectedIndex,
        setSelectedIndex,
    ]);

    if (mentionQuery === null || isLoading || members.length === 0) return null;

    const q = mentionQuery.toLowerCase();
    const filtered = members
        .filter((m) => m.user.username.toLowerCase().startsWith(q))
        .slice(0, 8);

    if (filtered.length === 0) return null;

    return (
        <div className="bg-muted absolute top-full left-0 z-50 max-h-48 w-full overflow-y-auto rounded border shadow">
            {filtered.map((member, idx) => (
                <div
                    key={member.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => onPick(member.user.username)}
                    className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm ${
                        idx === selectedIndex ? 'bg-accent' : 'hover:bg-accent'
                    }`}
                >
                    <Avatar className="h-7 w-7">
                        <AvatarImage src={member.user.avatar} />
                        <AvatarFallback>
                            {getUserInitials(member.user.username)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="leading-4 font-medium">
                            {member.user.fullName}
                        </div>
                        <div className="text-muted-foreground text-xs font-medium">
                            @{member.user.username}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
