import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { useNProgress } from '@/shared/hooks/use-n-progress';
import { useWsNotifications } from '@/shared/hooks/use-ws-notifications';
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/shadcn/sidebar';
import { AppSidebar } from '@/widgets/AppSidebar';

const PageLoader = () => {
    useNProgress(true);

    return null;
};

export const MainLayout = () => {
    useWsNotifications();

    return (
        <>
            <Suspense fallback={<PageLoader />}>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="min-w-0 flex-1">
                        <SidebarTrigger />
                        <div className="px-16 py-5 max-xl:px-8 max-xl:py-2 max-md:px-5 max-md:py-1 max-sm:px-3">
                            <Outlet />
                        </div>
                    </main>
                </SidebarProvider>
            </Suspense>
        </>
    );
};
