import React, { useCallback, useMemo, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/shadcn/button';
import { Slider } from '@/shared/ui/shadcn/slider';

import type { Area } from 'react-easy-crop';

type BoardCoverCropDialogProps = {
    src: string;
    onDone: (file: File) => void;
    onCancel?: () => void;
    outWidth?: number;
    outHeight?: number;
    mime?: 'image/jpeg' | 'image/png' | 'image/webp';
    quality?: number;
};

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.crossOrigin = 'anonymous';
        img.src = url;
    });
}

async function getCroppedFileRect(
    imageSrc: string,
    pixelCrop: Area,
    opts?: {
        outWidth?: number;
        outHeight?: number;
        mime?: string;
        quality?: number;
    },
): Promise<File> {
    const outWidth = opts?.outWidth ?? 1000;
    const outHeight = opts?.outHeight ?? 700;
    const mime = opts?.mime ?? 'image/jpeg';
    const quality = opts?.quality ?? 0.9;

    const image = await createImage(imageSrc);

    const cropCanvas = document.createElement('canvas');
    const cropCtx = cropCanvas.getContext('2d');
    if (!cropCtx) throw new Error('Canvas 2D context is not available');

    cropCanvas.width = Math.max(1, Math.floor(pixelCrop.width));
    cropCanvas.height = Math.max(1, Math.floor(pixelCrop.height));

    cropCtx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        cropCanvas.width,
        cropCanvas.height,
    );

    const outCanvas = document.createElement('canvas');
    const outCtx = outCanvas.getContext('2d');
    if (!outCtx) throw new Error('Canvas 2D context is not available');

    outCanvas.width = outWidth;
    outCanvas.height = outHeight;

    outCtx.imageSmoothingEnabled = true;
    outCtx.imageSmoothingQuality = 'high';
    outCtx.drawImage(cropCanvas, 0, 0, outWidth, outHeight);

    const blob: Blob = await new Promise((resolve, reject) => {
        outCanvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
            mime,
            quality,
        );
    });

    const ext =
        mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';

    return new File([blob], `board-cover.${ext}`, { type: mime });
}

export const BoardCropDialog: React.FC<BoardCoverCropDialogProps> = ({
    src,
    onDone,
    onCancel,
    outWidth = 1000,
    outHeight = 700,
    mime = 'image/jpeg',
    quality = 0.9,
}) => {
    const { t } = useTranslation();

    const aspect = useMemo(() => 10 / 7, []);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null,
    );
    const [isSaving, setIsSaving] = useState(false);

    const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const save = useCallback(async () => {
        if (!croppedAreaPixels) return;

        setIsSaving(true);
        try {
            const file = await getCroppedFileRect(src, croppedAreaPixels, {
                outWidth,
                outHeight,
                mime,
                quality,
            });
            onDone(file);
        } finally {
            setIsSaving(false);
        }
    }, [croppedAreaPixels, src, outWidth, outHeight, mime, quality, onDone]);

    return (
        <div className="bg-background w-full max-w-3xl rounded-lg">
            <div className="relative h-[340px] w-full overflow-hidden rounded-t-lg bg-black">
                <Cropper
                    image={src}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    cropShape="rect"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-b-lg px-3 pb-2">
                <Slider
                    value={[zoom]}
                    min={1}
                    max={4}
                    step={0.01}
                    onValueChange={([v]) => setZoom(v)}
                />

                <div className="flex shrink-0 gap-1">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                        >
                            {t('common.cancel')}
                        </Button>
                    )}
                    <Button type="button" disabled={isSaving} onClick={save}>
                        {isSaving ? t('common.saving') : t('common.save')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
