import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CartStack, CategoriesStack, HomeStack, SearchStack} from './Stack';
import appColors from '../utils/appColors';
import {Icon} from '../utils/icon';
import {fontScalling} from '../utils/helperFunction';
import {useStyle} from '../utils/styleSheet';
import KeyboardVisible from '../Hooks/KeyboardVisible';
import { useSelector } from 'react-redux';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const appColor = appColors();
  const {commenStyle} = useStyle();
  const {bottomTab} = useSelector(state => state.commen)

  const keyboardVisible = KeyboardVisible();
  return (
    !keyboardVisible && bottomTab && (
      <View
        style={[
          commenStyle.rowCenter,
          commenStyle.shadow,
          {
            backgroundColor: appColor.white,
          },
        ]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                commenStyle.colCenter,
                {
                  flex: 1,
                  paddingVertical: 10,
                },
              ]}>
              <Icon
                ComponentName={
                  route.name == 'Home'
                    ? 'FontAwesome'
                    : route.name == 'Search'
                    ? 'Fontisto'
                    : route.name == 'Categories'
                    ? 'MaterialCommunityIcons'
                    : 'EvilIcons'
                }
                name={
                  route.name == 'Home'
                    ? 'home'
                    : route.name == 'Search'
                    ? 'search'
                    : route.name == 'Categories'
                    ? 'dots-grid'
                    : 'cart'
                }
                color={isFocused ? appColor.themeRed : appColor.boldBlacktext}
                size={fontScalling(
                  route.name == 'Search'
                    ? 2.2
                    : route.name == 'Cart'
                    ? 2.9
                    : 2.5,
                )}
              />
              <Text
                style={[
                  commenStyle.sideHead,
                  commenStyle.textCenter,
                  {
                    fontWeight: isFocused ? 'bold' : '400',
                    color: isFocused
                      ? appColor.themeRed
                      : appColor.boldBlacktext,
                  },
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    )
  );
};
const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBar={props => {
        return <CustomTabBar {...props} />;
      }}
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
      <Tab.Screen name="Home" component={HomeStack} options={{title: 'Home'}} />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{title: 'Search'}}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{title: 'Categories'}}
      />
      <Tab.Screen name="Cart" component={CartStack} options={{title: 'Cart'}} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
