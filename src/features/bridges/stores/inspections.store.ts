import { create } from 'zustand';

import { Nullable } from '@/utils/utils.ts';

import { Inspection } from '../models/inspection.model.ts';

interface InspectionsStoreModel {
  inspections: Inspection[];
  lastInspection: Nullable<Inspection>;
}

const useInspectionsStore = create<InspectionsStoreModel>()(() => ({
  inspections: [],
  lastInspection: null,
}));

/* Selectors */
export const useInspections = () => useInspectionsStore((state) => state.inspections);
export const useCurrentInspection = () => useInspectionsStore((state) => state.lastInspection);

/* Actions */
const setInspections = (inspections: Inspection[]) => {
  useInspectionsStore.setState({ inspections });
};
const setCurrentInspection = (inspection: Nullable<Inspection>) => {
  useInspectionsStore.setState({ lastInspection: inspection });
};

export const inspectionStoreActions = {
  setInspections,
  setCurrentInspection,
};
