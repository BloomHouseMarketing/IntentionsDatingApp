import React, {useState} from 'react';
import {View, Text, Switch, Dimensions} from 'react-native';
import AppBackground from '../../components/AppBackground';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../utils';
import styles from './styles';

const {width} = Dimensions.get('screen');

const Settings = ({navigation}) => {
  const [notification, setNotification] = useState(false);
  return (
    <AppBackground back title={'Settings'} marginHorizontal={false}>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <CustomButton
            title="CHANGE PASSWORD"
            onPress={() => navigation.navigate('ChangePassword')}
            buttonStyle={{borderRadius: 10, width: width - 80}}
            textStyle={{fontSize: 18}}
          />
        </View>
        <View style={styles.switchButton}>
          <Text style={styles.switchText}>Enable Notifications</Text>
          <Switch
            trackColor={{false: colors.gray, true: 'rgb(17,221,81)'}}
            thumbColor={'#fff'}
            ios_backgroundColor={colors.gray}
            onValueChange={() =>
              setNotification(prevNotification => !prevNotification)
            }
            value={notification}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default Settings;
