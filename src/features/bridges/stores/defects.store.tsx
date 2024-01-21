import { FC, ReactNode } from 'react';

import { create } from 'zustand';

import { createStoreContext } from '@/utils/store-context.ts';

import { DefectsObj, DefectWithModel } from '../models/defect.model';

interface DefectsStoreModel {
  defects: DefectsObj;
  selectedDefect: DefectWithModel | null;
  filterText: string;
  actions: {
    setDefects: (defect: DefectsObj) => void;
    setSelectedDefect: (defect: DefectWithModel | null) => void;
    setFilterText: (filterText: string) => void;
    toggleDefect: (defectKey: string) => void;
    setDefectVisibility: (defectKey: string, visible: boolean) => void;
    resetFilters: () => void;
  };
}

const { Provider, useStore } = createStoreContext<DefectsStoreModel>();

const createStore = () =>
  create<DefectsStoreModel>()((set) => ({
    defects: {},
    filterText: '',
    selectedDefect: null,
    actions: {
      setDefects: (defects) => {
        set({ defects });
      },
      setSelectedDefect: (defect) => {
        set({ selectedDefect: defect });
      },
      setFilterText: (filterText) => {
        set({ filterText: filterText.toLowerCase() });
      },
      toggleDefect: (defectKey) => {
        set((state) => {
          const { defects } = state;
          const defect = defects[defectKey];
          defect.visible = !defect.visible;
          return { defects };
        });
      },
      setDefectVisibility: (defectKey, visible) => {
        set((state) => {
          const { defects } = state;
          const defect = defects[defectKey];
          defect.visible = visible;
          return { defects };
        });
      },
      resetFilters: () => {
        set({ filterText: '' });
      },
    },
  }));

/* Selectors */
export const useDefects = () => useStore((state) => state.defects);
export const useSelectedDefect = () => useStore((state) => state.selectedDefect);
export const useDefectsArr = () => {
  return useStore((state) =>
    Object.values(state.defects)
      .filter((defect) => defect.name.toLowerCase().indexOf(state.filterText) !== -1)
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
};

/* Actions */
export const useDefectActions = () => useStore((state) => state.actions);

/* Provider */
export const DefectsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider createStore={createStore}>{children}</Provider>;
};
