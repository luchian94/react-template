import { useSuspenseQuery } from '@tanstack/react-query';

import { axiosClient } from '@/core/axios-client';
import { Nullable } from '@/utils/utils.ts';

import { BridgeElement } from '../models/bridge.model';

const QUERY_KEY = 'BridgeElement';

export const getBridgeElement = async (
  bridgeElementId: Nullable<string>,
): Promise<BridgeElement> => {
  if (!bridgeElementId) {
    throw new Error('bridgeElementId is required');
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await axiosClient.get(`mock/bridge/element-column.json`);

  return response.data;
};

export const useBridgeElementQuery = (bridgeElementId: Nullable<string>) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY, bridgeElementId],
    queryFn: () => getBridgeElement(bridgeElementId),
  });
};
