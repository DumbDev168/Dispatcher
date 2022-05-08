import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Home from '@screens/Home';
import {configureDesignSystem} from '@utils/designSystem';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => Home);
Navigation.events().registerAppLaunchedListener(() => {
  configureDesignSystem();
  SplashScreen.hide();
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});
