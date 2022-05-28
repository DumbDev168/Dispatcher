import Snackbar, {SnackBarOptions} from 'react-native-snackbar';

const showMessage = (msg: string, options?: SnackBarOptions) => {
  Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_LONG,
    ...(options || {}),
  });
};
export {showMessage};
