import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { TaskAttachment } from "./TaskAttachment";
import { TaskUploadAttachment } from "./TaskUploadAttachment";
import { useLazyGetDownloadPresignedUrlQuery, } from "../api/hooks";
import { useAppSelector } from "@/shared/hooks/redux";
import { selectPermissions } from "@/store/slices/board-slice";
import type { ITaskAttachment } from "../types/task-attachment";

interface IProps {
   boardId: string;
   colId: string;
   taskId: string;
   attachments: ITaskAttachment[];
}

export const TaskAttachments = ({ boardId, colId, taskId, attachments }: IProps) => {
   const { t } = useTranslation();
   const permissions = useAppSelector(selectPermissions);
   const [getDownloadUrl] = useLazyGetDownloadPresignedUrlQuery();
   const objectUrlRef = useRef<string | null>(null);

   const handleDownload = async (attId: string, fileName: string) => {
      const toastId = toast.loading(t("task.attachments.downloadLoading"));

      try {
         const { url } = await getDownloadUrl({
            boardId,
            colId,
            taskId,
            attachmentId: attId,
         }).unwrap();

         const r = await fetch(url);
         if (!r.ok) throw new Error(`Download failed: ${r.status}`);

         const blob = await r.blob();

         if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
         }

         const objectUrl = URL.createObjectURL(blob);
         objectUrlRef.current = objectUrl;

         const a = document.createElement("a");
         a.href = objectUrl;
         a.download = fileName;
         document.body.appendChild(a);
         a.click();
         a.remove();

         URL.revokeObjectURL(objectUrl);
         objectUrlRef.current = null;

         toast.dismiss(toastId);
      } catch (e: any) {
         toast.error(t("task.attachments.downloadError"), { id: toastId });
      }
   };

   return (
      <>
         <div className="flex flex-col gap-2 mb-5">
            {attachments.length > 0 ? (
               attachments.map((att) => (
                  <TaskAttachment
                     key={att.id}
                     onDownload={() => handleDownload(att.id, att.filename)}
                     att={att}
                     boardId={boardId}
                     colId={colId}
                  />
               ))
            ) : (
               <div className="text-muted-foreground italic">
                  {t("task.attachments.empty")}
               </div>
            )}
         </div>
         <TaskUploadAttachment
            boardId={boardId}
            colId={colId}
            taskId={taskId}
            permissions={permissions}
         />
      </>
   );
};