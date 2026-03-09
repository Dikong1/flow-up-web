import { useTranslation } from "react-i18next";
import { UserPlus, ServerCrash, UserX } from "lucide-react";
import { useGetWorkspaceMembersQuery } from "../api/hooks/";
import { Spinner } from "@/shared/ui/shadcn/spinner";
import { useModal } from "@/app/providers/ModalProvider";
import { AddMember } from "./AddMember";
import { WorkspaceMember } from "./WorkspaceMember";
import { cn } from "@/shared/utils/cn";
import type { IWorkspacePermission } from "../types/workspace-permission";

interface IWorkspaceMembersProps {
   workspaceId: string,
   permissions: IWorkspacePermission
}

export const WorkspaceMembers = ({ workspaceId, permissions }: IWorkspaceMembersProps) => {
   const { t } = useTranslation()
   const { open, close } = useModal()
   const { data: members, isLoading, isError } = useGetWorkspaceMembersQuery(workspaceId)

   const sortedMembers = [...(members ?? [])].sort((a, b) => {
      if (a.role === "OWNER") return -1;
      if (b.role === "OWNER") return 1;
      return 0;
   });

   const isEmpty = !members || members.length <= 1;

   const handleAddMember = () => {
      open({
         title: t("workspace.addMemberTitle"),
         description: t("workspace.addMemberDescription"),
         content: <AddMember close={close} workspaceId={workspaceId} />
      })
   }

   const renderMembers = (() => {
      if (isLoading) return (
         <Spinner className="size-7" />
      )

      if (isError) return (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
               <ServerCrash className="w-5 h-5 text-destructive" />
            </div>
            <div>
               <p className="text-base font-medium">{t("common.somethingWentWrong")}</p>
               <p className="text-sm text-muted-foreground mt-0.5">{t("common.tryAgainLater")}</p>
            </div>
         </div>
      )

      if (isEmpty) return (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-center w-full">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
               <UserX className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="">
               <p className="text-base font-medium">{t("workspace.membersEmpty")}</p>
               <p className="text-sm text-muted-foreground mt-0.5">{t("workspace.membersEmptyDescription")}</p>
            </div>
         </div>
      )

      return sortedMembers.map(member => (
         <WorkspaceMember key={member.id} workspaceId={workspaceId} permissions={permissions} member={member} />
      ))
   })()

   return (
      <>
         <div className="mb-3 flex justify-between items-center">
            <h2 className="text-xl font-medium capitalize">
               {t("workspace.membersTitle")} ({members?.length ?? 0})
            </h2>
            {permissions.canInviteMember && (
               <button aria-label={t('workspace.addMemberTitle')} onClick={handleAddMember} className="hover:text-primary transition-colors">
                  <UserPlus size={21} />
               </button>
            )}
         </div>
         <div className={cn("flex border rounded-lg py-2 px-5 flex-col h-full relative min-h-64", { 'justify-center items-center': isEmpty || isLoading || isError })}>
            {renderMembers}
         </div>
      </>
   );
};