import {StyleSheet} from 'react-native';
import {fontScalling} from './helperFunction';
import appColors from './appColors';

export const useStyle = () => {
  const appColor = appColors();
  const commenStyle = StyleSheet.create({
    whiteCard: {
      backgroundColor: 'white',
      elevation: 10,
      borderRadius: 13,
    },
    hFlex: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cFlex: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rootPage: {
      flex: 1,
      backgroundColor: appColor.white,
    },
    title: {
      fontSize: fontScalling(2),
      fontWeight: '600',
      color: appColor.black,
    },
    para: {
      fontSize: fontScalling(1.3),
      color: appColor.black,
    },
    sideHead: {
      fontSize: fontScalling(1.5),
      color: appColor.black,
    },
    categoryTitle:{
      fontSize: fontScalling(1.7),
      color: appColor.black,
    },
    textCenter: {
      textAlign: 'center',
    },
    shadow: {
      elevation: 10,
      shadowColor: appColor.black,
    },
    error: {
      color: appColor.formError,
      fontSize: fontScalling(1.45),
    },
  });
  return {commenStyle};
};
