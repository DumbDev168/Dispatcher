import {generateRNNScreens} from 'rnn-screens';
import {withServices} from '@services/index';
import {withTitle} from '@services/navigation/options';

const screens = generateRNNScreens(
  {
    Home: {
      component: require('@screens/Home').default,
      options: {
        topBar: {
          visible: false,
        },
      },
    },
    Register: {
      component: require('@screens/Register').default,
      options: {
        topBar: {
          ...withTitle('Register'),
        },
      },
    },
    RegisterOPT: {
      component: require('@screens/RegisterOPT').default,
      options: {
        topBar: {
          ...withTitle('SMS Code Confirmation'),
        },
      },
    },
    Login: {
      component: require('@screens/Login').default,
      options: {
        topBar: {
          ...withTitle('Login'),
        },
      },
    },
    Dashboard: {
      component: require('@screens/Dashboard').default,
      options: {
        topBar: {
          ...withTitle('Authenciated Dashboard'),
        },
      },
    },
  },
  [withServices],
);

export {screens};
