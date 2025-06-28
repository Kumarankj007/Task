import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { print } from '../utils/helperFunction';

export default function About() {
  const navigation = useNavigation();
  useEffect(() => {
    apiCall();
  }, []);

  //api call
  const apiCall = async () => {
    try {

      // get the response:
      const response = await fetch(`https://omanphone.smsoman.com/api/productdetails?id=1394`);
      if (response.status == 200) {
        const resparse = await response.json();
        // print(resparse, 'respons')
      } else {
        console.log(response.status, 'status for api call');
      }
    } catch (error) {
      console.log(error, 'Error in api call');
    }
  };
  return (
    <View>
      <Pressable onPress={()=> navigation.navigate('Contact')}> 
      <Text>About</Text>
      </Pressable>
    </View>
  )
}