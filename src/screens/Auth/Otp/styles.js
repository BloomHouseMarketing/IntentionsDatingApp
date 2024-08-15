import {StyleSheet, Dimensions} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  applogo: {
    width: width * 0.91,
    height: height * 0.22,
    resizeMode: 'contain',
    marginVertical: '12%',
  },
  underlineStyleBase: {
    width: 42,
    height: 48,
    borderWidth: 0,
    borderRadius: 8,
    borderColor: '#ffffff',
    borderWidth: 2,
    color: '#fff',
    fontSize: 17,
  },
  textNormal: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  textNormalWithColor: {
    color: colors.primary,
    textDecorationColor: colors.primary,
    fontSize: 17,
    fontWeight: '700',
  },
  otpInput: {
    width: '80%',
    height: 20,
    alignSelf: 'center',
    marginVertical: 40,
  },
  timerText: {
    alignSelf: 'flex-end',
    color: '#fff',
    fontSize: 13,
    marginBottom: 10,
    marginRight: 27,
  },
});

export default styles;
