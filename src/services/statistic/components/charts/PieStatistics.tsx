import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/ui/shadcn/card';
import { usePriorityConfig } from '../config/use-priority-config';

import type { TooltipProps } from 'recharts';
import type {
    ITaskPriority,
    TTaskPriorityName,
} from '@/services/task/types/task-priority';
import type { TaskCountByPriority } from '../../types';

interface IProps {
    data: TaskCountByPriority | undefined;
    priorities: ITaskPriority[] | undefined;
}

const DEFAULT_COLOR = '#a855f7';

type PriorityConfigType = Partial<
    Record<TTaskPriorityName | 'Without', { color: string; label: string }>
>;

type CustomTooltipProps = TooltipProps<number, string> & {
    total: number;
    config: PriorityConfigType | undefined;
};

const CustomTooltip = ({
    active,
    payload,
    total,
    config,
}: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;

    const { t } = useTranslation();

    const { name, value } = payload[0].payload;
    const color =
        config?.[name as TTaskPriorityName | 'Without']?.color ?? DEFAULT_COLOR;
    const percent = Math.round((value / total) * 100);
    console.log(value);

    return (
        <div className="border-border bg-popover relative z-10 rounded-lg border px-3 py-2 text-sm shadow-md">
            <div className="mb-1 flex items-center gap-2">
                <span
                    className="size-2 rounded-full"
                    style={{ background: color }}
                />
                <span className="text-popover-foreground font-medium">
                    {t(`priority.${name.toLowerCase()}`)}
                </span>
            </div>
            <p className="text-muted-foreground lowercase">
                {value} {value !== 1 ? t('task.titleMany') : t('task.title')} ·{' '}
                {percent}%
            </p>
        </div>
    );
};

export const PieStatistics = ({ data, priorities }: IProps) => {
    const { t } = useTranslation();

    const config = usePriorityConfig(priorities);

    const dataPie = useMemo(() => {
        if (!data) return [];
        return Object.entries(data).map(([name, value]) => ({ name, value }));
    }, [data]);

    const total = useMemo(
        () => dataPie.reduce((sum, d) => sum + d.value, 0),
        [dataPie],
    );
    const hasData = dataPie.some((d) => d.value > 0);

    const content = (() => {
        if (!data || !hasData || !dataPie) {
            return (
                <div className="text-muted-foreground flex h-48 items-center justify-center text-sm">
                    {t('task.empty')}
                </div>
            );
        }

        return (
            <div className="flex w-full items-center gap-6">
                <div className="relative shrink-0">
                    <ResponsiveContainer width={180} height={180}>
                        <PieChart>
                            <Pie
                                data={dataPie}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={0}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {dataPie.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={
                                            entry.value === 0
                                                ? 'hsl(var(--muted))'
                                                : (config?.[
                                                      entry.name as
                                                          | TTaskPriorityName
                                                          | 'Without'
                                                  ]?.color ?? DEFAULT_COLOR)
                                        }
                                        opacity={entry.value === 0 ? 0.3 : 1}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={
                                    <CustomTooltip
                                        total={total}
                                        config={config}
                                    />
                                }
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-foreground text-2xl font-bold">
                            {total}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                            {t('common.total')}
                        </span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-2.5">
                    {dataPie.map((entry) => {
                        const color =
                            config?.[
                                entry.name as TTaskPriorityName | 'Without'
                            ]?.color ?? DEFAULT_COLOR;
                        const percent =
                            total > 0
                                ? Math.round((entry.value / total) * 100)
                                : 0;

                        return (
                            <div
                                key={entry.name}
                                className="flex items-center gap-3"
                            >
                                <span
                                    className="size-2.5 shrink-0 rounded-full"
                                    style={{ background: color }}
                                />
                                <span className="text-muted-foreground flex-1 text-base">
                                    {t(`priority.${entry.name.toLowerCase()}`)}
                                </span>
                                <span className="text-foreground text-base font-medium tabular-nums">
                                    {entry.value}
                                </span>
                                <span className="text-muted-foreground w-8 text-right text-base tabular-nums">
                                    {entry.value > 0 ? `${percent}%` : '—'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    })();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">
                    {t('statistics.pieChart')}
                </CardTitle>
            </CardHeader>
            <CardContent>{content}</CardContent>
        </Card>
    );
};
