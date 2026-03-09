import { CircleQuestionMark } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/shadcn/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/shadcn/popover";
import { useIsTouchDevice } from "@/shared/hooks/use-is-touch-device";

interface IProps {
   children?: React.ReactNode
}

export const CustomTooltip = ({ children }: IProps) => {
   const isTouchDevice = useIsTouchDevice();

   return (
      <>
         {!isTouchDevice ? (
            <Tooltip>
               <TooltipTrigger asChild>
                  <CircleQuestionMark size={18} className="text-muted-foreground" />
               </TooltipTrigger>
               <TooltipContent side="top" className="max-w-[250px] space-y-2 font-medium">
                  {children}
               </TooltipContent>
            </Tooltip>
         ) : (
            <Popover>
               <PopoverTrigger asChild>
                  <CircleQuestionMark size={18} className="text-muted-foreground" />
               </PopoverTrigger>
               <PopoverContent side="top" className="max-w-[250px] space-y-2 font-medium text-xs text-background bg-foreground">
                  {children}
               </PopoverContent>
            </Popover>
         )}
      </>
   );
};
