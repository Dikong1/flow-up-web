import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Card, CardContent, CardTitle } from "@/shared/ui/shadcn/card";
import { cn } from "@/shared/utils/cn";
import { formatActivityTime } from "@/shared/lib/formate-activity-time";
import { useWorkspacePermissions } from "@/shared/hooks/use-workspace-permissions";
import { BoardCardImage } from "./BoardCardImage";
import { BoardCardUploadImage } from "./BoardCardUploadImage";
import { routes } from "@/shared/routes";

interface IProps {
   id: string;
   title: string;
   image?: string;
   updatedAt: string;
   workspaceId: string;
}

export const BoardCard = ({ id, title, image, updatedAt, workspaceId }: IProps) => {
   const { t } = useTranslation();
   const { permissions } = useWorkspacePermissions(workspaceId);

   return (
      <Card
         className={cn(
            "w-[250px] overflow-hidden p-0 relative",
            "bg-card text-card-foreground border border-border/60",
            "shadow-sm transition-all duration-150 ease-out group",
            "hover:-translate-y-1 hover:shadow-md hover:border-primary/20",
            "focus-within:ring-2 focus-within:ring-ring/40 focus-within:ring-offset-2 focus-within:ring-offset-background",
            "dark:shadow-none dark:hover:border-primary/25",
         )}
      >
         <CardContent className="p-0 relative">
            <BoardCardImage
               title={title}
               image={image}
            />
            <div className="p-3">
               <CardTitle className="text-base font-semibold leading-tight truncate">
                  {title}
               </CardTitle>

               <div className="mt-1 text-sm text-muted-foreground flex flex-col">
                  <span>{t("common.updated")}:</span>
                  <span className="italic">{formatActivityTime(updatedAt)}</span>
               </div>
            </div>
            <Link to={routes.board({ workspaceId, boardId: id })} className="absolute inset-0 z-0" />
            <BoardCardUploadImage workspaceId={workspaceId} boardId={id} canEditImage={permissions.canEditWorkspace} />
         </CardContent>
      </Card>
   );
};