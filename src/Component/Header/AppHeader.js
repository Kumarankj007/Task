import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import {
  container,
  fontScalling,
  HeaderContainer,
} from '../../utils/helperFunction';
import {useStyle} from '../../utils/styleSheet';
import {Icon} from '../../utils/icon';
import {useNavigation} from '@react-navigation/native';
import { url } from '../../utils/appApi';

const AppHeader = ({Title = '', Home = false, Cart = false, search = true}) => {
  const appColor = appColors();
  const {commenStyle} = useStyle();
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: appColor.themeRed,
        padding: HeaderContainer,
        paddingBottom: container,
        width: '100%',
      }}>
      <View style={[commenStyle.rowCenter, {justifyContent: 'space-between'}]}>
        {/* left Icons */}
        <View style={[commenStyle.hFlex, {width: '20%'}]}>
          {Home ? (
            <Icon
              ComponentName={'FontAwesome'}
              name={'bars'}
              size={fontScalling(2)}
              color={appColor.white}
              onPress={() => navigation.openDrawer()}
            />
          ) : (
            <Icon
              ComponentName={'MaterialIcons'}
              name={'arrow-back'}
              size={fontScalling(2.6)}
              color={appColor.white}
              onPress={() => navigation.goBack()}
            />
          )}
        </View>
        {/* header Title */}
        {Title && Title.length > 0 && (
          <View style={[commenStyle.rowCenter, {width: '60%'}]}>
            {Home && (
              <Image
                source={{
                  uri: url().logo,
                }}
                style={{
                  aspectRatio: 1,
                  height: 50,
                  marginRight: -fontScalling(1),
                }}
              />
            )}
            <Text
              style={[
                commenStyle.textCenter,
                commenStyle.title,
                {color: appColor.white},
              ]}>
              {Title}
            </Text>
          </View>
        )}
        {/* right Icons */}
        <View
          style={[
            commenStyle.hFlex,
            {width: '20%', justifyContent: 'flex-end'},
          ]}>
          {Home ? (
            <Icon
              ComponentName={'FontAwesome'}
              name={'bell'}
              size={fontScalling(2.3)}
              color={appColor.white}
              onPress={() => navigation.navigate('notifi')}
            />
          ) : (
            !Cart && (
              <>
                {search && (
                  <Icon
                    ComponentName={'Fontisto'}
                    name={'search'}
                    size={fontScalling(2.2)}
                    color={appColor.white}
                    onPress={() =>
                      navigation.navigate('main', {
                        screen: 'BottomTab',
                        params: {
                          screen: 'Search',
                          params: {
                            screen: 'search',
                          },
                        },
                      })
                    }
                  />
                )}
                <Icon
                  ComponentName={'Entypo'}
                  name={'shopping-cart'}
                  size={fontScalling(2.4)}
                  color={appColor.white}
                  altStyle={{marginLeft: 15}}
                  onPress={() =>
                    navigation.navigate('main', {
                      screen: 'BottomTab',
                      params: {
                        screen: 'Cart',
                        params: {
                          screen: 'cart',
                        },
                      },
                    })
                  }
                />
              </>
            )
          )}
        </View>
      </View>
    </View>
  );
};

export default AppHeader;
