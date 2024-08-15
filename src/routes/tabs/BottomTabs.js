import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/TabbarComponent';
import Home from '../../screens/Main/Home';
import {HP, colors, platform} from '../../utils';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: colors.gray},
        animation: 'simple_push',
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={'Home'}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="CategoryStack" component={Home} />
      <Tab.Screen name="tabBar4" component={Home} />
      <Tab.Screen name="GroupStack" component={Home} />
      <Tab.Screen name="CheckOutfitStack" component={Home} />
    </Tab.Navigator>
  );
};
