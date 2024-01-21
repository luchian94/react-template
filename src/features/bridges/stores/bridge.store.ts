import { Nullable } from 'primereact/ts-helpers';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { Bridge } from '../models/bridge.model';

interface BridgeStore {
  bridge: Nullable<Bridge>;
  selectedBridgeElement: Nullable<string>;
}

const useBridgeStore = create<BridgeStore>()(() => ({
  bridge: null,
  selectedBridgeElement: null,
}));

/* Selectors */
export const useBridge = () => useBridgeStore((state) => state.bridge);
export const useSelectedBridgeElement = () =>
  useBridgeStore((state) => state.selectedBridgeElement);
export const useBridgeElements = () => useBridgeStore((state) => state.bridge?.elements ?? []);

export const useBridgeBaseInfo = () =>
  useBridgeStore(
    useShallow((state) => ({
      bridgeId: state.bridge?.id,
      bridgeName: `${state.bridge?.name ?? 'Unknown'}`,
    })),
  );

/* Actions */
const setBridge = (bridge: Nullable<Bridge>) => {
  useBridgeStore.setState({ bridge: bridge });
};
const setBridgeElement = (element: Nullable<string>) => {
  useBridgeStore.setState({ selectedBridgeElement: element });
};
export const bridgeStoreActions = {
  setBridge,
  setBridgeElement,
};
