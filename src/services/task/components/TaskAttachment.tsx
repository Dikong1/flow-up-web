import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { resolveAttachmentView } from '@/shared/files/resolve-attachment-view';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/shared/ui/shadcn/alert-dialog';
import { truncateFilename } from '@/shared/utils/truncate-filename';
import { useDeleteTaskAttachmentMutation } from '../api/hooks';

import type { ITaskAttachment } from '../types/task-attachment';

interface IProps {
    att: ITaskAttachment;
    boardId: string;
    colId: string;
    onDownload: () => void;
}

export const TaskAttachment = ({ att, boardId, colId, onDownload }: IProps) => {
    const { t } = useTranslation();
    const [deleteAttachment] = useDeleteTaskAttachmentMutation();
    const [openAlert, setOpenAlert] = useState(false);

    const { Icon, ext } = resolveAttachmentView({
        mimeType: att.mimeType,
        filename: att.filename,
    });

    const handleDeleteAttachment = async () => {
        try {
            await deleteAttachment({
                boardId,
                colId,
                taskId: att.taskId,
                attachmentId: att.id,
            }).unwrap();

            toast.success(t('task.attachments.deleteSuccess'));
        } catch (error) {
            toast.error(t('task.attachments.deleteError'));
        }
    };

    return (
        <div
            onClick={onDownload}
            className="group inline-flex items-center gap-2 text-base font-medium"
        >
            <div className="flex cursor-pointer items-center gap-1">
                <Icon size={21} />
                <span className="">{truncateFilename(att.filename)}</span>
            </div>
            {ext && (
                <span className="text-xs opacity-60">{ext.toUpperCase()}</span>
            )}
            <button onClick={() => setOpenAlert(true)} type="button">
                <Trash2
                    size={18}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                />
            </button>
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t('task.attachments.deleteConfirmTitle')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('task.attachments.deleteConfirmDescription')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.no')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAttachment}>
                            {t('common.yes')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
