import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {AuthStack} from './src/Nav/Stack';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <AuthStack />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
