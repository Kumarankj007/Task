import React, {useEffect} from 'react';
// file import:
import BottomTab from './BottomTab';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {scrnWidth} from '../utils/helperFunction';
import DrawerPage from '../pages/DrawerPage';

const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'left',
          headerShown: false,
          drawerStatusBarAnimation: 'slide',
          swipeEdgeWidth: 20,
          drawerType: 'front',
          drawerStyle: {
            width: scrnWidth / 1.5,
            maxWidth: 400
          },
        }}
        drawerContent={DrawerPage}>
        <Drawer.Screen name="BottomTab" component={BottomTab} />
      </Drawer.Navigator>
    </>
  );
};

export default MainStack;
