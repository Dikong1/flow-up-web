import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { Trash2, Users, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useDeleteBoardMutation, useEditBoardMutation } from "../api/hooks/";
import { useAppSelector } from "@/shared/hooks/redux";
import { selectPermissions } from "@/store/slices/board-slice";
import { CreateColumn } from "@/services/column/components/CreateColumn";
import { useModal } from "@/app/providers/ModalProvider";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/shared/ui/shadcn/breadcrumb";
import { Button } from "@/shared/ui/shadcn/button";
import { BoardMembers } from "./BoardMembers";
import { AlertDialogBlock } from "@/shared/ui/AlertDialogBlock";
import { routes } from "@/shared/routes";
import type { IWorkspace } from "@/services/workspace/types/workspace";

interface IProps {
   workspaceId: string;
   boardId: string;
   boardTitle: string;
   currentWorkspace: IWorkspace | null;
}

export const BoardHeader = ({
   workspaceId,
   boardId,
   boardTitle,
   currentWorkspace,
}: IProps) => {
   const { t } = useTranslation();
   const { open, close } = useModal();
   const navigate = useNavigate();
   const permissions = useAppSelector(selectPermissions);

   const [editBoard] = useEditBoardMutation();
   const [deleteBoard] = useDeleteBoardMutation();

   const [title, setTitle] = useState(boardTitle);

   useEffect(() => {
      setTitle(boardTitle);
   }, [boardTitle]);

   const handleSave = async (e: React.FocusEvent<HTMLDivElement>) => {
      const value = (e.currentTarget.textContent || "").trim();

      if (!value || value === boardTitle) {
         setTitle(boardTitle);
         return;
      }

      try {
         await editBoard({
            workspaceId,
            boardId,
            body: { name: value },
         }).unwrap();
      } catch (error) {
         setTitle(boardTitle);
         toast.error(t("board.saveError"));
      }
   };

   const handleCreateCol = () => {
      open({
         title: t("column.create"),
         description: t("column.createDescription"),
         content: <CreateColumn boardId={boardId} close={close} />,
      });
   };

   const handleOpenMembers = () => {
      open({
         title: t("board.membersTitle"),
         description: t("board.membersDescription"),
         content: (
            <BoardMembers
               workspaceId={workspaceId}
               boardId={boardId}
               close={close}
            />
         ),
      });
   };

   const handleDeleteBoard = async () => {
      try {
         await deleteBoard({
            workspaceId,
            boardId,
         }).unwrap();

         toast.success(t("board.deleteBoardSuccess"));
         navigate(routes.workspace({ workspaceId }));
      } catch (error) {
         toast.error(t("board.deleteBoardError"));
      }
   };

   return (
      <div
         className="
            mb-4 flex items-start justify-between gap-4
            max-md:mb-3
            max-sm:flex-col max-sm:items-stretch
         "
      >
         <div className="min-w-0 flex-1 max-sm:mb-3">
            <div className="mb-3 min-w-0 max-w-full overflow-hidden max-sm:mb-2">
               <ContentEditable
                  html={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleSave}
                  className="
                     min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap
                     border-b border-transparent
                     text-4xl font-semibold
                     outline-none
                     transition-colors
                     hover:cursor-pointer
                     focus:border-primary
                     focus:overflow-visible
                     focus:whitespace-normal
                     max-sm:text-3xl
                  "
               />
            </div>

            <Breadcrumb className="min-w-0 max-w-full overflow-hidden">
               <BreadcrumbList className="min-w-0 max-w-full flex-nowrap overflow-hidden">
                  <BreadcrumbItem className="min-w-0 max-w-[40%] shrink overflow-hidden">
                     <Link
                        to={routes.workspace({ workspaceId })}
                        className="block overflow-hidden text-ellipsis whitespace-nowrap"
                     >
                        {currentWorkspace?.name}
                     </Link>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator className="shrink-0" />

                  <BreadcrumbItem className="min-w-0 flex-1 overflow-hidden">
                     <BreadcrumbPage className="block overflow-hidden text-ellipsis whitespace-nowrap">
                        {boardTitle}
                     </BreadcrumbPage>
                  </BreadcrumbItem>
               </BreadcrumbList>
            </Breadcrumb>
         </div>

         <div
            className="
          shrink-0
          flex flex-col items-end gap-2
          max-sm:w-full max-sm:flex-row max-sm:items-center max-sm:justify-between
        "
         >
            <div className="flex gap-2 max-xs:gap-1">
               <Button onClick={handleOpenMembers} variant="outline">
                  <Users />
                  <span className="max-xs:sr-only">{t("board.membersButton")}</span>
               </Button>

               {permissions?.canDeleteBoard && (
                  <AlertDialogBlock
                     title={t("board.deleteTitle")}
                     description={t("board.deleteDescription")}
                     cancelLabel={t("common.cancel")}
                     actionLabel={t("common.yes")}
                     onClickAction={handleDeleteBoard}
                  >
                     <Button variant="destructive">
                        <Trash2 className="text-white" />
                     </Button>
                  </AlertDialogBlock>
               )}
            </div>

            {permissions?.canCreateColumn && (
               <Button onClick={handleCreateCol} className="flex items-center gap-1">
                  <Plus />
                  <span>{t("column.create")}</span>
               </Button>
            )}
         </div>
      </div>
   );
};