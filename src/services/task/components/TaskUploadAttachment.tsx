import React, { useMemo, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { ALLOWED_EXT, ALLOWED_MIME, MAX_SIZE } from '@/shared/files/file-types';
import { Button } from '@/shared/ui/shadcn/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/shadcn/dialog';
import { Input } from '@/shared/ui/shadcn/input';
import { Progress } from '@/shared/ui/shadcn/progress';
import {
    useCompleteTaskAttachmentMutation,
    useGetTaskAttachmentPresignedUrlMutation,
} from '../api/hooks';

import type { IWorkspacePermission } from '@/services/workspace/types/workspace-permission';

type UploadState = 'idle' | 'selected' | 'uploading' | 'error' | 'success';

interface IProps {
    boardId: string;
    colId: string;
    taskId: string;
    permissions: IWorkspacePermission;
}

export const TaskUploadAttachment = ({
    boardId,
    colId,
    taskId,
    permissions,
}: IProps) => {
    const { t } = useTranslation();

    const [getPresigned] = useGetTaskAttachmentPresignedUrlMutation();
    const [complete] = useCompleteTaskAttachmentMutation();

    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const xhrRef = useRef<XMLHttpRequest | null>(null);

    const [isDragOver, setIsDragOver] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [state, setState] = useState<UploadState>('idle');
    const [progress, setProgress] = useState(0);
    const [errorText, setErrorText] = useState<string | null>(null);

    const canUpload = useMemo(
        () => state === 'selected' && !!file,
        [state, file],
    );
    const isBusy = state === 'uploading';

    const pickFile = (f: File, inputEl?: HTMLInputElement | null) => {
        if (f.size > MAX_SIZE) {
            setErrorText(t('task.attachments.fileTooLarge'));
            if (inputEl) inputEl.value = '';
            return;
        }

        const ext = f.name.split('.').pop()?.toLowerCase();
        const isMimeOk = !!f.type && ALLOWED_MIME.has(f.type);
        const isExtOk = !!ext && ALLOWED_EXT.has(ext);

        if (!isMimeOk && !isExtOk) {
            setErrorText(t('task.attachments.invalidType'));
            if (inputEl) inputEl.value = '';
            return;
        }

        setFile(f);
        setErrorText(null);
        setProgress(0);
        setState('selected');
    };

    const resetLocal = () => {
        setFile(null);
        setState('idle');
        setProgress(0);
        setErrorText(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    const onDialogOpenChange = (v: boolean) => {
        setOpen(v);
        if (!v) {
            if (xhrRef.current) {
                try {
                    xhrRef.current.abort();
                } catch {}
                xhrRef.current = null;
            }
            resetLocal();
        }
    };

    const openFileDialog = () => {
        if (isBusy) return;
        inputRef.current?.click();
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (isBusy) return;
        setIsDragOver(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (isBusy) return;

        const f = e.dataTransfer.files?.[0];
        if (!f) return;

        pickFile(f, inputRef.current);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.currentTarget.files?.[0];
        if (!f) return;
        pickFile(f, e.currentTarget);
    };

    const uploadWithProgress = (url: string, f: File, mimeType: string) => {
        return new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhrRef.current = xhr;

            xhr.open('PUT', url, true);
            xhr.setRequestHeader('Content-Type', mimeType);

            xhr.upload.onprogress = (evt) => {
                if (!evt.lengthComputable) return;
                const p = Math.round((evt.loaded / evt.total) * 100);
                setProgress(p);
            };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) resolve();
                else reject(new Error(`Upload failed: ${xhr.status}`));
            };

            xhr.onerror = () =>
                reject(new Error('Network error during upload'));
            xhr.onabort = () => reject(new Error('Upload aborted'));

            xhr.send(f);
        });
    };

    const handleUpload = async () => {
        if (!file || isBusy) return;

        try {
            setState('uploading');
            setErrorText(null);
            setProgress(0);

            const mimeType = file.type || 'application/octet-stream';

            const presigned = await getPresigned({
                boardId,
                colId,
                taskId,
                body: {
                    fileName: file.name,
                    mimeType,
                    size: file.size,
                },
            }).unwrap();

            await uploadWithProgress(presigned.uploadUrl, file, mimeType);

            await complete({
                boardId,
                colId,
                taskId,
                attachmentId: presigned.attachmentId,
            }).unwrap();

            setState('success');
            setProgress(100);

            setOpen(false);
            resetLocal();

            toast.success(t('task.attachments.uploadSuccess'));
        } catch (err: any) {
            setState('error');
            setErrorText(err?.message ?? t('task.attachments.uploadError'));
            xhrRef.current = null;
            toast.error(t('task.attachments.uploadFailed'));
        }
    };

    const cancelUpload = () => {
        if (xhrRef.current) {
            try {
                xhrRef.current.abort();
            } catch {}
            xhrRef.current = null;
        }
        setState(file ? 'selected' : 'idle');
        setProgress(0);
        setErrorText(null);
    };

    if (!permissions?.canDeleteTask) return null;

    return (
        <Dialog open={open} onOpenChange={onDialogOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="group gap-2 transition-all"
                >
                    <Upload className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    {t('task.attachments.uploadButton')}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t('task.attachments.uploadTitle')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('task.attachments.uploadDescriptionLine1')} <br />
                        {t('task.attachments.uploadDescriptionLine2')} <br />
                        {t('task.attachments.uploadDescriptionLine3')}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    <Input
                        ref={inputRef}
                        id="task-attachment"
                        type="file"
                        onChange={onFileChange}
                        disabled={isBusy}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.zip,.txt"
                        className="hidden"
                    />

                    <div
                        onClick={openFileDialog}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        role="button"
                        tabIndex={0}
                        className={[
                            'w-full rounded-md border border-dashed px-4 py-10 text-sm transition',
                            'cursor-pointer select-none',
                            isBusy ? 'pointer-events-none opacity-60' : '',
                            isDragOver
                                ? 'border-primary bg-muted'
                                : 'border-input',
                        ].join(' ')}
                    >
                        <div className="flex flex-col gap-1 text-center font-medium">
                            {t('task.attachments.dropzoneHint')}
                        </div>
                    </div>

                    {file && (
                        <p className="text-muted-foreground text-sm">
                            {t('task.attachments.selectedFile')}:{' '}
                            <span className="font-medium">{file.name}</span>
                        </p>
                    )}

                    {state === 'uploading' && (
                        <div className="space-y-2">
                            <Progress value={progress} />
                            <p className="text-muted-foreground text-sm">
                                {progress}%
                            </p>
                        </div>
                    )}

                    {state === 'error' && errorText && (
                        <p className="text-destructive text-sm">{errorText}</p>
                    )}
                </div>

                <DialogFooter className="flex-col gap-2 sm:flex-col">
                    <Button
                        className="w-full"
                        onClick={handleUpload}
                        disabled={!canUpload || isBusy}
                    >
                        {isBusy
                            ? t('common.loading')
                            : t('task.attachments.uploadAction')}
                    </Button>

                    {state === 'uploading' && (
                        <Button
                            className="w-full"
                            variant="secondary"
                            onClick={cancelUpload}
                        >
                            {t('common.cancel')}
                        </Button>
                    )}

                    {(state === 'selected' || state === 'error') && (
                        <Button
                            className="w-full"
                            variant="ghost"
                            onClick={resetLocal}
                            disabled={isBusy}
                        >
                            {t('common.reset')}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
