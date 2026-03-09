import { LayoutGrid } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface IProps {
   image: string | undefined;
   title: string;
}

export const BoardCardImage = ({ title, image }: IProps) => {
   return (
      <div
         className={cn(
            "aspect-250/175 overflow-hidden relative",
            !image && "bg-muted/60 flex items-center justify-center",
         )}
      >
         {image ? (
            <img
               className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
               src={image}
               alt={`${title} image`}
            />
         ) : (
            <LayoutGrid className="size-10 text-muted-foreground" />
         )}
      </div>
   );
};