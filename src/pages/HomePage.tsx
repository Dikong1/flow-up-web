import { History } from "lucide-react";
import { TaskBlock } from "@/services/user-activity/components/TaskBlock";
import { useTitle } from "@/shared/hooks/use-title";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/shared/ui/shadcn/carousel"
import { useGetRecentTasksQuery } from "@/services/user-activity/api/hooks/";
import { Spinner } from "@/shared/ui/shadcn/spinner";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { useTranslation } from "react-i18next";
import { AnimatedTitle } from "@/shared/ui/AnimatedTitle";

const HomePage = () => {
   useTitle("Home")
   const { data, isLoading, isError, error } = useGetRecentTasksQuery()
   const { t } = useTranslation()

   const getRandomTitle = () => {
      const randNumber = Math.floor(Math.random() * 5) + 1

      return `title${randNumber}`
   }

   const content = (() => {
      if (isLoading) return (
         <div className="flex justify-center py-5">
            <Spinner className="size-6" />
         </div>
      );
      if (isError) return (
         <div className="text-center py-24 text-red-600 text-lg font-semibold">
            {t("column.loadError", { error: getErrorMessage(error) })}
         </div>
      )
      if (data?.length === 0) return (
         <div className="text-center py-24 text-gray-500 text-lg">
            {t("task.empty")}
         </div>
      )
      if (!data) return

      return (
         <Carousel
            opts={{
               align: "start",
            }}
            className="w-full"
         >
            <CarouselContent className="">
               {data.map((item, index) => (
                  <CarouselItem key={index} className="basis-auto">
                     <TaskBlock taskRecent={item} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </Carousel>
      )
   })()

   return (
      <div className="w-full">
         <AnimatedTitle>
            {t(`home.${getRandomTitle()}`)}
         </AnimatedTitle>
         <div className="w-full max-w-5xl mx-auto pt-10">
            <h2 className="text-lg flex items-center gap-1.5 mb-1">
               <History size={20} className="mt-0.5" color="#9a9fa5" />
               <span className="text-muted-foreground">
                  {t('home.lastOpenedTasks')}
               </span>
            </h2>
            {content}
         </div>
      </div>
   );
};

export default HomePage;
