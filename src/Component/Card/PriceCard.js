import {View, Text} from 'react-native';
import React from 'react';
import {useStyle} from '../../utils/styleSheet';
import appColors from '../../utils/appColors';
import {arrayLength, currencyConvertor} from '../../utils/helperFunction';

const PriceCard = ({price = 0, altStyle={}}) => {
  const {commenStyle} = useStyle();
  const appColor = appColors();
  
  return (
    price && (
      <Text
        style={[
          commenStyle.title,
          {color: appColor.themeRed, textAlign: 'left', ...altStyle},
        ]}>
        {currencyConvertor(price, 3)}
      </Text>
    )
  );
};

export default PriceCard;
