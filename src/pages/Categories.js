import {View, Text} from 'react-native';
import React from 'react';
import {useStyle} from '../utils/styleSheet';

const Categories = () => {
  const {commenStyle} = useStyle();
  return (
    <View style={[commenStyle.rootPage, commenStyle.colCenter]}>
      <Text style={[commenStyle.title, commenStyle.textCenter]}>
        Categories
      </Text>
    </View>
  );
};

export default Categories;
