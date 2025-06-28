import {
  BASE_URL,
  CONTROLLER,
  BANNERS,
  PRODUCT,
  PRODUCT_DETAIL,
  MEDIA,
  LOGO,
  PRODUCT_IMG,
} from '@env';

const baseUrl = BASE_URL;

const baseURL = BASE_URL + CONTROLLER;

console.log(baseURL, 'url')

export const url = () => ({
  //   url
  carousel: baseURL + BANNERS,
  products: baseURL + PRODUCT,
  productsDetail: baseURL + PRODUCT_DETAIL,
  logo: baseURL + MEDIA + LOGO,
  productImg: BASE_URL + PRODUCT_IMG,
});
