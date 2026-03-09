import ContentEditable from "react-contenteditable";
import { useEffect, useState } from "react";
import { Trash2 as DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { SheetHeader, SheetTitle } from "@/shared/ui/shadcn/sheet";
import { taskApi } from "@/services/task/api/taskApi";
import {
   useCreateSubtaskMutation,
   useDeleteTaskMutation,
   useGetTaskByIdQuery,
   useUpdateTaskMutation
} from "../api/hooks";
import { useCreateTrackTaskMutation } from "@/services/user-activity/api/hooks/";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { cn } from "@/shared/utils/cn";
import { TaskPriority } from "./TaskPriority";
import { TaskDueDate } from "./TaskDueDate";
import { TaskSubtask } from "./TaskSubtask";
import { InlineSubtaskTextarea } from "./InlineSubtaskTextarea";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/shared/ui/shadcn/alert-dialog"
import { selectCurrentBoardId, selectPermissions } from "@/store/slices/board-slice";
import { TaskAttachments } from "./TaskAttachments";
import { TaskAssignee } from "./TaskAssignee";
import { TaskCommentsList } from "./TaskCommentsList";
import { TaskCommentsAdd } from "./TaskCommentsAdd";
import type { IUpdateTaskDto } from "../types";
import type { IUser } from "@/services/user/types/user";
import { Spinner } from "@/shared/ui/shadcn/spinner";

interface IProps {
   taskId: string;
   colId: string;
   close: () => void;
}

export const TaskDetails = ({ taskId, colId, close }: IProps) => {
   const { t } = useTranslation()
   const dispatch = useAppDispatch()
   const permissions = useAppSelector(selectPermissions)
   const boardId = useAppSelector(selectCurrentBoardId)

   const { data: task, isLoading, isError, error } = useGetTaskByIdQuery({ boardId, colId, taskId });
   const [createTrack] = useCreateTrackTaskMutation()
   const [updateTask] = useUpdateTaskMutation();
   const [deleteTask] = useDeleteTaskMutation();
   const [createSubtask] = useCreateSubtaskMutation();

   const [title, setTitle] = useState("");
   const [description, setDescription] = useState<string | undefined>("");
   const [openAlert, setOpenAlert] = useState(false);

   useEffect(() => {
      if (!task) {
         return;
      }

      setTitle(task.name)
      setDescription(task.description)
   }, [task])

   useEffect(() => {
      if (taskId) {
         createTrack({ body: { taskId } })
      }

      return () => {
         close()
      }
   }, [taskId])

   if (isLoading) {
      return <div className="flex justify-center absolute top-1/2 w-full -translate-y-1/2">
         <Spinner className="size-9" />
      </div>
   }

   if (isError) {
      return <div className="p-6">{getErrorMessage(error)}</div>;
   }

   if (!task) {
      return <div className="p-6">{t("task.loadError")}</div>;
   }

   const handleCreateSubtask = async (title: string) => {
      const toastId = toast.loading(t("task.subtaskCreateLoading"));

      try {
         const createdSubtask = await createSubtask({
            boardId,
            colId: task.colId,
            taskId: task.id,
            body: { title }
         }).unwrap()

         dispatch(
            taskApi.util.updateQueryData(
               "getTaskById",
               { boardId, colId, taskId, },
               (draft) => {
                  draft.todos.push(createdSubtask)
               }
            )
         )

         toast.success(t('task.subtaskCreateSuccess'), { id: toastId })
      } catch (error) {
         toast.error(t("task.subtaskCreateError"), { id: toastId })
      }
   };

   const handleUpdateDetails = (
      fields: Partial<IUpdateTaskDto>,
      assignee?: Pick<IUser, 'id' | 'username' | 'avatar' | 'fullName'> | null
   ) => {
      updateTask({
         boardId,
         colId: task.colId,
         taskId: task.id,
         assignee: assignee,
         body: fields,
      });
   };

   const handleDeleteTask = async () => {
      try {
         await deleteTask({
            boardId,
            colId: task.colId,
            taskId: task.id
         }).unwrap();
         toast.success(t("task.deleteSuccess"));

         close()
      } catch (error) {
         toast.error(t("task.deleteError"));
      }
   }

   return (
      <div className="relative py-2">
         <SheetHeader>
            <SheetTitle className="text-4xl mb-3 max-md:text-3xl max-sm:text-2xl">
               <ContentEditable
                  html={title}
                  onChange={e => setTitle(e.target.value)}
                  onBlur={(e: React.FocusEvent<HTMLElement>) => {
                     const value = e.currentTarget.textContent?.trim() || ""
                     if (value !== task.name) {
                        handleUpdateDetails({ name: value })
                     }
                  }}
                  className="font-bold outline-none border-b border-transparent focus:border-blue-500 line-clamp-4"
               />
            </SheetTitle>
            <div className="flex gap-5 flex-wrap">
               <TaskAssignee taskAssignee={task.assignee}
                  handleAssigneeChange={assignee => {
                     handleUpdateDetails({ assigneeId: assignee?.id }, assignee);
                  }}
               />
               <TaskPriority
                  taskPriorityId={task.priorityId}
                  onChange={p => {
                     handleUpdateDetails({ priorityId: p.id });
                  }}
               />
               <TaskDueDate
                  dueDate={task.dueDate}
                  setDueDate={d => {
                     handleUpdateDetails({ dueDate: d?.toISOString() });
                  }}
               />
            </div>
            <div className="mt-5">
               <h2 className="text-xl max-sm:text-lg font-medium mb-2">{t("comments.title")}</h2>
               <div>
                  <TaskCommentsList boardId={boardId} colId={colId} taskId={taskId} />
                  <TaskCommentsAdd boardId={boardId} colId={colId} taskId={taskId} />
               </div>
            </div>
            <div className="mt-5">
               <h2 className="text-xl max-sm:text-lg font-medium mb-2">{t("task.description")}</h2>
               <ContentEditable
                  html={description || ""}
                  onChange={e => setDescription(e.target.value)}
                  onBlur={(e: React.FocusEvent<HTMLElement>) => {
                     const next = (e.currentTarget.textContent ?? "").trim();
                     const prev = (task.description ?? "").trim();

                     if (next !== prev) {
                        handleUpdateDetails({ description: next });
                     }
                  }}
                  className={cn(
                     "text-lg outline-none border-b border-transparent pb-1",
                     "focus:border-blue-500",
                     !description && "text-muted-foreground italic"
                  )}
               />
            </div>
            <div className="mt-5">
               <h2 className="text-xl max-sm:text-lg font-medium mb-2">{t("task.subtasksTitle")}</h2>
               <div className="space-y-1">
                  {task.todos?.map(todo => (
                     <TaskSubtask
                        key={todo.id}
                        colId={task.colId}
                        taskId={task.id}
                        subtask={todo}
                     />
                  ))}
                  <InlineSubtaskTextarea onCreate={handleCreateSubtask} />
               </div>
            </div>
            <div className="mt-5">
               <h2 className="text-xl max-sm:text-lg font-medium mb-2">{t("task.attachmentsTitle")}</h2>
               <div className="">
                  <TaskAttachments attachments={task.attachments} boardId={boardId} colId={colId} taskId={taskId} />
               </div>
            </div>
         </SheetHeader>
         {
            permissions?.canDeleteTask && (
               <div onClick={() => setOpenAlert(true)} className="
               cursor-pointer absolute bottom-1 right-0 z-10 w-14 h-14 bg-red-700 rounded-full hover:bg-red-400 transition-colors
                  max-xs:w-12 max-xs:h-12
               ">
                  <DeleteIcon color="#fff" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform
                     max-xs:size-5
                  " />
               </div>
            )
         }
         <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>{t("task.deleteConfirmTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>{t("task.deleteConfirmDescription")}</AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>{t("common.no")}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteTask}>{t("common.yes")}</AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </div>
   );
};
