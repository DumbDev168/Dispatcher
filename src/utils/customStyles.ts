import {Colors} from 'react-native-ui-lib';
import {ScaledSheet} from 'react-native-size-matters';
const styles = ScaledSheet.create({
  withFrame: {
    borderWidth: 0.5,
    borderColor: Colors.$outlineDisabledHeavy,
    paddingVertical: '10@ms',
    borderRadius: '5@ms',
  },
  inputContainer: {
    width: '280@s',
    marginBottom: '15@vs',
  },
});

export {styles}; // prevent recycle import!
