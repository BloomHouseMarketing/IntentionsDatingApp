import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import NavService from '../helpers/NavService';
import CustomButton from './CustomButton';
import Shadows from '../helpers/Shadows';
import {colors} from '../utils';
import {appIcons, appImages} from '../assets';

const {width} = Dimensions.get('screen');
export default class TabBar extends React.Component {
  state = {
    isVisible: false,
  };
  render() {
    const {isVisible} = this.state;
    const {state, navigation} = this.props;
    const togglePopUp = () => {
      this.setState({isVisible: !isVisible});
    };
    const navigateFromPopUp = nav => {
      togglePopUp();
      NavService.navigate(nav);
    };

    return (
      <ImageBackground
        source={appImages.tabbar}
        style={{
          width: width,
          height: width * 0.265,
          position: 'absolute',
          bottom: 0,
          justifyContent: 'flex-end',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 5,
        }}
        imageStyle={{
          width: width,
          height: width * 0.265,
        }}>
        <Modal
          isVisible={isVisible}
          onBackButtonPress={togglePopUp}
          onBackdropPress={togglePopUp}
          backdropOpacity={0.6}>
          <View style={styles.mainContainer}>
            <View style={styles.buttonWrapper}>
              <CustomButton
                title="CREATE POST"
                onPress={() => navigateFromPopUp('CreatePost')}
                buttonStyle={styles.buttonStyle}
                textStyle={{fontSize: 16}}
              />
              <CustomButton
                title="SCAN A SHOE"
                onPress={() => navigateFromPopUp('ScanQR')}
                buttonStyle={[styles.buttonStyle, styles.buttonPerfectionNext]}
                textStyle={{fontSize: 16}}
              />
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            overflow: 'hidden',
            justifyContent: 'space-around',
          }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              if (route.name === 'Home')
                navigation.navigate('BottomTabs', {screen: 'Home'});
              if (route.name === 'CategoryStack')
                navigation.navigate('CategoryStack', {screen: 'Category'});
              if (route.name === 'GroupStack')
                navigation.navigate('GroupStack', {screen: 'Group'});
              if (route.name === 'CheckOutfitStack')
                navigation.navigate('CheckOutfitStack', {
                  screen: 'CheckOutfit',
                });
            };

            let imageSrc = appIcons.homeUnSelected;
            if (route.name === 'Home') imageSrc = appIcons.homeUnSelected;
            if (route.name === 'CategoryStack') imageSrc = appIcons.categories;
            if (route.name === 'GroupStack')
              imageSrc = appIcons.groupUnSelected;
            if (route.name === 'CheckOutfitStack')
              imageSrc = appIcons.checkOutfitSelected;

            if (route.name === 'tabBar4') {
              return <View key={index + 1} style={styles.tabs} />;
            }
            return (
              <TouchableOpacity
                key={index + 1}
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityRole="button"
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.tabs}>
                <Image
                  source={imageSrc}
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: isFocused ? colors.primary : colors.gray,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => togglePopUp()}
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: 30 / 2,
            backgroundColor: colors.primary,
            alignSelf: 'center',
            bottom: 45,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <Image
            source={appIcons.plus}
            style={{
              height: 25,
              width: 25,
              tintColor: colors.white,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: width * 0.4,
    borderRadius: 10,
  },
  buttonPerfectionNext: {
    backgroundColor: colors.secondary,
    marginLeft: 15,
  },
  tabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 5,
    height: 65,
  },
});
