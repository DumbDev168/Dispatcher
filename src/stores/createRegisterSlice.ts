import {IRegister, IRegisteredUser, IVerifyRegisterAccount} from 'types/auth';
import {TStoreSlice} from './useStore';
import {AuthApi} from '@services/api/auth';
import {showMessage} from '@utils/showMessage';

export type TRegisterSlice = {
  isLoading: boolean;
  registeredUser?: IRegisteredUser;
  registerSuccess: boolean;
  register: (data: IRegister) => PVoid;
  verifyRegisterAccount: (data: IVerifyRegisterAccount) => PVoid;
};

export const createRegisterSlice: TStoreSlice<TRegisterSlice> = (set, get) => ({
  isLoading: false,
  registerSuccess: false,
  verifyRegisterAccount: async data => {
    set({isLoading: true});
    try {
      const response = await AuthApi.verifyRegisterAccount(data);
      showMessage(response.data?.message || '');
      const resData = response.data.data;
      set({
        isLoading: false,
        registeredUser: undefined,
        token: resData.accessToken,
        isAuthenicated: true,
        user: resData.user,
      });
    } catch (err) {
      //@ts-ignore
      showMessage(err.data?.message || 'Unable to handle the request.');
      set({
        isLoading: false,
      });
    }
  },
  register: async data => {
    set({isLoading: true});
    try {
      const response = await AuthApi.register(data);
      showMessage(response.data?.message || '');
      set({
        isLoading: false,
        registeredUser: response.data.data.item,
        registerSuccess: true,
      });

      console.warn('response', response);
    } catch (err) {
      //@ts-ignore
      showMessage(err.data?.message || 'Unable to handle the request.');
      set({
        isLoading: false,
      });
    }
  },
});
