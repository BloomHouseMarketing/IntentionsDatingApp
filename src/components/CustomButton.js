import React from 'react';
import {Dimensions, Text, Image, TouchableOpacity} from 'react-native';
import {colors} from '../utils';
import Shadows from '../helpers/Shadows';
const {width} = Dimensions.get('screen');
import {appIcons} from '../assets/index';

export default function CustomButton(props) {
  const {color, title, onPress, buttonStyle, textStyle, disabled, nextBtn} =
    props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          width: width - 44,
          height: 55,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color ? color : colors.primary,
          marginTop: '1%',
          borderRadius: 18,
          ...Shadows.shadow5,
          flexDirection: 'row',
          borderRadius: 30,
        },
        buttonStyle,
      ]}>
      <Text
        style={[
          {fontSize: 18, color: colors.white, fontWeight: 'bold'},
          textStyle,
        ]}>
        {title}
      </Text>
      {nextBtn && (
        <Image
          resizeMode="contain"
          source={Icons.next}
          style={{
            height: 22,
            width: 22,
            marginLeft: '4%',
          }}
        />
      )}
    </TouchableOpacity>
  );
}
