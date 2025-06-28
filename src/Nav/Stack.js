import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import MainStack from './MainStack';
import Notification from '../pages/Notification';
import Home from '../pages/Home';
import Product from '../pages/Product';
import AppHeader from '../Component/Header/AppHeader';
import Search from '../pages/Search';
import Categories from '../pages/Categories';
import Cart from '../pages/Cart';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const navAnimation = CardStyleInterpolators.forFadeFromCenter;

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolators: navAnimation,
      }}>
      <Stack.Screen name="main" component={MainStack} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          header: ({options}) => {
            return <AppHeader Title={options.title} Cart />;
          },
        }}>
        <Stack.Screen
          name="notifi"
          options={{title: 'Notification'}}
          component={Notification}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({options}) => {
          return <AppHeader Title={options.title} />;
        },
        // cardStyleInterpolators: navAnimation,
      }}>
      <Stack.Group
        screenOptions={{
          header: ({options}) => {
            return <AppHeader  Home Title={options.title} />;
          },
        }}>
        <Stack.Screen
          name="home"
          options={{title: 'هواتف عمان \nOMAN PHONE'}}
          component={Home}
        />
      </Stack.Group>
      <Stack.Screen
        name="product"
        options={{title: 'Item Details'}}
        component={Product}
      />
    </Stack.Navigator>
  );
};

export const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({options}) => {
          return <AppHeader Title={options.title} search={false} />;
        },
        cardStyleInterpolators: navAnimation,
      }}>
      <Stack.Screen
        name="search"
        options={{title: 'Search'}}
        component={Search}
      />
    </Stack.Navigator>
  );
};
export const CategoriesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({options}) => {
          return <AppHeader Title={options.title} />;
        },
        cardStyleInterpolators: navAnimation,
      }}>
      <Stack.Screen
        name="categories"
        options={{title: 'Categories'}}
        component={Categories}
      />
    </Stack.Navigator>
  );
};
export const CartStack = () => {
  const {cart} = useSelector(state => state.cart);
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({options}) => {
          return <AppHeader Cart Title={options.title} />;
        },
        cardStyleInterpolators: navAnimation,
      }}>
      <Stack.Screen name="cart" options={{title: `My Cart (${cart.length})`}} component={Cart} />
    </Stack.Navigator>
  );
};
