import { Outlet } from 'react-router-dom';

import { BreadCrumb } from 'primereact/breadcrumb';

import { useRouteBreadcrumbs } from '@/hooks/route-breadcrumbs.hook';

import { GlobalErrorBoundary } from '../misc/ErrorBoundary';
import { DefaultSuspense } from '../misc/Suspense';
import { Header } from './components/Header';

export const MainLayout = () => {
  const breadcrumbs = useRouteBreadcrumbs();

  return (
    <>
      <Header />
      {breadcrumbs.length > 0 && (
        <BreadCrumb
          separatorIcon={'pi pi-angle-double-right'}
          model={breadcrumbs}
          className="hide-home px-10 py-2 text-sm"
        />
      )}
      <main>
        <GlobalErrorBoundary>
          <DefaultSuspense>
            <Outlet />
          </DefaultSuspense>
        </GlobalErrorBoundary>
      </main>
    </>
  );
};
