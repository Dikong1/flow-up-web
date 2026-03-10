import { Skeleton } from "@/shared/ui/shadcn/skeleton";

export const ColumnSkeleton = () => {
   return (
      <div className="
         w-[380px] h-[75vh] p-4 rounded-lg border flex flex-col gap-4
         max-md:w-[350px] max-sm:w-[330px] max-xs:w-[300px]!
      ">
         <Skeleton className="h-6 w-3/4 rounded bg-neutral-500/70" />
         <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="animate-pulse h-12 w-full rounded-md bg-neutral-500/70" />
            <Skeleton className="animate-pulse h-12 w-full rounded-md bg-neutral-500/70" />
            <Skeleton className="animate-pulse h-12 w-full rounded-md bg-neutral-500/70" />
            <Skeleton className="animate-pulse h-12 w-full rounded-md bg-neutral-500/70" />
            <Skeleton className="animate-pulse h-12 w-full rounded-md bg-neutral-500/70" />
         </div>
      </div>
   );
};
