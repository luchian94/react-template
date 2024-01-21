import Axios from 'axios';

import { authRequestInterceptor } from '@/auth/interceptors/auth.interceptor';
import { API_ENDPOINT } from '@/constants';

export const axiosClient = Axios.create({
  baseURL: API_ENDPOINT,
});

axiosClient.interceptors.request.use(authRequestInterceptor);
