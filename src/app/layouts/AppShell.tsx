import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router';
import { PageLoader } from '@/shared/ui/PageLoader';

export function AppShell() {
    const location = useLocation();

    return (
        <Suspense fallback={<PageLoader />}>
            <div key={location.pathname} className="w-full">
                <Outlet />
            </div>
        </Suspense>
    );
}
