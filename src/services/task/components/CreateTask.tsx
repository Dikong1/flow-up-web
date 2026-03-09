import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateTaskMutation } from "../api/hooks";
import { Button } from "@/shared/ui/shadcn/button";
import { Input } from "@/shared/ui/shadcn/input";
import { Label } from "@/shared/ui/shadcn/label";
import { cn } from "@/shared/utils/cn";
import { createTaskSchema, type CreateTaskFormValues } from "../schemas/create-task.schema";

interface IProps {
   close: () => void;
   boardId: string;
   colId: string;
}

export const CreateTask = ({ close, boardId, colId }: IProps) => {
   const { t } = useTranslation();
   const [create] = useCreateTaskMutation();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<CreateTaskFormValues>({
      resolver: zodResolver(createTaskSchema),
      mode: "onChange",
   });

   const handleCreateTask = async (data: CreateTaskFormValues) => {
      const toastId = toast.loading(t("task.createLoading"));
      close();
      try {
         await create({
            boardId,
            colId,
            body: data,
         }).unwrap();

         toast.success(t("task.createSuccess"), { id: toastId });
      } catch {
         toast.error(t("task.createError"), { id: toastId });
      }
   };

   return (
      <form onSubmit={handleSubmit(handleCreateTask)}>
         <div>
            <Label className="mb-1">{t("task.taskName")}</Label>
            <Input
               {...register("name")}
               placeholder={t("task.createPlaceholder")}
               className={cn(errors.name?.message && 'border-destructive')}
            />
            {errors.name && (
               <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
               </p>
            )}
         </div>
         <Button
            className="w-full mt-4"
            type="submit"
            disabled={isSubmitting}
         >
            {t("task.create")}
         </Button>
      </form>
   );
};