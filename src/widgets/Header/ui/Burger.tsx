import { cn } from '@/shared/utils/cn';

interface IProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const Burger = ({ open, setOpen }: IProps) => {
    return (
        <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="bg-background hover:bg-accent relative inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors"
        >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="relative block h-4 w-5">
                <span
                    className={cn(
                        'bg-foreground absolute top-0 left-0 h-0.5 w-full rounded transition-transform duration-200',
                        open && 'translate-y-[7px] rotate-45',
                    )}
                />
                <span
                    className={cn(
                        'bg-foreground absolute top-[7px] left-0 h-0.5 w-full rounded transition-opacity duration-200',
                        open && 'opacity-0',
                    )}
                />
                <span
                    className={cn(
                        'bg-foreground absolute bottom-0 left-0 h-0.5 w-full rounded transition-transform duration-200',
                        open && '-translate-y-[7px] -rotate-45',
                    )}
                />
            </span>
        </button>
    );
};
