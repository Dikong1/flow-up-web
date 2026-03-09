import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useChangeMemberRoleMutation } from "../api/hooks/";
import { Label } from "@/shared/ui/shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar";
import { Button } from "@/shared/ui/shadcn/button";
import { getUserInitials } from "@/shared/utils/get-user-initials";
import type { IWorkspaceMember } from "../types/workspace-member";
import type { TWorkspaceRole } from "../types/workspace-role";

interface IProps {
   member: IWorkspaceMember,
   workspaceId: string,
   close: () => void
}

export const ChangeRoleMember = ({ member, workspaceId, close }: IProps) => {
   const { t } = useTranslation()
   const [changeRole] = useChangeMemberRoleMutation()

   const [role, setRole] = useState<TWorkspaceRole>(member.role)

   const handleChange = async () => {
      try {
         await changeRole({
            workspaceId,
            userId: member.userId,
            body: { role }
         }).unwrap()

         toast.success(t("workspace.roleChangeSuccess"))
      } catch (error) {
         toast.error(t("workspace.roleChangeError"))
      }

      close()
   }

   return (
      <>
         <div>
            <Label className="mb-1 text-sm">{t("workspace.memberLabel")}</Label>
            <div className="flex items-center gap-3">
               <Avatar className="w-10 h-10">
                  <AvatarImage src={member.user.avatar} />
                  <AvatarFallback>{getUserInitials(member.user.username)}</AvatarFallback>
               </Avatar>
               <div>
                  <div className="font-medium">{member.user.username}</div>
               </div>
            </div>
         </div>
         <div className="mb-2">
            <Label className="mb-1 text-sm">{t("workspace.roleLabel")}</Label>
            <Select value={role} onValueChange={(value: TWorkspaceRole) => setRole(value)}>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("workspace.selectRolePlaceholder")} />
               </SelectTrigger>
               <SelectContent className='text-lg'>
                  <SelectItem value="MEMBER">{t("workspaceRole.member")}</SelectItem>
                  <SelectItem value="EDITOR">{t("workspaceRole.editor")}</SelectItem>
                  <SelectItem value="OWNER">{t("workspaceRole.owner")}</SelectItem>
               </SelectContent>
            </Select>
         </div>
         <Button onClick={handleChange}>{t("common.change")}</Button>
      </>
   );
};
