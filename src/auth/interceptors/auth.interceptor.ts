import { InternalAxiosRequestConfig } from 'axios';

import { AuthStoreGetters } from '../auth.store.ts';

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = AuthStoreGetters.accessToken;
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
};
