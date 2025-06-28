import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {arrayLength, container} from '../../utils/helperFunction';
import appColors from '../../utils/appColors';
import {useStyle} from '../../utils/styleSheet';

const RedBtn = ({title = '', altStyle = {}, onPress = () => {}}) => {
  const appColor = appColors();
  const {commenStyle} = useStyle();
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: appColor.themeRed,
          padding: 5 + container,
          ...altStyle,
        }}>
        {arrayLength(title) && (
          <Text
            style={[
              commenStyle.sideHead,
              commenStyle.textCenter,
              {
                color: appColor.white,
                textTransform: 'uppercase',
                fontWeight: '500',
              },
            ]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RedBtn;
