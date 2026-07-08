import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ContentEditable from 'react-contenteditable';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useModal } from '@/app/providers/ModalProvider';
import { CreateColumn } from '@/services/column/components/CreateColumn';
import { useWorkspacePermissions } from '@/services/workspace/hooks/use-workspace-permissions';
import { routes } from '@/shared/routes';
import { AlertDialogBlock } from '@/shared/ui/AlertDialogBlock';
import { Button } from '@/shared/ui/shadcn/button';
import { useDeleteBoardMutation, useEditBoardMutation } from '../api/hooks/';

interface IProps {
    workspaceId: string;
    boardId: string;
    boardTitle: string;
}

export const BoardHeader = ({ workspaceId, boardId, boardTitle }: IProps) => {
    const { t } = useTranslation();
    const { open, close } = useModal();
    const navigate = useNavigate();

    const { permissions } = useWorkspacePermissions({});

    const [editBoard] = useEditBoardMutation();
    const [deleteBoard] = useDeleteBoardMutation();

    const [title, setTitle] = useState(boardTitle);

    useEffect(() => {
        setTitle(boardTitle);
    }, [boardTitle]);

    const handleSave = async (e: React.FocusEvent<HTMLDivElement>) => {
        const value = (e.currentTarget.textContent || '').trim();

        if (!value || value === boardTitle) {
            setTitle(boardTitle);
            return;
        }

        try {
            await editBoard({
                workspaceId,
                boardId,
                body: { name: value },
            }).unwrap();
        } catch (error) {
            setTitle(boardTitle);
            toast.error(t('board.saveError'));
        }
    };

    const handleCreateCol = () => {
        open({
            title: t('column.create'),
            description: t('column.createDescription'),
            content: <CreateColumn boardId={boardId} close={close} />,
        });
    };

    const handleDeleteBoard = async () => {
        try {
            await deleteBoard({
                workspaceId,
                boardId,
            }).unwrap();

            toast.success(t('board.deleteBoardSuccess'));
            navigate(routes.workspace({ workspaceId }));
        } catch (error) {
            toast.error(t('board.deleteBoardError'));
        }
    };

    return (
        <div className="mb-4 flex items-start justify-between gap-4 max-md:mb-3 max-sm:flex-col max-sm:items-stretch">
            <div className="min-w-0 flex-1 max-sm:mb-3">
                <div className="mb-3 max-w-full min-w-0 overflow-hidden max-sm:mb-2">
                    <ContentEditable
                        html={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleSave}
                        className="focus:border-primary max-w-full min-w-0 overflow-hidden border-b border-transparent text-4xl font-semibold text-ellipsis whitespace-nowrap transition-colors outline-none hover:cursor-pointer focus:overflow-visible focus:whitespace-normal max-sm:text-3xl"
                    />
                </div>
            </div>

            <div className="flex shrink-0 gap-2 max-sm:w-full max-sm:flex-row max-sm:items-center max-sm:justify-between">
                <div className="max-xs:gap-1 flex gap-2">
                    {permissions?.canDeleteBoard && (
                        <AlertDialogBlock
                            title={t('board.deleteTitle')}
                            description={t('board.deleteDescription')}
                            cancelLabel={t('common.cancel')}
                            actionLabel={t('common.yes')}
                            onClickAction={handleDeleteBoard}
                        >
                            <Button variant="destructive">
                                <Trash2 className="text-white" />
                            </Button>
                        </AlertDialogBlock>
                    )}
                </div>

                {permissions?.canCreateColumn && (
                    <Button
                        onClick={handleCreateCol}
                        className="flex items-center gap-1"
                    >
                        <Plus />
                        <span>{t('column.create')}</span>
                    </Button>
                )}
            </div>
        </div>
    );
};
