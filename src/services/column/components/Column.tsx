import { GripVertical } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { EditColumn } from "./EditColumn";
import { DeleteColumn } from "./DeleteColumn";
import { TaskList } from "@/services/task/components/TaskList";
import { useAppSelector } from "@/shared/hooks/redux";
import { selectPermissions } from "@/store/slices/board-slice";
import type { IColumn } from "../types/column";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

interface IProps {
   column: IColumn;
   dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export const Column = ({ column, dragHandleProps }: IProps) => {
   const columnApiColor = column.color ?? "#3c3c3c";
   const permissions = useAppSelector(selectPermissions);

   return (
      <div className={cn(
         "w-[380px] relative shadow-xl h-[75vh] max-md:w-[350px] max-sm:w-[330px]",
         'max-xs:w-[300px]!'
      )}>
         <div className="absolute inset-0 rounded-lg brightness-[0.4] dark:brightness-[0.3]" style={{ backgroundColor: columnApiColor }} />
         <div className="relative z-10 p-5 flex flex-col h-full">
            <div className="group flex items-center justify-between w-full border-b mb-2 pb-1 shrink-0" style={{ borderColor: columnApiColor }}>
               <h2 className="text-lg text-white font-semibold">{column.name}</h2>
               <div className="
               opacity-0 group-hover:opacity-100 transition-opacity flex items-center 
               gap-2 pointer-coarse:opacity-100 pointer-coarse:gap-1">
                  {permissions?.canEditBoard &&
                     <EditColumn status={column.status} color={columnApiColor} colId={column.id} boardId={column.boardId} title={column.name} />
                  }
                  {permissions?.canDeleteColumn && <DeleteColumn boardId={column.boardId} colId={column.id} />}
                  {permissions?.canMoveColumn && (
                     <div
                        {...(dragHandleProps ?? {})}
                        className="cursor-grab">
                        <GripVertical size={20} color="#ffffff" />
                     </div>
                  )}
               </div>
            </div>

            <div className="flex-1 min-h-0">
               <TaskList colId={column.id} color={columnApiColor} tasks={column.tasks} />
            </div>
         </div>
      </div>
   );
}