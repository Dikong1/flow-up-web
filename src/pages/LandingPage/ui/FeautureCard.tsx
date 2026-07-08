import type { LucideIcon } from 'lucide-react';

interface IProps {
    title: string;
    text: string;
    icon: LucideIcon;
}

export const FeatureCard = ({ title, text, icon: Icon }: IProps) => {
    return (
        <div className="group border-border bg-background hover:border-primary/40 rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm">
            <div className="flex flex-col gap-4 max-sm:gap-1">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                        <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <div className="space-y-1">
                    <p className="text-muted-foreground leading-relaxed">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};
