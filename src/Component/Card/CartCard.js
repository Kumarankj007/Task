import {View, Text, Image} from 'react-native';
import React from 'react';
import AddtoCart from './AddtoCart';
import appColors from '../../utils/appColors';
import {useStyle} from '../../utils/styleSheet';
import {container} from '../../utils/helperFunction';

const CartCard = ({item}) => {
  const appColor = appColors();
  const {commenStyle} = useStyle();
  return (
    <View
      style={[
        commenStyle.shadow,
        {
          backgroundColor: appColor.white,
          paddingTop: container,
          borderRadius: 5,
        },
      ]}>
      <View
        style={[
          {
            flexDirection: 'row',
            paddingHorizontal: container,
            width: '100%',
            justifyContent: 'space-between',
          },
        ]}>
        <Text
          style={[
            commenStyle.categoryTitle,
            {width: '70%', color: appColor.Textlightblack, fontWeight: '500'},
          ]}>
          {item.name}
        </Text>
        <Image
          style={{width: '20%', aspectRatio: 0.6, objectFit: 'cover'}}
          source={{uri: item.image}}
        />
      </View>
      <AddtoCart item={item} />
    </View>
  );
};

export default CartCard;
