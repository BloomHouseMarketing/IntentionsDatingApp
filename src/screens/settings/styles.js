import {StyleSheet} from 'react-native';
import {colors, HP, WP, size} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  switchButton: {
    marginVertical: 25,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
});

export default styles;
