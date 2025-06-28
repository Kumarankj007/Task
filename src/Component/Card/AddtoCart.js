import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import {useStyle} from '../../utils/styleSheet';
import {
  container,
  fontScalling,
  objectLength,
  print,
} from '../../utils/helperFunction';
import PriceCard from './PriceCard';
import {Icon} from '../../utils/icon';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAddToCart,
  setDecrement,
  setIncrement,
  setRemoveCart,
} from '../../redux/CartSlice';
import RedBtn from './RedBtn';
import { hapticFeedSound } from './HaticFeedSound';

const AddtoCart = ({item = {}, product = false, altStyle = {}}) => {
  const appColor = appColors();
  const {commenStyle} = useStyle();
  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cart);
  const cartItem = cart.find(data => data.id == item.id);

  // increment and decrement button:
  const BtnCard = ({name = '', onPress = () => {}}) => {
    return (
      <TouchableOpacity
        style={[
          commenStyle.colCenter,
          {
            width: 3 * container,
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: appColor.TextInputborderbg,
          },
        ]}
        onPress={onPress}>
        <Text style={[commenStyle.title, commenStyle.textCenter]}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        {borderTopWidth: product ? 1 : 0, borderColor: appColor.borderColor},
        altStyle,
      ]}>
      {!cartItem ? (
        <RedBtn
          title="Add to Cart"
          onPress={() => {
            hapticFeedSound('success.mp3');
            dispatch(setAddToCart({...item, quantity: 1}));
          }}
        />
      ) : (
        objectLength(cartItem) && (
          <View style={[commenStyle.rowCenter, {padding: container}]}>
            <PriceCard
              altStyle={{width: '50%'}}
              price={cartItem.price * cartItem.quantity}
            />
            {/* handle cart */}
            <View
              style={[
                commenStyle.rowCenter,
                {width: '50%', justifyContent: 'flex-end'},
              ]}>
              <Icon
                ComponentName={'EvilIcons'}
                name={'trash'}
                size={fontScalling(3.3)}
                color={appColor.black}
                onPress={() => {
                  hapticFeedSound('error.mp3');
                  dispatch(setRemoveCart({...item}));
                }}
              />
              <View style={[commenStyle.hFlex, {marginLeft: 3 * container}]}>
                <BtnCard
                  name="-"
                  onPress={() => {
                    dispatch(setDecrement({...item}));
                  }}
                />
                {cartItem.quantity && (
                  <Text
                    style={[commenStyle.title, {marginHorizontal: container}]}>
                    {cartItem.quantity}
                  </Text>
                )}
                <BtnCard
                  name="+"
                  onPress={() => {
                    dispatch(setIncrement({...item}));
                  }}
                />
              </View>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default AddtoCart;
