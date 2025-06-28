import {Dimensions} from 'react-native';
import {responsiveFontSize} from './ResponsiveFont';

export const scrnWidth = Dimensions.get('screen').width;
export const scrnHeight = Dimensions.get('screen').height;
export const bottom_Height = scrnWidth < 500 ? 60 : 70;
export const widthResponse = scrnWidth < 500 ? true : false;
export const container = widthResponse ? 10 : 15;
export const HeaderContainer = widthResponse ? 20 : 25;
export const productSeparate = widthResponse ? 1 : 2;
export const numCols = widthResponse ? 2 : 3;
export const bannerRaio = 1.7;

export const productWidth =
  (scrnWidth - 0 * container - (numCols - 1) * productSeparate) / numCols; // product card width

export const specWidth = (scrnWidth - 2 * container) / (numCols + 1); //width of the specification

export const dividerHeight = 5;

// for even number
export const isEven = n => {
  return n % 2 == 0;
};

// for odd number
export const isOdd = n => {
  return Math.abs(n % 2) == 1;
};

// print object formatable:
export const print = (data, str) => {
  console.log(JSON.stringify(data, undefined, 2), str);
};

export const objectLength = (obj = {}) => {
  return obj && Object.keys(obj).length > 0;
};

export const arrayLength = (array = []) => {
  return array && array.length > 0;
};

// first letter caps:
export const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// responsiveFontSize
export const fontScalling = size => {
  if (size > 0) {
    return scrnWidth > 500
      ? responsiveFontSize(size - 0.5)
      : responsiveFontSize(size);
  }
};

//format -> January
export const getsMonth = date => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date(date);
  return monthNames[d.getMonth()];
};

// currency symbol:
export function currencyConvertor(number, fraction = 0) {
  try {
    return new Intl.NumberFormat('en-OM', {
      style: 'currency',
      minimumFractionDigits: fraction,
      currency: 'OMR',
    }).format(number);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return '﷼' + number.toFixed(2);
  }
}

//format -> 04-oktober-2024
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('nl-NL', options); // 'nl-NL' is the code for Dutch (Netherlands)
}

//format -> 04/03/24
export function formatedDate(dateString) {
  const date = new Date(dateString);
  const dates = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = String(date.getFullYear()).slice(2);
  return `${dates}/${month}/${year}`;
}

// reset the navigation:
export const TabReset = (navigation, deletePage = true) => {
  navigation.reset({
    index: 0,
    routes: [{name: 'home'}],
  });
  navigation.reset({
    index: 1,
    routes: [{name: 'cart'}],
  });
  navigation.reset({
    index: 2,
    routes: [{name: 'menu'}],
  });
  navigation.reset({
    index: 3,
    routes: [{name: 'order'}],
  });
  if (deletePage) {
    navigation.reset({
      index: 4,
      routes: [{name: 'profile'}],
    });
  }
};
