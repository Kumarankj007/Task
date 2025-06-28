import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStyle} from '../utils/styleSheet';
import appColors from '../utils/appColors';
import {Icon} from '../utils/icon';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {url} from '../utils/appApi';
import SideHeading from '../Component/Card/SideHeading';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../Component/Card/ProductCard';
import Slider from '../Component/Card/Slider';
import {
  arrayLength,
  bannerRaio,
  container,
  fontScalling,
  numCols,
  objectLength,
  print,
  productSeparate,
} from '../utils/helperFunction';
import Loader from '../Component/Card/Loader';

export default function Home() {
  const {commenStyle} = useStyle();
  const appColor = appColors();
  const navigation = useNavigation();

  const [carousel, setCarousel] = useState([]);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState({
    carousel: false,
    products: false,
  });

  // initial call:
  useEffect(() => {
    carouselApi();
    productApi();
  }, []);

  // refresh call:
  useEffect(() => {
    if (refresh) {
      carouselApi();
      productApi();
    }
  }, [refresh]);

  const onRefresh = () => {
    setRefresh(true);
  };

  const carouselApi = async () => {
    try {
      // loading enable:
      if (Object.keys(carousel).length == 0) {
        setLoad({...load, carousel: true});
      }
      // get the response:
      const response = await fetch(url().carousel);
      if (response.status == 200) {
        const resparse = await response.json();
        if (resparse.status == 'success') {
          // print(resparse, 'resparse');
          if (arrayLength(resparse?.data?.slider)) {
            setCarousel(resparse?.data?.slider);
          }
        }
      } else {
        print(response.status, 'status in carousel screen');
      }
      setLoad({...load, carousel: false});
      setRefresh(false);
    } catch (e) {
      console.log(e, 'error in carousel screen');
      setLoad({...load, carousel: false});
      setRefresh(false);
    }
  };

  const productApi = async () => {
    try {
      // loading enable:
      if (Object.keys(products).length == 0) {
        setLoad({...load, products: true});
      }
      // get the response:
      const response = await fetch(url().products);
      if (response.status == 200) {
        const resparse = await response.json();
        if (arrayLength(resparse)) {
          // print(resparse, 'resparse');
          setProducts(resparse);
        }
      } else {
        print(response.status, 'status in products screen');
      }
      setLoad({...load, products: false});
      setRefresh(false);
    } catch (e) {
      console.log(e, 'error in products screen');
      setLoad({...load, products: false});
      setRefresh(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Searchbar */}
      <View
        style={{
          backgroundColor: appColor.themeRed,
          padding: container,
          paddingTop: 0,
        }}>
        <View
          style={[
            commenStyle.rowCenter,
            commenStyle.shadow,
            {
              backgroundColor: appColor.white,
              borderRadius: 10,
              paddingHorizontal: 20,
            },
          ]}>
          <Icon
            ComponentName={'Fontisto'}
            name={'search'}
            size={fontScalling(2)}
            color={appColor.boldBlacktext}
          />
          <View style={[commenStyle.rootPage]}>
            <TextInput
              placeholder="Search Product ..."
              style={{
                marginHorizontal: 10,
                color: appColor.boldBlacktext,
              }}
            />
          </View>
        </View>
      </View>
      {/* Main block */}
      {!load.carousel && !load.products ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={[appColor.themeRed]}
              tintColor={appColor.themeRed}
            />
          }
          showsVerticalScrollIndicator={false}>
          {/* Carousel */}
          <View style={{marginBottom: container}}>
            <Slider carousel={carousel} />
          </View>
          {/* product list */}
          {arrayLength(products) && (
            <FlatList
              data={products}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={{width: container, aspectRatio: 1}} />;
              }}
              renderItem={({item}) => {
                return (
                  <View key={item.id}>
                    {/* products */}
                    {item.type == 'productlist' &&
                      arrayLength(item?.data?.items) && (
                        <View style={{backgroundColor: appColor.white}}>
                          {arrayLength(item?.data?.title) && (
                            <SideHeading
                              title={item?.data?.title}
                              // onPress={() => navigation.navigate('product')}
                            />
                          )}
                          {arrayLength(item?.data?.items) && (
                            <FlatList
                              scrollEnabled={false}
                              data={item?.data?.items}
                              numColumns={numCols}
                              ItemSeparatorComponent={() => {
                                return (
                                  <View
                                    style={{
                                      backgroundColor:
                                        appColor.overlayBgCorousel,
                                      width: '100%',
                                      height: productSeparate,
                                    }}
                                  />
                                );
                              }}
                              showsVerticalScrollIndicator={false}
                              renderItem={data => {
                                if (objectLength(data.item)) {
                                  return (
                                    <ProductCard
                                      key={data.item.id}
                                      item={data.item}
                                      index={data.index}
                                      onPress={() => {
                                        navigation.navigate('product', {
                                          id: data?.item?.id,
                                          price: data?.item?.price,
                                        });
                                      }}
                                    />
                                  );
                                }
                              }}
                            />
                          )}
                        </View>
                      )}
                    {/* banner */}
                    {item.type == 'banner' && arrayLength(item.data.file) && (
                      <View style={{padding: container}}>
                        <Image
                          source={{uri: item.data.file}}
                          style={{width: '100%', aspectRatio: bannerRaio}}
                        />
                      </View>
                    )}
                  </View>
                );
              }}
            />
          )}
        </ScrollView>
      ) : (
        <Loader onRefresh={onRefresh} refresh={refresh} />
      )}
    </View>
  );
}
