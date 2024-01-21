import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { AuthStoreGetters } from './auth.store.ts';

export function authRouteLoader({ request }: LoaderFunctionArgs) {
  if (!AuthStoreGetters.isAuthenticated) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
}
