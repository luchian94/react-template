import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosClient } from '@/core/axios-client.ts';

import { BridgeListItem } from '../models/bridge-list-item.model.ts';

const QUERY_KEY = ['BridgeList'];

export const getBridgeList = async (): Promise<BridgeListItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const response = await axiosClient.get(`mock/bridge-list.json`);

  return response.data;
};

export const useBridgeListQuery = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY,
    queryFn: getBridgeList,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
