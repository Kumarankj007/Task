import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  arrayLength,
  container,
  currencyConvertor,
  isOdd,
  numCols,
  print,
  productSeparate,
  productWidth,
} from '../../utils/helperFunction';
import appColors from '../../utils/appColors';
import {useStyle} from '../../utils/styleSheet';
import {url} from '../../utils/appApi';
import PriceCard from './PriceCard';

const ProductCard = ({
  item = {},
  similar = false,
  index = 0,
  onPress = () => {},
}) => {
  const appColor = appColors();
  const {commenStyle} = useStyle();
  // print(item);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        commenStyle.colCenter,
        {
          width: productWidth,
          justifyContent: 'space-between',
          padding: 10,
          borderRightWidth: (index + 1) % numCols == 0 ? 0 : productSeparate,
          borderColor: appColor.overlayBgCorousel,
        },
      ]}>
      {/* image */}
      <View style={{width: '80%', aspectRatio: 1, marginBottom: container}}>
        <Image
          style={{width: '100%', aspectRatio: 1}}
          source={{
            uri: similar ? item.image[0] : url().productImg + item.image,
          }}
        />
        {arrayLength(item?.storage) && (
          <Text
            style={[
              commenStyle.sideHead,
              commenStyle.shadow,
              {
                position: 'absolute',
                bottom: '10%',
                right: '-15%',
                textAlign: 'right',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 5,
                backgroundColor: appColor.white,
                color: appColor.themeRed,
                fontWeight: '500',
              },
            ]}>
            {item?.storage}
          </Text>
        )}
      </View>
      {/* name */}
      {arrayLength(item?.name) && (
        <Text
          style={[
            commenStyle.sideHead,
            commenStyle.textCenter,
            {color: appColor.textGrey, fontWeight: '400'},
          ]}>
          {item?.name}
        </Text>
      )}
      {/* price */}
      {item?.price && (
        <PriceCard 
        altStyle={{textAlign: 'center'}} price={item?.price}/>
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;
