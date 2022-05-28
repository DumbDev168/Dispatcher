import create, {SetState, GetState} from 'zustand';
import {persist, subscribeWithSelector} from 'zustand/middleware';
import {TRegisterSlice, createRegisterSlice} from './createRegisterSlice';
import {TUserSlice, createUserSlice} from './createUserSlice';
import {TDefaultState, createDefaultSlice} from './createDefaultSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TStoreState = TRegisterSlice & TUserSlice & TDefaultState;

export type TStoreSlice<T> = (
  set: SetState<TStoreState>,
  get: GetState<TStoreState>,
) => T;

export const useStore = create<TStoreState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...createDefaultSlice(set, get),
        ...createRegisterSlice(set, get),
        ...createUserSlice(set, get),
      }),
      {
        name: 'dispatcher-storage',
        getStorage: () => AsyncStorage,
        partialize: state => {
          return {
            token: state.token,
            user: state.user,
          };
        },
        onRehydrateStorage: () => {
          // optional
          return (state, error) => {
            if (error) {
              //console.log("an error happened during hydration", error)
            } else {
              state?.setHasHydrated(true);
            }
          };
        },
      },
    ),
  ),
);
