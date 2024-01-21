import { ReactNode, Suspense } from 'react';

import { AppSpinner } from './AppSpinner.tsx';

export const DefaultSuspense = ({ children }: { children?: ReactNode }) => {
  return <Suspense fallback={<AppSpinner />}>{children}</Suspense>;
};
