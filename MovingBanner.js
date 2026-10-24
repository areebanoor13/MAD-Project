import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilies } from '../styles/GlobalStyles';

const message = '20% OFF on Shopping Above Rs. 1,200  ·  Available Till 20 October';
const itemGap = 34;

export default function MovingBanner() {
  const offset = useRef(new Animated.Value(0)).current;
  const [messageWidth, setMessageWidth] = useState(0);
  const travelDistance = messageWidth + itemGap;

  useEffect(() => {
    if (!travelDistance) return undefined;
    const animation = Animated.loop(
      Animated.timing(offset, {
        toValue: -travelDistance,
        duration: 14500,
        useNativeDriver: true,
        isInteraction: false,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [offset, travelDistance]);

  return (
    <View
      accessibilityLabel={message}
      accessibilityRole="text"
      style={styles.viewport}
    >
      <Animated.View style={[styles.track, { transform: [{ translateX: offset }] }]}>
        {[0, 1, 2].map((item) => (
          <Text
            key={item}
            numberOfLines={1}
            onLayout={item === 0 ? (event) => {
              const width = event.nativeEvent.layout.width;
              if (width && width !== messageWidth) setMessageWidth(width);
            } : undefined}
            style={styles.message}
          >
            {message}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    height: 26,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#EDE5D9',
    borderRadius: 6,
    marginTop: 8,
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: colors.text,
    fontFamily: fontFamilies.medium,
    fontSize: 10,
    lineHeight: 14,
    paddingHorizontal: 7,
    marginRight: itemGap,
  },
});
