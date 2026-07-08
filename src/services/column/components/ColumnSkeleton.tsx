import { Skeleton } from '@/shared/ui/shadcn/skeleton';

export const ColumnSkeleton = () => {
    return (
        <div className="max-xs:w-[300px]! flex h-[75vh] w-[380px] flex-col gap-4 rounded-lg border p-4 max-md:w-[350px] max-sm:w-[330px]">
            <Skeleton className="h-6 w-3/4 rounded bg-neutral-500/70" />
            <div className="mt-2 flex flex-col gap-2">
                <Skeleton className="h-12 w-full animate-pulse rounded-md bg-neutral-500/70" />
                <Skeleton className="h-12 w-full animate-pulse rounded-md bg-neutral-500/70" />
                <Skeleton className="h-12 w-full animate-pulse rounded-md bg-neutral-500/70" />
                <Skeleton className="h-12 w-full animate-pulse rounded-md bg-neutral-500/70" />
                <Skeleton className="h-12 w-full animate-pulse rounded-md bg-neutral-500/70" />
            </div>
        </div>
    );
};
