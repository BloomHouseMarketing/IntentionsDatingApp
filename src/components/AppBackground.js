import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {appIcons} from '../assets/index';
import {appImages} from '../assets';
import {colors} from '../utils';
import NavService from '../helpers/NavService';
import Shadows from '../helpers/Shadows';

function AppBackground({
  children,
  title,
  back = false,
  menu = false,
  nav = '',
  rightIcon = appIcons.notification,
  marginHorizontal = true,
  childrenContainerStyle = {},
  rightIconNav = () => {
    NavService.navigate('Notification');
  },
  notification = false,
}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginTop: getStatusBarHeight() * 1.4,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              nav.length
                ? NavService.navigate(nav)
                : back
                ? NavService.goBack()
                : NavService.openDrawer();
            }}
            style={{
              position: 'absolute',
              alignItems: 'center',
              backgroundColor: menu ? colors.primary : 'transparent',
              borderRadius: menu ? 10 : 0,
              left: 20,
              width: 45,
              height: 45,
              justifyContent: 'center',
              // ...Shadows.shadow3,
            }}>
            {back && (
              <Image
                source={appIcons.back}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: colors.black,
                }}
              />
            )}
            {menu && (
              <Image
                source={appIcons.menu}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: colors.white,
                }}
              />
            )}
          </TouchableOpacity>

          <View>
            <Text
              style={{
                color: colors.black,
                fontWeight: '700',
                fontSize: 22,
              }}>
              {title}
            </Text>
          </View>
          {notification && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Notification');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: colors.primary,
              }}>
              <Image
                source={rightIcon}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          )}
        </>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: !marginHorizontal ? 20 : 0,
          marginBottom: 10,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </View>
  );
}

export default AppBackground;
