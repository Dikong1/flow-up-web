import { Suspense } from "react";
import { Outlet } from "react-router";
import { AppSidebar } from "@/widgets/AppSidebar";
import { useWsNotifications } from "@/shared/hooks/use-ws-notifications";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/shadcn/sidebar";
import { useNProgress } from "@/shared/hooks/use-n-progress";
import { NotVerifiedBlock } from "@/shared/ui/NotVefiriedBlock";
import { useAppSelector } from "@/shared/hooks/redux";
import { selectAuth } from "@/store/slices/auth-slice";


const PageLoader = () => {
   useNProgress(true);

   return null
};

export const MainLayout = () => {
   const { isEmailVerified } = useAppSelector(selectAuth)
   useWsNotifications();

   return (
      <>
         <Suspense fallback={<PageLoader />}>
            {!isEmailVerified && <NotVerifiedBlock />}
            <SidebarProvider>
               <AppSidebar />
               <main className="flex-1 min-w-0">
                  <SidebarTrigger />
                  <div className="py-5 px-16 max-xl:px-8 max-xl:py-2 max-md:py-1 max-md:px-5 max-sm:px-3">
                     <Outlet />
                  </div>
               </main>
            </SidebarProvider>
         </Suspense>
      </>
   )
};
