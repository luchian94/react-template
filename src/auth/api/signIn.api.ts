import { getUnauthenticatedAxiosClient } from '@/utils/axios.utils.ts';

import { SignInPayload } from '../models/auth.model';

export const signIn = (data: SignInPayload) => {
  console.log('SIGNING IN:', data);
  const axiosClient = getUnauthenticatedAxiosClient();
  return axiosClient.get('mock/login-response.json', { baseURL: '' });
};
