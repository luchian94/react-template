import { createBrowserRouter, Navigate } from 'react-router-dom';

import { authRouteLoader } from '@/auth/auth.route-loader.ts';
import { authRoutes } from '@/auth/routes/index.tsx';
import { MainLayout } from '@/components/layout/MainLayout.tsx';
import { BreadcrumbItemTemplate } from '@/components/misc/BreadcrumbItemTemplate.tsx';
import { BRIDGE_DETAIL_KEY } from '@/features/bridges/constants';
import { bridgeRoutes } from '@/features/bridges/routes.tsx';
import { RouteHandleData } from '@/models/misc.ts';
import { lazyImport } from '@/utils/lazy-import.ts';

import { Root } from './Root.tsx';

const { DashboardPage } = lazyImport(() => import('@/pages/DashboardPage'), 'DashboardPage');
const { BridgeListPage } = lazyImport(() => import('@/pages/BridgeListPage'), 'BridgeListPage');
const { BridgeDetailsPage } = lazyImport(
  () => import('@/pages/bridge-details/BridgeDetailsPage'),
  'BridgeDetailsPage',
);
const { PageNotFound } = lazyImport(() => import('@/pages/PageNotFound.tsx'), 'PageNotFound');

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      ...authRoutes,
      {
        path: '',
        element: <MainLayout />,
        loader: authRouteLoader,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
            handle: {
              breadcrumbs: [{ label: 'Dashboard', active: true, template: BreadcrumbItemTemplate }],
            } as RouteHandleData,
          },
          {
            path: 'bridges',
            element: <BridgeListPage />,
            handle: {
              breadcrumbs: [{ label: 'Bridges', active: true, template: BreadcrumbItemTemplate }],
            } as RouteHandleData,
          },
          {
            path: 'bridge/:bridgeId',
            children: bridgeRoutes,
            element: <BridgeDetailsPage />,
            handle: {
              breadcrumbs: [
                { label: 'Bridges', url: '/bridges', template: BreadcrumbItemTemplate },
                {
                  id: BRIDGE_DETAIL_KEY,
                },
              ],
            } as RouteHandleData,
          },
          {
            path: '/',
            element: <Navigate to="/bridges" />,
          },
        ],
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);
