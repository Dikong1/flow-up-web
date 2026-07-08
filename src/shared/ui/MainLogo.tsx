import { Check } from 'lucide-react';

export const MainLogo = () => {
    return (
        <div className="text-primary flex items-center gap-1">
            <div className="border-primary relative h-[30px] w-[30px] rounded-[5px] border-[3px]">
                <Check
                    strokeWidth={3.5}
                    size={20}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>
            <div className="text-2xl font-bold">
                <span>Flow</span>
                <span className="brightness-70">Up</span>
            </div>
        </div>
    );
};
