import {IUser} from 'types/user';
import {TStoreSlice} from './useStore';

export type TUserSlice = {
  user?: IUser;
  isAuthenicated: boolean;
  token?: string;
};

export const createUserSlice: TStoreSlice<TUserSlice> = (set, get) => ({
  user: undefined,
  isAuthenicated: false,
  token: undefined,
});
