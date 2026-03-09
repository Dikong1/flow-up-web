import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CirclePlus } from "lucide-react";
import { Checkbox } from "@/shared/ui/shadcn/checkbox"

interface IProps {
   onCreate: (title: string) => void;
}

export const InlineSubtaskTextarea = ({ onCreate }: IProps) => {
   const { t } = useTranslation()
   const [value, setValue] = useState("");
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   useEffect(() => {
      textareaRef.current?.focus();
   }, []);

   const resize = () => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
   };

   const submit = () => {
      if (!value.trim()) return;
      onCreate(value.trim());
      setValue("");

      const el = textareaRef.current;
      if (el) el.style.height = "auto";
   };

   return (
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-2 flex-1">
            <Checkbox checked={false} className="" />
            <textarea
               style={{ fontSize: "16px" }}
               ref={textareaRef}
               rows={1}
               value={value}
               placeholder={t("task.subtaskPlaceholder")}
               onChange={e => {
                  setValue(e.target.value);
                  resize();
               }}
               onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                     e.preventDefault();
                     submit();
                  }

                  if (e.key === "Escape") {
                     setValue("");
                     textareaRef.current?.blur();
                  }
               }}
               className="w-[65%] resize-none bg-transparent outline-none
               placeholder:text-muted-foreground
               overflow-hidden
               whitespace-pre-wrap wrap-break-word
            "
            />
         </div>
         <button onClick={submit} className="hidden pointer-coarse:block shrink-0" aria-label={t('task.subtaskPlaceholder')}>
            <CirclePlus className="size-6 text-primary" />
         </button>
      </div>
   );
};
