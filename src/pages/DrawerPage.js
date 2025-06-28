import { View, Text } from 'react-native'
import React from 'react'
import { useStyle } from '../utils/styleSheet';

const DrawerPage = () => {
  const {commenStyle} = useStyle();
  return (
    <View style={[commenStyle.rootPage, commenStyle.colCenter]}>
      <Text style={[commenStyle.title, commenStyle.textCenter]}>
      DrawerPage
      </Text>
    </View>
  )
}

export default DrawerPage