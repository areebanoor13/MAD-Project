import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrandMark from '../components/BrandMark';
import { PrimaryButton, ScreenHeader } from '../components/SharedUI';
import { useShop } from '../context/ShopContext';
import { colors, fontFamilies, globalStyles } from '../styles/GlobalStyles';

export default function ProfileScreen({ navigation }) {
  const { user, signOut, cart } = useShop();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  function confirmSignOut() {
    Alert.alert(
      'Sign out?',
      'Your basket and wishlist will stay saved on this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign out', style: 'destructive', onPress: signOut },
      ],
    );
  }

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      <ScreenHeader navigation={navigation} title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.profileIntro}>
          <BrandMark />
          <Text style={styles.heading}>{user ? 'Your style, continued' : 'A little introduction.'}</Text>
          <Text style={styles.copy}>
            {user ? 'Welcome back to your considered collection.' : 'Sign in to add pieces to your cart and continue to checkout.'}
          </Text>
        </View>
        {user ? (
          <>
            <View style={styles.accountCard}>
              <View style={styles.avatar}><Feather name="user" size={22} color={colors.primary} /></View>
              <View style={styles.accountDetails}>
                <Text style={styles.accountLabel}>SIGNED IN AS</Text>
                <Text style={styles.email}>{user.email}</Text>
              </View>
            </View>
            <Pressable onPress={() => navigation.navigate('Cart')} style={styles.row}>
              <Feather name="shopping-bag" size={17} color={colors.primary} />
              <Text style={styles.rowLabel}>Your cart</Text>
              <Text style={styles.rowMeta}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</Text>
              <Feather name="chevron-right" size={15} color={colors.muted} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Wishlist')} style={styles.row}>
              <Feather name="heart" size={17} color={colors.primary} />
              <Text style={styles.rowLabel}>Wishlist</Text>
              <Feather name="chevron-right" size={15} color={colors.muted} />
            </Pressable>
            <PrimaryButton title="Sign out" icon="log-out" onPress={confirmSignOut} style={styles.signOut} />
          </>
        ) : (
          <>
            <View style={styles.accountCard}>
              <View style={styles.avatar}><Feather name="user-plus" size={22} color={colors.primary} /></View>
              <View style={styles.accountDetails}>
                <Text style={styles.accountLabel}>A LOCAL PROFILE</Text>
                <Text style={styles.guestTitle}>Sign in to shop.</Text>
              </View>
            </View>
            <PrimaryButton title="Create an account" icon="arrow-right" onPress={() => navigation.navigate('Authentication')} style={styles.signOut} />
            <Text style={styles.demoNote}>Demo profile only · Your email is saved on this device; no server account is created.</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { ...globalStyles.content, paddingTop: 19 },
  profileIntro: { alignItems: 'center', paddingVertical: 18 },
  heading: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 30, marginTop: 14 },
  copy: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 3, maxWidth: 270 },
  accountCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 9, marginTop: 18, marginBottom: 12 },
  avatar: { width: 43, height: 43, borderRadius: 22, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  accountDetails: { flex: 1 },
  accountLabel: { color: colors.muted, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.1 },
  email: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 12, marginTop: 3 },
  guestTitle: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 18, marginTop: 2 },
  row: { minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: 11, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { flex: 1, color: colors.text, fontFamily: fontFamilies.medium, fontSize: 12 },
  rowMeta: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 10 },
  signOut: { marginTop: 23 },
  demoNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, lineHeight: 14, textAlign: 'center', marginTop: 12 },
});