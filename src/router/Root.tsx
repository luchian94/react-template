import { Outlet } from 'react-router-dom';

import { GlobalErrorBoundary } from '@/components/misc/ErrorBoundary';
import { DefaultSuspense } from '@/components/misc/Suspense';

export const Root = () => {
  return (
    <GlobalErrorBoundary>
      <DefaultSuspense>
        <Outlet />
      </DefaultSuspense>
    </GlobalErrorBoundary>
  );
};
