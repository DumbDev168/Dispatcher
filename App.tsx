import { LogBox } from 'react-native';
import { Screen, Root } from 'rnn-screens';
import SplashScreen from "react-native-splash-screen"
import { screens } from '@screens/index';
import { configureDesignSystem } from '@utils/designSystem';
import { initServices } from "@services/index"
import { useStore } from "@stores/useStore"
import { Navigation } from "react-native-navigation"

LogBox.ignoreLogs([
  'RNUILib Picker requires',
  // '`new NativeEventEmitter()`',
  // '[react-native-gesture-handler] Seems like', // https://github.com/software-mansion/react-native-gesture-handler/issues/1831
]);

export const beforeStart = async (): PVoid => {
  SplashScreen.hide()
  // 1. hydrate stores
  await useStore.persist.rehydrate();

  // 2. configure design system
  await configureDesignSystem();

  // 3. init services
  await initServices();

  // 4. subscribe the user token
  useStore.subscribe(state => state.token, (newToken, prevToken) => {
    console.warn('prevtoken', prevToken)
    console.warn('newtoken', newToken)
    Navigation.setRoot(CheckTokenScreen(newToken !== undefined))
  })
};

export const App = () => {
  const token = useStore.getState().token;
  return CheckTokenScreen(token !== undefined);
};

// or 
export const CheckTokenScreen = (isAuth: boolean) => {
  if (isAuth) {
    return Root(Screen(screens.get('Dashboard')))
  }
  return Root(Screen(screens.get('Home')))

}
