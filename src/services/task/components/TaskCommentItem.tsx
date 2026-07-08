import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Ellipsis, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAppSelector } from '@/shared/hooks/redux';
import { formatActivityTime } from '@/shared/lib/formate-activity-time';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu';
import { getUserInitials } from '@/shared/utils/get-user-initials';
import { selectUser } from '@/store/slices/user-slice';
import { useDeleteCommentMutation, useEditCommentMutation } from '../api/hooks';

import type { ITaskComment } from '../types/task-comment';

interface IProps {
    comment: ITaskComment;
    boardId: string;
    colId: string;
    taskId: string;
}

export const TaskCommentItem = ({
    comment,
    boardId,
    colId,
    taskId,
}: IProps) => {
    const { t } = useTranslation();
    const user = useAppSelector(selectUser);
    const isMyCom = comment.authorId === user?.id;
    const isUpdated = comment.createdAt !== comment.updatedAt;

    const [editComment] = useEditCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(comment.content);

    const handleEditComment = async () => {
        try {
            await editComment({
                boardId,
                taskId,
                colId,
                comId: comment.id,
                body: { content: value },
            }).unwrap();
        } catch (error) {
            toast.error('Error');
        }
    };

    const handleDeleteComment = async () => {
        try {
            await deleteComment({
                boardId,
                taskId,
                colId,
                comId: comment.id,
            }).unwrap();
        } catch (error) {
            toast.error('Error');
        }
    };

    const handleInput = () => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Enter' || e.shiftKey) return;

        e.preventDefault();
        saveEdit();
    };

    const startEdit = () => {
        setIsEditing(true);
        setValue(comment.content);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setValue(comment.content);
    };

    const saveEdit = async () => {
        if (!value.trim()) return;

        if (value.trim() === comment.content.trim()) {
            setIsEditing(false);
            return;
        }

        setIsEditing(false);

        handleEditComment();
    };

    useEffect(() => {
        if (!isEditing) setValue(comment.content);
    }, [comment.content, isEditing]);

    useEffect(() => {
        if (!isEditing) return;
        const el = textareaRef.current;
        if (!el) return;

        el.focus();

        el.setSelectionRange(el.value.length, el.value.length);

        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }, [isEditing]);

    return (
        <div className="flex gap-2 border-b py-2">
            <div className="shrink-0 pt-1">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>
                        {getUserInitials(comment.author.fullName)}
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="w-full min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        <div className="truncate text-sm font-medium">
                            {comment.author.fullName}
                        </div>
                        <div className="text-muted-foreground shrink-0 text-sm italic">
                            {isUpdated ? (
                                <span className="lowercase">
                                    {formatActivityTime(comment.updatedAt)} (
                                    {t('common.edited')})
                                </span>
                            ) : (
                                formatActivityTime(comment.createdAt)
                            )}
                        </div>
                    </div>
                    {isMyCom && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="shrink-0">
                                    <Ellipsis />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="-translate-x-[50px]">
                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center gap-1 font-medium"
                                    onClick={startEdit}
                                >
                                    <span>{t('common.edit')}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center gap-1 font-medium text-red-700"
                                    onClick={handleDeleteComment}
                                >
                                    <span>{t('common.delete')}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                {!isEditing ? (
                    <div className="text-sm wrap-break-word whitespace-pre-wrap">
                        {comment.content}
                    </div>
                ) : (
                    <div className="relative pb-6">
                        <textarea
                            style={{ fontSize: '14px' }}
                            ref={textareaRef}
                            rows={1}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onInput={handleInput}
                            onKeyDown={handleKeyDown}
                            className="scrollbar-none max-h-[250px] w-full resize-none overflow-y-auto border-0 bg-transparent px-0 text-sm focus:ring-0 focus:outline-none"
                        />

                        <div className="absolute right-0 bottom-1 flex gap-1">
                            <button
                                onClick={cancelEdit}
                                className="text-muted-foreground relative h-6 w-6 rounded-full bg-red-700 hover:bg-red-700/80"
                            >
                                <X
                                    size={16}
                                    color="#fff"
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                />
                            </button>
                            <button
                                onClick={saveEdit}
                                className="bg-primary hover:bg-primary/80 relative h-6 w-6 rounded-full"
                            >
                                <ArrowUp
                                    color="#fff"
                                    size={16}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
