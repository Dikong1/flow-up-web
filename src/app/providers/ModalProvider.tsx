import { createContext, useContext, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/shadcn/dialog';

import type { ReactNode } from 'react';

interface IModalOptions {
    title: string;
    description: string;
    content: ReactNode;
}

interface IModalContext {
    open: (modalOptions: IModalOptions) => void;
    close: () => void;
}

const ModalContext = createContext<IModalContext | null>(null);

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useModal must be used inside ModalProvider');
    return ctx;
};

// Modal provider

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState<IModalOptions | null>(
        null,
    );

    const open = (modalOptions: IModalOptions) => {
        setModalOptions({ ...modalOptions });
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setModalOptions(null);
    };

    return (
        <ModalContext.Provider value={{ open, close }}>
            {children}
            <Dialog
                open={isOpen}
                onOpenChange={(state) => {
                    if (!state) close();
                }}
            >
                <DialogContent className="max-h-[85vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle>{modalOptions?.title}</DialogTitle>
                        <DialogDescription>
                            {modalOptions?.description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[calc(85vh-120px)] overflow-y-auto px-1 pt-1">
                        {modalOptions?.content}
                    </div>
                </DialogContent>
            </Dialog>
        </ModalContext.Provider>
    );
};
