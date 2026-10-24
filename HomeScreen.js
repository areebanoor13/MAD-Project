import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import OfferCarousel from '../components/OfferCarousel';
import MovingBanner from '../components/MovingBanner';
import ProductCard from '../components/ProductCard';
import { ScreenHeader, SectionHeading } from '../components/SharedUI';
import { categoryCards, homeProducts, imagesForUI } from '../data/catalog';
import { colors, fontFamilies, globalStyles } from '../styles/GlobalStyles';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const categorySize = Math.max(64, Math.min(112, Math.floor((width - 52) / 3)));
  const categoryImageSize = categorySize - 2;

  const [newsletterEmail, setNewsletterEmail] = useState('');

  function openCategory(categoryKey) {
    if (categoryKey === 'makeup') {
      navigation.navigate('Collection', { slug: 'makeup' });
    } else {
      navigation.navigate('Categories', { department: categoryKey });
    }
  }

  function handleSubscribe() {
    if (!newsletterEmail.trim()) {
      Alert.alert('Email Required', 'Please enter your email address to join the list.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      Alert.alert('Check your email', 'Enter a valid email address.');
      return;
    }
    Alert.alert( 'Thank you! You have successfully joined our newsletter');
  }

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      <ScreenHeader navigation={navigation} showLogo />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        <View style={styles.intro}>
          <Text style={globalStyles.eyebrow}>THE EVERYDAY, ELEVATED</Text>
          <Text style={styles.heroTitle}>Your Style, Your Story</Text>
        </View>
        
        <OfferCarousel />
        <MovingBanner />
        
        <SectionHeading title="Shop your world" />
        <View style={styles.categories}>
          {categoryCards.map((category) => (
            <Pressable
              key={category.key}
              onPress={() => openCategory(category.key)}
              accessibilityRole="button"
              accessibilityLabel={`Browse ${category.title}`}
              style={[styles.categoryCard, { width: categorySize }]}
            >
              <Image
                source={category.image}
                style={{ width: categoryImageSize, height: categoryImageSize, backgroundColor: colors.sand }}
                resizeMode="cover"
              />
              <Text numberOfLines={1} style={styles.categoryTitle}>{category.title}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.editorialBanner}>
          <Image source={imagesForUI.clothes} style={styles.editorialImage} resizeMode="cover" />
          <View style={styles.editorialOverlay}>
            <Text style={styles.editorialEyebrow}>THE LINEN EDIT</Text>
            <Text style={styles.editorialTitle}>Natural textures,{'\n'}chosen to last.</Text>
            <Pressable style={styles.editorialBtn} onPress={() => openCategory('clothes')}>
              <Text style={styles.editorialBtnText}>Discover</Text>
            </Pressable>
          </View>
        </View>

        <SectionHeading
          title="The considered edit"
          action="View all"
          onAction={() => navigation.navigate('Categories')}
        />
        
        <View style={styles.productGrid}>
          {homeProducts.map((item) => (
            <ProductCard key={item.id} item={item} navigation={navigation} />
          ))}
        </View>

        <View style={styles.newsletterSection}>
          <Text style={styles.closingEyebrow}>NEWSLETTER PREVIEW</Text>
          <Text style={styles.closingCopy}>New arrivals and private offers, ready for a future live storefront.</Text>
          
          <View style={styles.newsletterInputContainer}>
            <TextInput
              value={newsletterEmail}
              onChangeText={setNewsletterEmail}
              placeholder="Enter your email address"
              placeholderTextColor={colors.muted}
              style={styles.newsletterInputText}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Pressable onPress={handleSubscribe} style={styles.newsletterBtn}>
              <Feather name="arrow-right" size={16} color={colors.white} />
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>MATCH & MERGE</Text>
          <Text style={styles.footerCopy}>Considered essentials. Effortlessly you.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { ...globalStyles.content, paddingTop: 10, paddingBottom: 30 },
  intro: { marginTop: 10, marginBottom: 20 },
  heroTitle: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 32, lineHeight: 36, marginTop: 6 },
  categories: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginTop: 5 },
  categoryCard: { flexGrow: 0, flexShrink: 0, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 10, overflow: 'hidden', alignItems: 'center', paddingBottom: 8 },
  categoryTitle: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10, marginTop: 8, maxWidth: '90%' },
  editorialBanner: { marginTop: 35, height: 220, borderRadius: 14, overflow: 'hidden', position: 'relative' },
  editorialImage: { width: '100%', height: '100%', backgroundColor: colors.sand },
  editorialOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(39, 36, 33, 0.35)', justifyContent: 'center', paddingHorizontal: 20 },
  editorialEyebrow: { color: colors.white, fontFamily: fontFamilies.semibold, fontSize: 9, letterSpacing: 1.5 },
  editorialTitle: { color: colors.white, fontFamily: fontFamilies.editorial, fontSize: 26, lineHeight: 30, marginTop: 6, marginBottom: 14 },
  editorialBtn: { backgroundColor: colors.primary, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4 },
  editorialBtnText: { color: colors.white, fontFamily: fontFamilies.medium, fontSize: 10 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 5 },
  newsletterSection: { marginTop: 35, paddingVertical: 28, paddingHorizontal: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, alignItems: 'center' },
  closingEyebrow: { color: colors.muted, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.2 },
  closingCopy: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 18, marginTop: 6, textAlign: 'center', lineHeight: 24 },
  newsletterInputContainer: { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingLeft: 14, paddingRight: 6, height: 46 },
  newsletterInputText: { flex: 1, color: colors.text, fontFamily: fontFamilies.body, fontSize: 12, height: '100%' },
  newsletterBtn: { backgroundColor: colors.primary, width: 34, height: 34, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  footer: { alignItems: 'center', marginTop: 30, marginBottom: 20 },
  footerBrand: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 9, letterSpacing: 2 },
  footerCopy: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 10, marginTop: 6 }
});