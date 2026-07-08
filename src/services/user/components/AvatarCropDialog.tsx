import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/shadcn/button';
import { Slider } from '@/shared/ui/shadcn/slider';

import type { Area } from 'react-easy-crop';

type Props = {
    src: string;
    onDone: (file: File) => void;
    onCancel?: () => void;
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

async function getCroppedFile(
    imageSrc: string,
    pixelCrop: Area,
    opts?: { outSize?: number; mime?: string; quality?: number },
): Promise<File> {
    const outSize = opts?.outSize ?? 256;
    const mime = opts?.mime ?? 'image/jpeg';
    const quality = opts?.quality ?? 0.9;

    const image = await createImage(imageSrc);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context is not available');

    canvas.width = Math.max(1, Math.floor(pixelCrop.width));
    canvas.height = Math.max(1, Math.floor(pixelCrop.height));

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        canvas.width,
        canvas.height,
    );

    const out = document.createElement('canvas');
    const outCtx = out.getContext('2d');
    if (!outCtx) throw new Error('Canvas 2D context is not available');

    out.width = outSize;
    out.height = outSize;

    outCtx.imageSmoothingEnabled = true;
    outCtx.imageSmoothingQuality = 'high';
    outCtx.drawImage(canvas, 0, 0, outSize, outSize);

    const blob: Blob = await new Promise((resolve, reject) => {
        out.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
            mime,
            quality,
        );
    });

    const ext = mime === 'image/png' ? 'png' : 'jpg';
    return new File([blob], `avatar.${ext}`, { type: mime });
}

export const AvatarCropDialog: React.FC<Props> = ({
    src,
    onDone,
    onCancel,
}) => {
    const { t } = useTranslation();
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
            const file = await getCroppedFile(src, croppedAreaPixels, {
                outSize: 256,
                mime: 'image/jpeg',
                quality: 0.9,
            });
            onDone(file);
        } finally {
            setIsSaving(false);
        }
    }, [croppedAreaPixels, onDone, src]);

    return (
        <div className="bg-background w-full max-w-2xl rounded-lg">
            <div className="relative h-[300px] w-full overflow-hidden rounded-t-lg bg-black">
                <Cropper
                    image={src}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
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
                    max={3}
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
                    <Button disabled={isSaving} onClick={save}>
                        {isSaving ? t('common.saving') : t('common.save')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
