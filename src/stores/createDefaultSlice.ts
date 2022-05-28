import {TStoreSlice} from './useStore';

export type TDefaultState = {
  _hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
};

export const createDefaultSlice: TStoreSlice<TDefaultState> = (set, get) => ({
  _hasHydrated: false,
  setHasHydrated: val => set({_hasHydrated: val}),
});
