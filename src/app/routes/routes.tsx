import { lazy } from 'react';
import { MainLayout } from '@/app/layouts/MainLayout';
import { AppShell } from '../layouts/AppShell';
import { ProtectedRoute } from './ProtectedRoute';

import type { RouteObject } from 'react-router';

// Lazy pages
const LandingPage = lazy(() => import('@/pages/LandingPage/LandingPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const WorkspacePage = lazy(() => import('@/pages/WorkspacePage'));
const WorkspaceInvitePage = lazy(() => import('@/pages/WorkspaceInvitePage'));
const BoardPage = lazy(() => import('@/pages/BoardPage'));
const AuthCallback = lazy(() => import('@/pages/AuthCallback'));
const WorkspaceStaticPage = lazy(
    () => import('@/pages/WorkspaceStatisticPage'),
);
const AuthConfirmPage = lazy(() => import('@/pages/AuthConfirmPage'));

export const routes: RouteObject[] = [
    {
        element: <AppShell />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: '/auth',
                element: <AuthPage />,
            },
            {
                path: '/auth/callback',
                element: <AuthCallback />,
            },
            {
                path: '/auth/confirm-email',
                element: <AuthConfirmPage />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/dashboard',
                        element: <MainLayout />,
                        children: [
                            { index: true, element: <HomePage /> },
                            { path: '*', element: <NotFoundPage /> },
                            {
                                path: 'workspaces/:workspaceId',
                                element: <WorkspacePage />,
                            },
                            {
                                path: 'workspaces/:workspaceId/statistics',
                                element: <WorkspaceStaticPage />,
                            },
                            {
                                path: 'workspaces/invite/:token',
                                element: <WorkspaceInvitePage />,
                            },
                            {
                                path: 'workspaces/:workspaceId/boards/:boardId',
                                element: <BoardPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
