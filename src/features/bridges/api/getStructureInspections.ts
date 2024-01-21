import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '@/core/axios-client.ts';
import { Nullable } from '@/utils/utils.ts';

import { Inspection } from '../models/inspection.model.ts';

const QUERY_KEY = 'Inspections';

export const getStructureInspections = async (structureId: Nullable<string>) => {
  if (!structureId) {
    throw new Error('Structure ID is required');
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { data } = await axiosClient.get<Inspection[]>(`mock/inspections.json`);

  return data;
};

export const useStructureInspectionsQuery = (structureId: Nullable<string>) => {
  return useQuery({
    queryKey: [QUERY_KEY, structureId],
    queryFn: () => getStructureInspections(structureId),
    enabled: !!structureId,
    select: (data) => ({
      inspections: data,
      lastInspection: data[data.length - 1],
    }),
  });
};
