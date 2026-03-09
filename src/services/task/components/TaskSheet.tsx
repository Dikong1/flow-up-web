import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { TaskDetails } from "@/services/task/components/TaskDetails";
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/shadcn/sheet";

export const TaskSheet = () => {
   const { t } = useTranslation();
   const [open, setOpen] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const taskId = searchParams.get('taskId');
   const colId = searchParams.get('colId');

   useEffect(() => {
      if (taskId) {
         setOpen(true)
      } else {
         setOpen(false)
      }
   }, [searchParams])

   return (
      <Sheet
         open={open}
         onOpenChange={setOpen}
      >
         <SheetContent className="
            overflow-y-auto
            w-full
            md:w-[45%]
            py-14 px-16 
            max-md:py-8 max-md:px-10
            max-xs:py-8! max-xs:px-6!
            max-xxs:py-6! max-xss:px-2!
         ">
            <SheetTitle className="sr-only">
               {t('common.edit')}
            </SheetTitle>
            <div className="h-full relative">
               {taskId && colId && <TaskDetails close={() => setSearchParams({})} colId={colId} taskId={taskId} />}
            </div>
         </SheetContent>
      </Sheet>
   );
};