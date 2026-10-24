import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrandMark from '../components/BrandMark';
import { BottomLinkBar, PrimaryButton, TextField } from '../components/SharedUI';
import { KeyboardAwareScrollViewCompat } from '../components/KeyboardAwareScrollViewCompat';
import { useShop } from '../context/ShopContext';
import { colors, fontFamilies, globalStyles } from '../styles/GlobalStyles';

export default function AuthScreen({ navigation, route }) {
  const [mode, setMode] = useState(route.params?.mode || 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { finishAuthentication, pendingItem } = useShop();
  const isSignup = mode === 'signup';
  const pendingName = route.params?.pendingName || pendingItem?.item?.name;

  function submitForm() {
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (isSignup && !/(?=.*\d).{8,}/.test(password)) {
      setError('Use at least 8 characters, including a number.');
      return;
    }
    if (!isSignup && !password.trim()) {
      setError('Please enter your password.');
      return;
    }
    const itemWasPending = finishAuthentication(email.trim());
    if (itemWasPending) {
      navigation.navigate('Shop', { screen: 'Store', params: { screen: 'Cart' } });
    } else if (route.params?.returnToCheckout) {
      navigation.navigate('Checkout');
    } else {
      navigation.navigate('Shop', { screen: 'Store', params: { screen: 'Profile' } });
    }
  }

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top', 'bottom']}>
      <KeyboardAwareScrollViewCompat
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bottomOffset={60}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton} accessibilityLabel="Go back">
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <View style={styles.brand}>
          <BrandMark />
        </View>
        <Text style={styles.eyebrow}>{isSignup ? 'SIGN UP' : 'WELCOME BACK'}</Text>
        <Text style={styles.title}>{isSignup ? 'A little introduction.' : 'Good to see you again.'}</Text>
        <Text style={styles.description}>
          {pendingName
            ? `${isSignup ? 'Create your account' : 'Sign in to continue'}. We’ll add ${pendingName} to your cart when you’re signed in.`
            : isSignup
              ? 'Create your Match & Merge profile to keep your favourite pieces together.'
              : 'Sign in to continue to your Match & Merge account.'}
        </Text>

        {pendingName && pendingItem ? (
          <View style={styles.pendingCard}>
            <Text style={styles.pendingEyebrow}>READY TO ADD</Text>
            <Text numberOfLines={1} style={styles.pendingName}>{pendingItem.item.name}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <TextField
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />
          <TextField
            label="Password"
            placeholder={isSignup ? 'Create a password' : 'Enter your password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete={isSignup ? 'new-password' : 'password'}
            textContentType={isSignup ? 'newPassword' : 'password'}
          />
          {isSignup ? (
            <Text style={styles.passwordNote}>Use at least 8 characters, including a number.</Text>
          ) : null}
          {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
          <PrimaryButton
            title={pendingItem
              ? (isSignup ? 'Sign up & add to cart' : 'Sign in & add to cart')
              : (isSignup ? 'Create an account' : 'Sign in')}
            icon="arrow-right"
            onPress={submitForm}
            style={styles.submit}
          />
        </View>
        <Pressable onPress={() => { setMode(isSignup ? 'login' : 'signup'); setError(''); setPassword(''); }} style={styles.modeToggle}>
          <Text style={styles.modeCopy}>{isSignup ? 'Already have an account? ' : 'New to Match & Merge? '}</Text>
          <Text style={styles.modeLink}>{isSignup ? 'Sign in' : 'Create an account'}</Text>
        </Pressable>
        <Text style={styles.demoNote}>Demo authentication · No server account or password verification is enabled.</Text>
      </KeyboardAwareScrollViewCompat>
      <BottomLinkBar navigation={navigation} active="Profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 18 },
  backButton: { width: 36, height: 36, justifyContent: 'center' },
  brand: { alignItems: 'center', marginTop: 1, marginBottom: 11 },
  eyebrow: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.2, textAlign: 'center' },
  title: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 32, lineHeight: 35, textAlign: 'center', marginTop: 5 },
  description: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 4, paddingHorizontal: 8 },
  form: { marginTop: 22 },
  pendingCard: { backgroundColor: colors.primarySoft, borderRadius: 8, padding: 12, marginTop: 17 },
  pendingEyebrow: { color: colors.primaryDark, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.1 },
  pendingName: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 11, marginTop: 6 },
  passwordNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, marginTop: -6, marginBottom: 7 },
  error: { color: colors.danger, fontFamily: fontFamilies.medium, fontSize: 10, marginTop: 3, marginBottom: 7 },
  submit: { marginTop: 13 },
  modeToggle: { flexDirection: 'row', justifyContent: 'center', paddingTop: 16, paddingBottom: 3 },
  modeCopy: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 10 },
  modeLink: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 10 },
  demoNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, lineHeight: 14, textAlign: 'center', marginTop: 10, paddingHorizontal: 12 },
});