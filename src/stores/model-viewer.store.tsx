import { FC, ReactNode } from 'react';
import { ILoadedModel } from 'react-babylonjs';

import { Nullable } from 'utils/utils.ts';
import { create } from 'zustand';

import { createStoreContext } from '@/utils/store-context.ts';

interface ModelViewerSettings {
  showCameras?: boolean;
}

interface ModelViewerStoreModel {
  model: Nullable<ILoadedModel>;
  settings: ModelViewerSettings;
  actions: {
    setViewingModel: (model: ILoadedModel) => void;
    toggleShowCameras: () => void;
  };
}

const { Provider, useStore } = createStoreContext<ModelViewerStoreModel>();

const createStore = create<ModelViewerStoreModel>()((set) => ({
  model: null,
  settings: {
    showCameras: false,
  },
  actions: {
    setViewingModel: (model: ILoadedModel) => {
      set({ model });
    },
    toggleShowCameras: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          showCameras: !state.settings.showCameras,
        },
      }));
    },
  },
}));

/* Selectors */
export const useViewingModel = () => useStore((state) => state.model);
export const useModelViewerSettings = () => useStore((state) => state.settings);
export const useViewingModelMeshes = () => useStore((state) => state.model?.meshes ?? []);

/* Actions */
export const useModelViewerActions = () => useStore((state) => state.actions);

/* Provider */
export const ModelViewerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider createStore={() => createStore}>{children}</Provider>;
};
