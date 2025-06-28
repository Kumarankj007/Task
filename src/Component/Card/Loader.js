import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';

const Loader = ({refresh = false, onRefresh = () => {}}) => {
  const appColor = appColors();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
          colors={[appColor.themeRed]}
          tintColor={appColor.themeRed}
        />
      }
      contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={appColor.themeRed} />
    </ScrollView>
  );
};

export default Loader;
