import { createElement, createContext as reactCreateContext, useContext, useRef } from 'react';

import type { StoreApi } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';

type ExtractState<Store> = Store extends { getState: () => infer T } ? T : never;
type WithoutCallSignature<T> = { [K in keyof T]: T[K] };

export const createStoreContext = <State, Store extends StoreApi<State> = StoreApi<State>>() => {
  const StoreContext = reactCreateContext<Store | undefined>(undefined);

  type Provider = React.FC<
    {
      createStore: () => Store;
      children: React.ReactNode;
    } & Record<string, unknown>
  >;

  // eslint-disable-next-line react/prop-types
  const Provider: Provider = ({ createStore, ...rest }) => {
    const storeRef = useRef<Store>();
    return createElement(StoreContext.Provider, {
      value: (storeRef.current ||= createStore()),
      ...rest,
    });
  };

  const useStore = <StateSlice = ExtractState<Store>>(
    selector: (state: ExtractState<Store>) => StateSlice,
    equalityFn?: (left: StateSlice, right: StateSlice) => boolean,
  ) => {
    const store = useContext(StoreContext);
    if (store) {
      return useStoreWithEqualityFn(store, selector, equalityFn);
    }
    throw new Error('Seems like you have not used zustand provider as an ancestor.');
  };

  const useStoreApi = () => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Seems like you have not used zustand provider as an ancestor.');
    }
    return store;
  };

  return {
    Provider,
    useStore,
    useStoreApi,
  };
};
