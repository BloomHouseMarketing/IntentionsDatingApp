import {StyleSheet, Dimensions} from 'react-native';
import {colors, HP, WP, size} from '../../utils';

const {width,height} = Dimensions.get('window');

const style = StyleSheet.create({
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
  buttonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: width - 85,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    height: 60,
    justifyContent: 'center',
  },
  buttonInnerImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.white,
    position: 'absolute',
    left: width / 8,
  },
  buttonInnerText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.white,
    position: 'absolute',
    left: width / 4,
  },
  applogo:{
    width:width*0.91,
    height:height*0.22,
    resizeMode:"contain",
    marginVertical:"12%"
  },
  space:{
    paddingVertical:20
  }
});

export default style;
