import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/core/axios-client';

import { BridgeWithDefects } from '../models/bridge.model';
import { Defect } from '../models/defect.model.ts';
import { useCurrentInspection } from '../stores/inspections.store.ts';
import { getDefects } from './getDefects.ts';

const QUERY_KEY = 'Bridge';

export const getBridge = async (structureId: string | undefined): Promise<BridgeWithDefects> => {
  if (!structureId) {
    throw new Error('structureId is required');
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await axiosClient.get(`mock/bridge/${structureId}.json`);
  let defects: Defect[];
  try {
    defects = await getDefects(structureId);
  } catch (error) {
    defects = [];
  }

  return {
    ...response.data,
    defects,
  };
};

export const useBridgeQuery = (bridgeId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY, bridgeId],
    queryFn: () => getBridge(bridgeId),
    enabled: !!bridgeId,
  });
};

export const useCurrentBridgeQuery = () => {
  const currentInspection = useCurrentInspection();

  return useBridgeQuery(currentInspection?.structure);
};

/* This allows to safely use Bridge data as Error And Loading is handled by a Guard on route level */
export const useCurrentBridgeGuarded = () => {
  const { data } = useCurrentBridgeQuery();

  return data as BridgeWithDefects;
};
