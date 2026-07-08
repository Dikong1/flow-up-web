import { useEffect, useRef, useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/shared/ui/shadcn/checkbox';

interface IProps {
    onCreate: (title: string) => void;
}

export const InlineSubtaskTextarea = ({ onCreate }: IProps) => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const resize = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    };

    const submit = () => {
        if (!value.trim()) return;
        onCreate(value.trim());
        setValue('');

        const el = textareaRef.current;
        if (el) el.style.height = 'auto';
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Checkbox checked={false} className="" />
                <textarea
                    style={{ fontSize: '16px' }}
                    ref={textareaRef}
                    rows={1}
                    value={value}
                    placeholder={t('task.subtaskPlaceholder')}
                    onChange={(e) => {
                        setValue(e.target.value);
                        resize();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            submit();
                        }

                        if (e.key === 'Escape') {
                            setValue('');
                            textareaRef.current?.blur();
                        }
                    }}
                    className="placeholder:text-muted-foreground w-[65%] resize-none overflow-hidden bg-transparent wrap-break-word whitespace-pre-wrap outline-none"
                />
            </div>
            <button
                onClick={submit}
                className="hidden shrink-0 pointer-coarse:block"
                aria-label={t('task.subtaskPlaceholder')}
            >
                <CirclePlus className="text-primary size-6" />
            </button>
        </div>
    );
};
