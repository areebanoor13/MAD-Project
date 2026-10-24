import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilies } from '../styles/GlobalStyles';

export default function BrandMark({ showName = false, large = false }) {
  return (
    <View style={styles.wrap} accessibilityLabel="Match and Merge">
      <View style={[styles.monogram, large && styles.monogramLarge]}>
        <Image
          source={require('../../assets/images/mm-logo.png')}
          resizeMode="contain"
          style={[styles.logoImage, large && styles.logoImageLarge]}
          accessible={false}
        />
      </View>
      {showName ? (
        <>
          <Text style={[styles.name, large && styles.nameLarge]}>Match &amp; Merge</Text>
          <Text style={styles.tagline}>THE EVERYDAY, ELEVATED</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  monogram: { width: 76, height: 58, alignItems: 'center', justifyContent: 'center' },
  monogramLarge: { width: 136, height: 104 },
  logoImage: { width: 76, height: 55 },
  logoImageLarge: { width: 136, height: 98 },
  name: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 18, marginTop: -1 },
  nameLarge: { fontSize: 25, marginTop: 4 },
  tagline: { color: colors.muted, fontFamily: fontFamilies.medium, fontSize: 8, letterSpacing: 1.5, marginTop: 5 },
});
