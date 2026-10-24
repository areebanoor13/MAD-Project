import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BrandMark from '../components/BrandMark';
import { colors, fontFamilies } from '../styles/GlobalStyles';

export default function SplashRoute({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Shop'), 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <BrandMark showName large />
        <View style={styles.rule} />
        <Text style={styles.promise}>Considered essentials.</Text>
        <Text style={styles.promise}>Effortlessly you.</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.offer}>20% OFF · Limited Stock</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  center: { alignItems: 'center' },
  rule: { width: 37, height: 1, backgroundColor: colors.primary, marginTop: 27, marginBottom: 18 },
  promise: { color: colors.muted, fontFamily: fontFamilies.editorial, fontSize: 18, lineHeight: 22 },
  bottom: { position: 'absolute', bottom: 45, alignItems: 'center' },
  offer: { color: colors.primary, fontFamily: fontFamilies.medium, fontSize: 14, marginBottom: 10 },
  bottomLine: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.8 },
});
