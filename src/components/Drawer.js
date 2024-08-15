import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors} from '../utils';
import NavService from '../helpers/NavService';
import {appIcons, appLogos} from '../assets';
import ProfileImage from '../components/ProfileImage';
import {logoutUser} from '../redux/actions/authAction';

const menuItems = [
  {
    icon: appIcons.homeUnSelected,
    title: 'Home',
    nav: 'BottomTabs',
  },
  {
    icon: appIcons.user,
    title: 'Profile',
    nav: 'Profile',
  },
  {
    icon: appIcons.star,
    title: 'Favourites',
    nav: 'Favourites',
  },
  {
    icon: appIcons.termsConditions,
    title: 'Terms & Condition',
    nav: 'PaymentScreen',
    browser: 'https://www.google.com',
  },
  {
    icon: appIcons.info,
    title: 'Privacy Policy',
    nav: 'HelpCenter',
    browser: 'https://www.google.com',
  },
  {
    icon: appIcons.setting,
    title: 'Settings',
    nav: 'Settings',
  },
  {
    icon: appIcons.power,
    title: 'Logout',
    nav: 'logout',
  },
];

class Drawer extends Component {
  render() {
    // const {user} = this.props;
    const RenderItem = ({item, index}) => {
      const {title, icon, nav} = item;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (title === 'Logout') {
              this.props.logoutUser();
            } else if (item?.browser) {
              Linking.openURL(item?.browser);
            } else {
              this.props.navigation.navigate(nav);
            }
          }}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            borderBottomWidth: index == menuItems.length - 1 ? 0 : 0.5,
            borderColor: colors.white,
          }}>
          <View
            style={{
              paddingVertical: 10,
              borderRadius: 7,
              marginBottom: 5,
            }}>
            <Image
              source={icon}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: colors.white,
              }}
            />
          </View>
          <Text
            style={{
              marginLeft: 10,
              color: colors.white,
              fontSize: 16,
            }}>
            {title}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.black,
          alignItems: 'center',
          paddingTop: getStatusBarHeight(),
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            paddingBottom: 40,
            paddingHorizontal: 20,
            position: 'relative',
          }}>
          {/* <TouchableOpacity
            style={{position: 'absolute', top: -20, right: 20, marginTop: 5}}
            onPress={() => NavService.navigate('EditProfile')}
            activeOpacity={0.9}>
            <Image style={{width: 35, height: 30}} source={appIcons.edit} />
          </TouchableOpacity> */}
          <ProfileImage
            size={130}
            innerAsset
            imageUri={appIcons.userPlaceholder}
            name={'test'}
            style={{borderWidth: 2, borderColor: colors.white}}
          />
          <Text
            numberOfLines={1}
            style={{
              color: colors.white,
              fontSize: 24,
              marginLeft: 15,
            }}>
            Username
          </Text>
        </View>
        <View style={{flex: 1, marginTop: 10, width: '100%'}}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={menuItems}
            style={{
              height: '100%',
              paddingHorizontal: 20,
            }}
            renderItem={props => <RenderItem {...props} />}
          />
        </View>
      </View>
    );
  }
}

// function mapState({user: {userData}}) {
//   return {
//     user: userData,
//   };
// }
const actions = {logoutUser};
export default connect(null, actions)(Drawer);
