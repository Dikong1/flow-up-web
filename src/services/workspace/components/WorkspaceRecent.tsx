import { useTranslation } from "react-i18next";
import { ClockFading, ServerCrash, History } from "lucide-react";
import { WorkspaceActivityItem } from "./WorkspaceActivityItem";
import { useGetActivityQuery } from "../api/hooks/";
import { Spinner } from "@/shared/ui/shadcn/spinner";
import { cn } from "@/shared/utils/cn";

interface IProps {
   workspaceId: string
}

export const WorkspaceRecent = ({ workspaceId }: IProps) => {
   const { t } = useTranslation()
   const { data, isLoading, isError } = useGetActivityQuery(workspaceId)
   const isEmpty = isLoading || isError || !data || data.length === 0

   const content = (() => {
      if (isLoading) return (
         <Spinner className="size-7" />
      )

      if (isError || !data) return (
         <div className="flex flex-col items-center gap-1 text-center">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
               <ServerCrash className="w-5 h-5 text-destructive" />
            </div>
            <div>
               <p className="text-base font-medium">{t("activity.errorTitle")}</p>
               <p className="text-sm text-muted-foreground mt-0.5">{t("activity.errorDescription")}</p>
            </div>
         </div>
      )

      if (!data || data.length === 0) return (
         <div className="flex flex-col items-center gap-1 text-center w-full">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
               <ClockFading className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
               <p className="text-base font-medium">{t("activity.emptyTitle")}</p>
               <p className="text-sm text-muted-foreground mt-0.5">{t("activity.emptyDescription")}</p>
            </div>
         </div>
      )

      return (
         <div className="flex flex-col rounded-lg flex-1">
            {data.map((activity) => <WorkspaceActivityItem key={activity.id} activity={activity} />)}
         </div>
      )
   })()

   return (
      <>
         <div className="mb-3 flex justify-between items-center">
            <h2 className="text-xl font-medium">{t("activity.recentTitle")}</h2>
            <History size={21} />
         </div>
         <div className={cn("relative border rounded-lg px-5 min-h-64", isEmpty && 'flex justify-center items-center')}>
            {content}
         </div>
      </>
   );
};