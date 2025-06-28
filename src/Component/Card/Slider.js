import Carousel from 'react-native-reanimated-carousel';
import {arrayLength, bannerRaio, scrnWidth} from '../../utils/helperFunction';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useRef, useState} from 'react';
import appColors from '../../utils/appColors';
import {useStyle} from '../../utils/styleSheet';

const Slider = ({
  carousel = [],
  detail = false,
  aspectRatio = bannerRaio,
  baseRatio = 0.58,
  dots = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const appColor = appColors();
  const {commenStyle} = useStyle();

  const renderDot = index => (
    <TouchableOpacity
      key={index}
      style={[
        styles.dot,
        index === activeIndex
          ? {backgroundColor: appColor.themeRed}
          : {backgroundColor: appColor.TextInputborderbg},
      ]}
      onPress={() => {
        carouselRef.current?.scrollTo({index, animated: true});
      }}
    />
  );
  return (
    arrayLength(carousel) && (
      <View>
        <Carousel
          ref={carouselRef}
          loop={true}
          width={scrnWidth}
          height={scrnWidth * baseRatio}
          onConfigurePanGesture={gestureChain => {
            gestureChain.activeOffsetX([-10, 10]);
          }}
          autoPlay={true}
          scrollAnimationDuration={1000}
          autoPlayInterval={2000}
          data={carousel}
          onSnapToItem={index => {
            setActiveIndex(index);
          }}
          pagingEnabled={true}
          renderItem={({item, index}) => {
            return (
              <Image
                source={{uri: detail ? item : item.image}}
                style={{width: '100%', aspectRatio: aspectRatio}}
              />
            );
          }}
        />
        {dots && (
          <View style={[commenStyle.cFlex, styles.paginationContainer]}>
            {carousel.map((_, index) => renderDot(index))}
          </View>
        )}
      </View>
    )
  );
};

export default Slider;

const styles = StyleSheet.create({
  paginationContainer: {
    marginTop: 10,
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
  },
  dot: {
    width: 10,
    aspectRatio:1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
