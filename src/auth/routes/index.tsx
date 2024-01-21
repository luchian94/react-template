import { lazyImport } from '@/utils/lazy-import.ts';

const { LoginPage } = lazyImport(() => import('@/pages/LoginPage'), 'LoginPage');

export const authRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];
