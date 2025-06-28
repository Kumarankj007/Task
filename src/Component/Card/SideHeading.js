import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {container} from '../../utils/helperFunction';
import {useStyle} from '../../utils/styleSheet';
import appColors from '../../utils/appColors';

const SideHeading = ({title = '', onPress = () => {}}) => {
  const {commenStyle} = useStyle();
  const appColor = appColors();
  return (
    <View style={[commenStyle.rowCenter, {padding: container}]}>
      <Text
        style={[
          commenStyle.categoryTitle,
          {color: appColor.boldBlacktext, flex: 1, fontWeight: '700'},
        ]}>
        {title}
      </Text>
      {/* View all button */}
      <TouchableOpacity
        onPress={onPress}
        style={[
          commenStyle.shadow,
          {
            backgroundColor: appColor.themeRed,
            borderRadius: 5,
            padding: 8,
            paddingHorizontal: 13,
          },
        ]}>
        <Text
          style={[
            commenStyle.para,
            {
              fontWeight: '500',
              textTransform: 'uppercase',
              color: appColor.white,
            },
          ]}>
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SideHeading;
