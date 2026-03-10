import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ColumnSkeleton } from "@/services/column/components/ColumnSkeleton";
import { Column } from "@/services/column/components/Column";
import { useDndBoard } from "../hooks/use-dnd-board";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { cn } from "@/shared/utils/cn";

interface IProps {
   boardId: string,
}

export const KanbanBoard = ({ boardId }: IProps) => {
   const { t } = useTranslation();
   const {
      isLoading,
      isError,
      localColumns,
      error,
      onDragStart,
      onDragEnd
   } = useDndBoard(boardId)

   const content = useMemo(() => {
      if (isLoading) return (
         <div className="flex gap-4 min-w-max max-md:gap-2">
            {Array.from({ length: 3 }).map((_, i) => <ColumnSkeleton key={i} />)}
         </div>
      )

      if (isError) return (
         <div className="text-center py-24 text-red-600 text-lg font-semibold">
            {t("column.loadError", { error: getErrorMessage(error) })}
         </div>
      )

      if (localColumns.length === 0) return (
         <div className="text-center py-24 text-gray-500 text-lg">
            {t("column.noColumns")}
         </div>
      )

      return (
         <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable
               droppableId="board"
               direction="horizontal"
               type="COLUMN"
            >
               {(provided => (
                  <div
                     ref={provided.innerRef}
                     {...provided.droppableProps}
                     className="flex gap-4 min-w-max max-md:gap-2">
                     {localColumns.map((column, index) => (
                        <Draggable
                           key={column.id}
                           draggableId={column.id}
                           index={index}
                        >
                           {(colProvided) => (
                              <section
                                 ref={colProvided.innerRef}
                                 {...colProvided.draggableProps}
                                 className="shrink-0"
                              >
                                 <Column
                                    column={column}
                                    dragHandleProps={colProvided.dragHandleProps}
                                 />
                              </section>
                           )}
                        </Draggable>
                     ))}
                     {provided.placeholder}
                  </div>
               ))}
            </Droppable>
         </DragDropContext>
      );
   }, [isLoading, isError, localColumns, t, error]);

   return (
      <div
         className={cn(
            "overflow-x-auto overflow-y-hidden pb-5",
            "overscroll-x-contain overscroll-y-auto",
            "scrollbar-gutter-stable",
            "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-border",
         )}
      >
         {content}
      </div>
   );
};
