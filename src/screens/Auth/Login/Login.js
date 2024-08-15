import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {connect} from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import {schema} from '../../../utils/validation';
import {colors} from '../../../utils';
import {appIcons, appLogos} from '../../../assets/index';
import {loginUser} from '../../../redux/actions/authAction';
import styles from './styles';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmit = () => {
    const {email, password} = this.state;
    if (!email && !password) {
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
        text1: 'Please enter password',
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
    } else {
      let payload = {
        role: 'user',
        email: 'abc@gmail.com',
        password: '123456',
      };
      this.props.loginUser(payload);
      Toast.show({
        text1: 'Login successful',
        type: 'success',
        visibilityTime: 3000,
      });
    }
  };

  render() {
    const {email, password} = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'LOGIN'}
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
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}
              activeOpacity={0.8}>
              <Text style={styles.subText}>Forgot Password ?</Text>
            </TouchableOpacity>
            <CustomButton
              title="LOGIN"
              onPress={this.onSubmit}
              buttonStyle={{borderRadius: 10}}
              textStyle={{fontSize: 22}}
            />
          </View>

          <View style={styles.bottomView}>
            <Text style={styles.textNormal}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.textNormalWithColor}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {loginUser};
export default connect(null, actions)(Login);
