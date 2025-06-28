import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {url} from '../utils/appApi';
import {
  arrayLength,
  container,
  currencyConvertor,
  fontScalling,
  numCols,
  objectLength,
  print,
  productSeparate,
  specWidth,
} from '../utils/helperFunction';
import {useStyle} from '../utils/styleSheet';
import appColors from '../utils/appColors';
import Slider from '../Component/Card/Slider';
import Loader from '../Component/Card/Loader';
import {Icon} from '../utils/icon';
import Divider from '../Component/Card/Divider';
import HtmlView from '../Component/Card/RenderHtml';
import ProductCard from '../Component/Card/ProductCard';
import AddtoCart from '../Component/Card/AddtoCart';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setTab} from '../redux/ComSlice';
import PriceCard from '../Component/Card/PriceCard';

const Product = ({route}) => {
  const {id, price} = route?.params && route?.params;
  const {commenStyle} = useStyle();
  const appColor = appColors();
  const scrollRef = useRef(null);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [aboutAxis, setAboutAxis] = useState(0);

  // initial call:
  useEffect(() => {
    apiCall();
  }, []);

  // hide bottomTab
  useEffect(() => {
    if (isFocus) {
      dispatch(setTab(false));
    } else {
      dispatch(setTab(true));
    }
  }, [isFocus]);

  // refresh call:
  useEffect(() => {
    if (refresh) {
      apiCall();
    }
  }, [refresh]);

  const onRefresh = () => {
    setRefresh(true);
  };

  const apiCall = async (prodId = id) => {
    try {
      if (arrayLength(prodId)) {
        // loading enable:
        if (Object.keys(data).length == 0) {
          setLoad(true);
        }

        const params = new URLSearchParams();
        params.append('id', prodId);
        // get the response:
        const response = await fetch(
          `${url().productsDetail}?${params.toString()}`,
        );
        if (response.status == 200) {
          const resparse = await response.json();
          if (objectLength(resparse)) {
            // print((resparse), 'resparse');
            setData(resparse);
          }
        } else {
          print(response.status, 'status in products screen');
        }
        setLoad(false);
        setRefresh(false);
      }
    } catch (e) {
      console.log(e, 'error in products screen');
      setLoad(false);
      setRefresh(false);
    }
  };

  const handleDetail = () => {
    setDetailVisible(true);
    setTimeout(() => {
      scrollRef.current.scrollTo({x: 0, y: aboutAxis});
    }, 500);
  };

  const SideTitle = ({name = ''}) => {
    return (
      arrayLength(name) && (
        <Text
          style={[
            commenStyle.categoryTitle,
            {color: appColor.boldBlacktext, flex: 1, fontWeight: '700'},
          ]}>
          {name}
        </Text>
      )
    );
  };

  return (
    <View style={[commenStyle.rootPage]}>
      {!load ? (
        objectLength(data) && (
          <>
            <ScrollView
              ref={scrollRef}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={onRefresh}
                  colors={[appColor.themeRed]}
                  tintColor={appColor.themeRed}
                />
              }
              showsVerticalScrollIndicator={false}>
              {/* slider block */}
              <View style={{padding: 1}}>
                {arrayLength(data?.image) && (
                  <Slider
                    detail
                    carousel={data?.image}
                    baseRatio={1}
                    aspectRatio={1}
                    dots
                  />
                )}
                {/* favourite */}
                <Icon
                  ComponentName={'AntDesign'}
                  name={'heart'}
                  size={fontScalling(2.5)}
                  altStyle={{position: 'absolute', top: 20, right: 20}}
                  color={appColor.TextInputborderbg}
                />
              </View>
              {/* detail Block */}
              <View
                style={{
                  paddingHorizontal: container,
                  marginVertical: container + 5,
                }}>
                {/* name */}
                {arrayLength(data?.name) && (
                  <Text
                    style={[
                      commenStyle.categoryTitle,
                      {color: appColor.boldBlacktext, fontWeight: '500'},
                    ]}>
                    {data?.name}
                  </Text>
                )}
                {/* price */}
                {price && <PriceCard price={price} />}
                {/* specification */}
                {((data?.attrs?.color && arrayLength(data?.attrs?.color)) ||
                  (data?.attrs && arrayLength(data?.attrs))) && (
                  <View style={{marginTop: container}}>
                    {/* head */}
                    {data?.attrs?.color && arrayLength(data?.attrs?.color) && (
                      <View
                        style={[
                          commenStyle.hFlex,
                          {
                            width: '100%',
                            backgroundColor: appColor.TextInputborderbg,
                            paddingHorizontal: container + 10,
                            paddingVertical: 5,
                          },
                        ]}>
                        <Text style={[commenStyle.sideHead]}>color</Text>
                        {/* color image */}
                        <Image
                          source={{uri: data?.attrs?.color}}
                          style={{
                            width: 25,
                            marginLeft: 20,
                            aspectRatio: 1,
                          }}
                        />
                      </View>
                    )}
                    {/* attrs */}
                    {data?.attrs && arrayLength(data?.attrs?.specs) && (
                      <View
                        style={[
                          commenStyle.hFlex,
                          {flexWrap: 'wrap', backgroundColor: appColor.cardbg},
                        ]}>
                        {data?.attrs?.specs?.map((item, i) => {
                          return (
                            item && (
                              <View
                                key={i}
                                style={[
                                  commenStyle.colCenter,
                                  {width: specWidth, marginVertical: container},
                                ]}>
                                {arrayLength(item?.icon) && (
                                  <Image
                                    source={{uri: item?.icon}}
                                    style={{
                                      width: '25%',
                                      aspectRatio: 1,
                                      marginBlock: 5,
                                    }}
                                  />
                                )}
                                {arrayLength(item?.value) && (
                                  <Text style={[commenStyle.para]}>
                                    {item?.value}
                                  </Text>
                                )}
                              </View>
                            )
                          );
                        })}
                      </View>
                    )}
                  </View>
                )}
              </View>
              <Divider />
              {/* About Product */}
              {(arrayLength(data?.description) ||
                arrayLength(data?.short_description)) && (
                <View
                  onLayout={({nativeEvent}) => {
                    setAboutAxis(nativeEvent?.layout?.y);
                  }}
                  style={{
                    padding: container,
                  }}>
                  <SideTitle name="About Product" />
                  {detailVisible ? (
                    <>
                      {arrayLength(data?.description) && (
                        <HtmlView url={data?.description} />
                      )}
                      {arrayLength(data?.short_description) && (
                        <HtmlView url={data?.short_description} />
                      )}
                    </>
                  ) : (
                    <TouchableOpacity
                      style={{marginVertical: container}}
                      onPress={handleDetail}>
                      <Text
                        style={[
                          commenStyle.sideHead,
                          commenStyle.textCenter,
                          {color: appColor.themeRed, fontWeight: '500'},
                        ]}>
                        View details ...
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {(arrayLength(data?.description) ||
                arrayLength(data?.short_description)) &&
                arrayLength(data?.option_prices) && <Divider />}
              {/* similar */}
              {arrayLength(data?.option_prices) && (
                <View
                  style={{
                    padding: container,
                  }}>
                  <SideTitle name="Similar Products" />
                  <FlatList
                    scrollEnabled={false}
                    data={data?.option_prices}
                    numColumns={numCols}
                    ItemSeparatorComponent={() => {
                      return (
                        <View
                          style={{
                            backgroundColor: appColor.overlayBgCorousel,
                            width: '100%',
                            height: productSeparate,
                          }}
                        />
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={data => {
                      if (objectLength(data?.item)) {
                        return (
                          <ProductCard
                            key={data?.index}
                            similar
                            item={data?.item}
                            index={data?.index}
                            onPress={() => {
                              apiCall(data?.item?.id);
                              setTimeout(() => {
                                scrollRef.current.scrollTo({x: 0, y: 0});
                              }, 500);
                            }}
                          />
                        );
                      }
                    }}
                  />
                </View>
              )}
            </ScrollView>
            {/* Cart btn */}
            {data?.id && (
              <AddtoCart
                product
                item={{
                  id: data?.id,
                  name: data?.name,
                  image: data?.image[0],
                  price: price,
                }}
              />
            )}
          </>
        )
      ) : (
        <Loader onRefresh={onRefresh} refresh={refresh} />
      )}
    </View>
  );
};

export default Product;
