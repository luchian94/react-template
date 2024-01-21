import Axios from 'axios';

import { API_ENDPOINT } from '@/constants';

export const getUnauthenticatedAxiosClient = () =>
  Axios.create({
    baseURL: API_ENDPOINT,
  });
