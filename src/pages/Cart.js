import {View, Text, FlatList} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';
import {useStyle} from '../utils/styleSheet';
import {useSelector} from 'react-redux';
import CartCard from '../Component/Card/CartCard';
import {arrayLength, container, productSeparate} from '../utils/helperFunction';
import PriceCard from '../Component/Card/PriceCard';
import RedBtn from '../Component/Card/RedBtn';

const Cart = () => {
  const appColor = appColors();
  const {commenStyle} = useStyle();
  const {cart, subTotal} = useSelector(state => state.cart);
  return (
    <View style={{flex: 1}}>
      {arrayLength(cart) ? (
        <>
          <FlatList
            data={cart}
            contentContainerStyle={{padding: container}}
            ItemSeparatorComponent={() => {
              return <View style={{padding: container / 2}} />;
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return <CartCard key={item.id} item={item} />;
            }}
          />
          {/* total amount */}
          {subTotal && subTotal > 0 && (
            <View
              style={[
                commenStyle.hFlex,
                commenStyle.shadow,
                {
                  justifyContent: 'space-between',
                  padding: container,
                  backgroundColor: appColor.white,
                },
              ]}>
              {/* subtotal */}
              <View style={[{paddingLeft: container}]}>
                <Text
                  style={[
                    commenStyle.para,
                    {
                      textTransform: 'uppercase',
                      color: appColor.Textlightblack,
                      fontWeight: '600',
                    },
                  ]}>
                  total
                </Text>
                <PriceCard
                  price={subTotal}
                  altStyle={{color: appColor.Textlightblack}}
                />
              </View>
              {/* checkout btn */}
              <RedBtn
                title="Checkout"
                altStyle={{
                  paddingHorizontal: 3 * container,
                  elevation: 5,
                  shadowColor: appColor.themeRed,
                  borderRadius: 7,
                }}
              />
            </View>
          )}
        </>
      ) : (
        <View style={[commenStyle.colCenter, commenStyle.rootPage]}>
          <Text style={[commenStyle.title]}>Cart is Empty</Text>
        </View>
      )}
    </View>
  );
};

export default Cart;
