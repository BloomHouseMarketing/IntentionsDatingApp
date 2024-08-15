import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Toast from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import {appLogos} from '../../../assets/index';
import styles from './styles';

const Otp = ({navigation, route}) => {
  const {screenName} = route.params;
  let timer;
  const [code, setCode] = useState();
  const [timerCode, setTimerCode] = useState(30);
  const [resend, setResend] = useState(false);
  const onSubmit = () => {
    if (code?.length > 0) {
      if (screenName == 'signup') {
        navigation.navigate('CompleteProfile');
      } else {
        navigation.navigate('ChangePassword');
      }
    } else {
      Toast.show({
        text1: 'OTP code is required',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };
  const startInterval = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setTimerCode(timerCode => {
        if (timerCode > 0) {
          return timerCode - 1;
        } else {
          setResend(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);
  };
  const handleReset = () => {
    if (resend) {
      setTimerCode(30);
      setResend(false);
      setCode();
      startInterval();
      Toast.show({
        text1: 'We have resend OTP verification code at your email address',
        type: 'error',
        visibilityTime: 3000,
      });
    }else{
      Toast.show({
        text1: 'Please wait untill timer finishes!',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };
  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <CustomBackground
      showLogo={false}
      titleText={'OTP VERIFICATION'}
      onBack={() => navigation.goBack()}>
      <View style={styles.container}>
        <View style={[styles.container, {marginTop: 20}]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
          <OTPInputView
            keyboardType="numeric"
            style={styles.otpInput}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={c => setCode(c)}
            code={code}
          />
          <Text style={styles.timerText}>00:{timerCode}</Text>
          <CustomButton
            title="SUBMIT"
            onPress={onSubmit}
            buttonStyle={{borderRadius: 10}}
            textStyle={{fontSize: 22}}
          />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.textNormal}> Didn't Receive Code? </Text>
          <TouchableOpacity onPress={() => handleReset()}>
            <Text style={styles.textNormalWithColor}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomBackground>
  );
};

export default Otp;
