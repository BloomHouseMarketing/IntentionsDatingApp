import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import Toast from 'react-native-toast-message';
// import {Colors} from '../../../config';
import { colors } from '../../utils';
import CustomBackground from '../../components/CustomBackground';
// import SocialSignin from '../../../components/SocialSignin';
// import Icons from '../../../assets/Icons';
import { appIcons, appLogos } from '../../assets/index';
import Logo from '../../components/Logo';
import styles from './styles';
const { width } = Dimensions.get('window');

class App extends Component {
  state = {
    agreementModal: false,
    terms: false,
    policy: false,
    navigator: '',
  };

  render() {
    const { agreementModal, terms, policy, navigator } = this.state;
    const methods = [
      {
        name: 'Email',
        icon: appIcons.email,
        onPress: () => navigation.navigate('Login'),
        color: colors.primary,
      },
      {
        name: 'Facebook',
        icon: appIcons.facebook,
        color: colors.facebook,
        onPress: () =>
          Toast.show({
            text1: 'Facebook login for app is not setup',
            type: 'error',
            visibilityTime: 3000,
          }),
        // onPress: SocialSignin.Facebook,
      },
      {
        name: 'Google',
        icon: appIcons.googlePlus,
        color: colors.google,
        onPress: () =>
          Toast.show({
            text1: 'Google login for app is not setup',
            type: 'error',
            visibilityTime: 3000,
          }),
        // onPress: SocialSignin.Google,
      },
      {
        name: 'Apple',
        icon: appIcons.apple,
        color: colors.black,
        onPress: () =>
          Toast.show({
            text1: 'Apple login for app is not setup',
            type: 'error',
            visibilityTime: 3000,
          }),
        // onPress: SocialSignin.Apple,
      },
    ];
    const { navigation } = this.props;
    return (
      <CustomBackground back={false} showLogo={false} titleText={"Pre-Login"}>
        <View style={[styles.container, { padding: 20 }]}>
          <View style={styles.space}>
          <Logo size={220} />
          </View>
          <View style={styles.space}>
            {methods.map((method, i) => {
              const { color, name, icon, onPress } = method;
              if (Platform.OS !== 'ios' && name === 'Apple') return null;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  key={i}
                  activeOpacity={0.8}
                  style={[styles.buttonContainer,{backgroundColor: color}]}>
                  <Image source={icon} style={styles.buttonInnerImage} />

                  <Text style={styles.buttonInnerText}>
                    Sign in with {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </CustomBackground>
    );
  }
}

export default App;
