import { useState } from "react";
import { HexColorPicker as ColorPicker } from "react-colorful";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useCreateColumnMutation } from "../api/hooks";
import { Button } from "@/shared/ui/shadcn/button";
import { Input } from "@/shared/ui/shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/shared/ui/shadcn/select"
import { Label } from "@/shared/ui/shadcn/label";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { Spinner } from "@/shared/ui/shadcn/spinner";
import { COLUMN_STATUS_LABELS } from "../constants/column-status";
import type { TColumnStatus } from "../types/column-status";
import { ColumnStatusTooltip } from "./ColumnStatusTooltip";

interface IProps {
   boardId: string,
   close: () => void
}

export const CreateColumn = ({ boardId, close }: IProps) => {
   const { t } = useTranslation()
   const [name, setName] = useState('')
   const [status, setStatus] = useState<TColumnStatus>('TODO')
   const [color, setColor] = useState<string>('#3c3c3c');
   const [create, { isLoading }] = useCreateColumnMutation()

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (isLoading) return;

      try {
         await create({
            boardId,
            body: {
               name,
               status,
               color
            }
         }).unwrap()

         toast.success(t("column.createSuccess"))
      } catch (error: any) {
         const err = getErrorMessage(error)

         console.error(err)
         toast.error(t("column.createError"))
      }
      close()
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="mb-3 flex flex-col gap-2">
            <div>
               <Label htmlFor="create-column-name" className="text-base mb-1">{t("column.createNameLabel")}</Label>
               <Input required id="create-column-name" className="" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("column.createNamePlaceholder")} />
            </div>
            <div>
               <div className="flex items-center justify-between">
                  <Label htmlFor="create-column-status" className="text-base mb-1">{t("column.createStatusLabel")}</Label>
                  <ColumnStatusTooltip />
               </div>
               <div id="create-column-status">
                  <Select value={status} onValueChange={(value) => setStatus(value as TColumnStatus)}>
                     <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t("column.statusPlaceholder")} />
                     </SelectTrigger>
                     <SelectContent>
                        {
                           Object.entries(COLUMN_STATUS_LABELS).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{t(label as any)}</SelectItem>
                           ))
                        }
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <div>
               <Label htmlFor="create-color-picker" className="text-base mb-1">{t("column.colorLabel")}</Label>
               <ColorPicker id="create-color-picker" style={{ width: "100%" }} color={color} onChange={setColor} />
            </div>
         </div>
         <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading ? <Spinner /> : `${t("column.create")}`}
         </Button>
      </form>
   );
};
