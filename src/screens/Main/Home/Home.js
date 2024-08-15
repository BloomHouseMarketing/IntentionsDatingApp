import React, {useCallback} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AppBackground from '../../../components/AppBackground';
import NavService from '../../../helpers/NavService';
import {homeData} from '../../../utils/dummyData';
import Card from '../../../components/Card';

const {width} = Dimensions.get('screen');

export default function Home() {
  useFocusEffect(
    useCallback(() => {
      // NavService.closeDrawer();
    }, []),
  );
  return (
    <AppBackground menu title={'HOME'} notification marginHorizontal={false}>
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, paddingBottom: width * 0.265 + 10}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={homeData}
        renderItem={({item}) => <Card item={item} />}
      />
    </AppBackground>
  );
}
