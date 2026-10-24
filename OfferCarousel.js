import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors, fontFamilies } from '../styles/GlobalStyles';
import { imagesForUI } from '../data/catalog';

const slides = [
  { image: require('../../assets/images/banner-campaign.jpg'), isCampaign: true },
  { image: imagesForUI.watch, eyebrow: 'THE TIMELESS COLLECTION', title: 'Considered pieces for every day', copy: 'A quiet statement, in every detail.' },
  { image: imagesForUI.clothes, eyebrow: 'A WARDROBE WITH INTENTION', title: 'Wear it your way', copy: 'Natural textures, chosen to last.' },
];

export default function OfferCarousel() {
  const scrollRef = useRef(null);
  const currentIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const slideWidth = width - 36;

  useEffect(() => {
    const timer = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % slides.length;
      setActiveIndex(currentIndex.current);
      scrollRef.current?.scrollTo({ x: currentIndex.current * slideWidth, animated: true });
    }, 4200);
    return () => clearInterval(timer);
  }, [slideWidth]);

  function updateIndex(event) {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    currentIndex.current = nextIndex;
    setActiveIndex(nextIndex);
  }

  function selectSlide(index) {
    currentIndex.current = index;
    setActiveIndex(index);
    scrollRef.current?.scrollTo({ x: index * slideWidth, animated: true });
  }

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateIndex}
        onScrollEndDrag={updateIndex}
        style={{ width: slideWidth }}
      >
        {slides.map((slide, index) => (
          <ImageBackground
            key={index}
            source={slide.image}
            resizeMode={slide.isCampaign ? 'cover' : 'cover'}
            style={[styles.slide, { width: slideWidth }]}
            imageStyle={styles.slideImage}
          >
            {!slide.isCampaign ? (
              <View style={styles.overlay}>
                <Text style={styles.slideEyebrow}>{slide.eyebrow}</Text>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideCopy}>{slide.copy}</Text>
              </View>
            ) : null}
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={styles.pagination} accessibilityLabel={`Promotion ${activeIndex + 1} of ${slides.length}`}>
        {slides.map((slide, index) => (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityLabel={`Show promotion ${index + 1}`}
            onPress={() => selectSlide(index)}
            hitSlop={8}
            style={styles.paginationTouchTarget}
          >
            <View style={[styles.paginationDot, activeIndex === index && styles.paginationDotActive]} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: { height: 132, borderRadius: 12, overflow: 'hidden', justifyContent: 'center', backgroundColor: colors.sand },
  slideImage: { borderRadius: 12 },
  pagination: { height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  paginationTouchTarget: { minWidth: 22, minHeight: 22, alignItems: 'center', justifyContent: 'center' },
  paginationDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.border },
  paginationDotActive: { width: 14, backgroundColor: colors.primary },
  overlay: { flex: 1, justifyContent: 'center', paddingHorizontal: 22, backgroundColor: 'rgba(37,31,26,0.28)' },
  slideEyebrow: { color: colors.white, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.2 },
  slideTitle: { color: colors.white, fontFamily: fontFamilies.editorial, fontSize: 27, maxWidth: 230, lineHeight: 28, marginTop: 5 },
  slideCopy: { color: colors.white, fontFamily: fontFamilies.body, fontSize: 10, marginTop: 5 },
});
