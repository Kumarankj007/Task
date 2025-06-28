import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {AuthStack} from './src/Nav/Stack';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {setCart} from './src/redux/CartSlice';

export default function App() {
  const dispatch = useDispatch();
  const {cart, subTotal} = useSelector(state => state.cart);

  useEffect(() => {
    // dispatch(setCart([]));
  }, []);
  
  useEffect(() => {
    // console.log(cart, 'cart', subTotal);
  }, [cart, subTotal]);
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <AuthStack />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
