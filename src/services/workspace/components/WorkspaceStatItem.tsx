import { Progress } from '@/shared/ui/shadcn/progress';

import type { LucideIcon } from 'lucide-react';

interface IProps {
    icon: LucideIcon;
    progressValue: number;
    label: string;
}

export const WorkspaceStatItem = ({
    icon: Icon,
    progressValue,
    label,
}: IProps) => {
    return (
        <div className="rounded-lg border p-5 max-xl:col-span-full">
            <div className="mb-5 flex items-center gap-3">
                <Icon />
                <div className="text-xl max-xl:text-lg">{label}</div>
            </div>
            <Progress value={progressValue} />
        </div>
    );
};
