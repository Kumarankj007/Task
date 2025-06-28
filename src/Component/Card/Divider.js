import {View, Text} from 'react-native';
import React from 'react';
import {container, dividerHeight} from '../../utils/helperFunction';
import appColors from '../../utils/appColors';

const Divider = () => {
  const appColor = appColors();
  return (
    <View
      style={{
        width: '100%',
        height: dividerHeight,
        backgroundColor: appColor.TextInputborderbg,
      }}
    />
  );
};

export default Divider;
