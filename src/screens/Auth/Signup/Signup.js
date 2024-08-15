import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import {schema} from '../../../utils/validation';
import {colors} from '../../../utils';
import styles from './styles';
import {appIcons, appLogos} from '../../../assets/index';
class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSubmit = () => {
    const {email, password, confirmPassword} = this.state;
    if (email && !password && !confirmPassword) {
      Toast.show({
        text1: 'Please enter all fields',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!email) {
      Toast.show({
        text1: 'Please enter email address',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'Please enter a valid email address',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!password) {
      Toast.show({
        text1: 'Password is required',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!schema.validate(password)) {
      Toast.show({
        text1:
          'Password not valid (Use atleast one UpperCase Letter, one number and one special character',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!confirmPassword) {
      Toast.show({
        text1: 'Confirm password is required',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        text1: 'Password and confirm password must be same',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        text1: 'OTP verification code has been sent to your email address',
        type: 'success',
        visibilityTime: 3000,
      });
      this.props.navigation.navigate('Otp', {screenName: 'signup'});
    }
  };

  render() {
    const {email, password, confirmPassword} = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'SIGNUP'}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <View style={[styles.container, {marginTop: 20}]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <CustomTextInput
              leftIcon={appIcons.email}
              placeholder={'Email'}
              value={email}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({email: value})}
            />
            <CustomTextInput
              leftIcon={appIcons.lock}
              placeholder={'Password'}
              value={password}
              onChangeText={value => this.setState({password: value})}
              rightIcon
              isPassword
            />
            <CustomTextInput
              leftIcon={appIcons.lock}
              placeholder={'Change Password'}
              value={confirmPassword}
              onChangeText={value => this.setState({confirmPassword: value})}
              rightIcon
              isPassword
            />
            <CustomButton
              title="SIGNUP"
              onPress={this.onSubmit}
              buttonStyle={{borderRadius: 10, marginTop: 10}}
              textStyle={{fontSize: 22}}
            />
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.textNormal}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.textNormalWithColor}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomBackground>
    );
  }
}

export default Signup;
