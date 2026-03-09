import { Trans } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar";
import { getUserInitials } from "@/shared/utils/get-user-initials";
import { formatActivityTime } from "@/shared/lib/formate-activity-time";
import type { IWorkspaceActivity } from "../types/workspace-activity";

interface IProps {
   activity: IWorkspaceActivity;
}

export const WorkspaceActivityItem = ({ activity }: IProps) => {
   const uiLabel = () => {
      switch (activity.type) {
         case "TASK_CREATED":
            return (
               <Trans
                  i18nKey="activity.taskCreated"
                  values={{
                     user: activity.user.fullName,
                     taskName: activity.metadata.taskName
                  }}
                  components={{ strong: <strong className="font-semibold" /> }}
               />
            );

         case "TASK_MOVED":
            return (
               <Trans
                  i18nKey="activity.taskMoved"
                  values={{
                     user: activity.user.fullName,
                     taskName: activity.metadata.taskName,
                     columnName: activity.metadata.columnName
                  }}
                  components={{ strong: <strong className="font-semibold" /> }}
               />
            );

         default:
            return null;
      }
   };

   return (
      <div className="flex justify-between items-center py-4 border-b max-md:flex-col max-md:items-start">
         <div className="flex gap-2 items-center">
            <Avatar>
               <AvatarImage src={activity.user.avatar ?? ""} />
               <AvatarFallback>{getUserInitials(activity.user.fullName)}</AvatarFallback>
            </Avatar>
            <div className="text-base flex gap-1 items-center wrap-break-word max-lg:flex-wrap max-md:text-sm truncate">
               {uiLabel()}
            </div>
         </div>
         <div className="text-md text-muted-foreground italic max-md:text-sm">
            {formatActivityTime(activity.createdAt)}
         </div>
      </div>
   );
};
