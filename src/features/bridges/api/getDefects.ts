import { axiosClient } from '@/core/axios-client.ts';

import { Defect } from '../models/defect.model.ts';

export const getDefects = async (id: string | undefined) => {
  if (!id) {
    throw new Error('ID was not provided');
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await axiosClient.get<Defect[]>(`mock/bridge/${id}-defects.json`);

  return response.data;
};
