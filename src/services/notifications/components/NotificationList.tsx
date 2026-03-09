import { useTranslation } from "react-i18next";
import { PanelLeftClose, RotateCcw } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import { Spinner } from "@/shared/ui/shadcn/spinner";
import { Button } from "@/shared/ui/shadcn/button";
import { useClickOutside } from "@/shared/hooks/use-click-outside";
import { cn } from "@/shared/utils/cn";
import type { Notification } from "../types/notification";

interface IProps {
   open: boolean;
   close: () => void;
   notifications: Notification[] | undefined,
   isLoading: boolean,
   isError: boolean,
   refetch: () => void
}

export const NotificationList = ({ open, close, notifications, isLoading, isError, refetch }: IProps) => {
   const { t } = useTranslation();
   const ref = useClickOutside<HTMLDivElement>(close);

   const isEmptyList =
      !isLoading &&
      !isError &&
      (notifications?.length ?? 0) === 0;

   const content = (() => {
      if (isLoading) {
         return <Spinner className="size-7" />;
      }

      if (isError) {
         return (
            <div className="text-center flex flex-col items-center gap-1">
               <span className="text-destructive font-medium">
                  {t("notifications.error")}
               </span>
               <Button variant="ghost" onClick={refetch} aria-label={t('notifications.title')}>
                  <RotateCcw />
               </Button>
            </div>
         );
      }

      if (isEmptyList) {
         return <div className="font-medium italic">{t("notifications.empty")}</div>;
      }

      return notifications!.map((item) => (
         <NotificationItem
            key={item.id}
            notification={item}
         />
      ));
   })();

   return (
      <div
         ref={ref}
         className={cn(
            "fixed top-0 -left-[120%] h-dvh transition-all duration-350 px-4 py-3",
            "w-[350px] bg-background border z-1000",
            open && "left-(--sidebar-width) max-lg:w-full max-lg:left-0",
         )}
      >
         <div className="flex h-full flex-col">
            <div className="flex justify-between items-center mb-5 shrink-0">
               <span className="font-medium text-base">{t("notifications.title")}</span>
               <Button variant="ghost" onClick={close}>
                  <PanelLeftClose />
               </Button>
            </div>
            <div
               className={cn(
                  "flex-1 overflow-y-auto overscroll-contain scrollbar-gutter-stable scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-border",
                  isEmptyList || isLoading || isError
                     ? "flex items-center justify-center"
                     : "flex flex-col gap-3 max-sm:gap-2"
               )}
            >
               {content}
            </div>
         </div>
      </div>
   );
};