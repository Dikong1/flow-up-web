import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ServerCrash, FolderX, LayoutGrid } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetWorkspaceQuery } from "@/services/workspace/api/hooks/";
import { WorkspaceHeader } from "@/services/workspace/components/WorkspaceHeader";
import { WorkspaceStats } from "@/services/workspace/components/WorkspaceStat";
import { BoardList } from "@/services/board/components/BoardList";
import { WorkspaceRecent } from "@/services/workspace/components/WorkspaceRecent";
import { WorkspaceMembers } from "@/services/workspace/components/WorkspaceMembers";
import { useWorkspacePermissions } from "@/shared/hooks/use-workspace-permissions";
import { Button } from "@/shared/ui/shadcn/button";
import { Spinner } from "@/shared/ui/shadcn/spinner";
import { useWsWorkspace } from "@/services/workspace/hooks/useWsWorkspace";
import { useTitle } from "@/shared/hooks/use-title";

const WorkspacePage = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const { workspaceId } = useParams();
   const { data: workspace, isError, isLoading, refetch } = useGetWorkspaceQuery(workspaceId ?? skipToken);
   const { permissions } = useWorkspacePermissions(workspaceId);
   useWsWorkspace(workspaceId);
   useTitle(workspace?.name ?? '')

   if (isLoading) {
      return (
         <div className="pt-48 flex flex-col justify-center items-center">
            <Spinner className="size-12" />
         </div>
      );
   }

   if (isError) {
      return (
         <div className="h-full flex flex-col justify-center items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
               <ServerCrash className="w-7 h-7 text-destructive" />
            </div>
            <div>
               <h2 className="text-lg font-semibold">{t("workspace.workspaceByIdError")}</h2>
               <p className="text-sm text-muted-foreground mt-1">
                  {t("common.tryAgainLater")}
               </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
               {t("common.tryAgain")}
            </Button>
         </div>
      )
   }

   if (!workspace) {
      return (
         <div className="h-full flex flex-col justify-center items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
               <FolderX className="w-7 h-7 text-muted-foreground" />
            </div>
            <div>
               <h2 className="text-lg font-semibold">{t("errors.workspaceNotFound")}</h2>
               <p className="text-sm text-muted-foreground mt-1">
                  {t("workspace.workspaceNotFoundDescription")}
               </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
               {t("common.goBack")}
            </Button>
         </div>
      )
   }

   return (
      <>
         <WorkspaceHeader workspace={workspace} permissions={permissions} />
         <WorkspaceStats workspaceId={workspace.id} />
         <div className="pb-10 border-b">
            <div className="mb-3 flex items-center gap-1">
               <LayoutGrid size={20} />
               <h2 className="text-xl font-medium">{t("board.listTitle")}</h2>
            </div>
            <BoardList boards={workspace.boards} />
         </div>
         <div className="pt-5 flex gap-10 max-2xl:flex-col-reverse max-2xl:gap-12 max-md:gap-6 max-xs:gap-3!">
            <div className="flex-auto">
               <WorkspaceRecent workspaceId={workspace.id} />
            </div>
            <div className="flex-[0_0_30%] max-2xl:flex-auto flex flex-col">
               <WorkspaceMembers
                  permissions={permissions}
                  workspaceId={workspace.id}
               />
            </div>
         </div>
      </>
   );
};

export default WorkspacePage;