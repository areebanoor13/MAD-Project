import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../styles/GlobalStyles';

export default function SkeletonCard() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.image, { opacity }]} />
      <View style={styles.details}>
        <Animated.View style={[styles.textLine, { opacity, width: '80%' }]} />
        <Animated.View style={[styles.textLine, { opacity, width: '40%', marginTop: 8 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    width: '48.5%', 
    backgroundColor: colors.surface, 
    borderRadius: 9, 
    borderColor: colors.border, 
    borderWidth: 1, 
    overflow: 'hidden', 
    marginBottom: 11 
  },
  image: { 
    width: '100%', 
    aspectRatio: 0.94, 
    backgroundColor: colors.sand 
  },
  details: { 
    padding: 8 
  },
  textLine: { 
    height: 10, 
    backgroundColor: colors.sand, 
    borderRadius: 4 
  },
});