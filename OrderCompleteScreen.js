import React from 'react';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/SharedUI';
import BrandMark from '../components/BrandMark';
import { colors, fontFamilies, formatRupees, globalStyles } from '../styles/GlobalStyles';

export default function OrderCompleteScreen({ navigation, route }) {
  const order = route.params?.order || { items: 0, total: 0, fullName: '' };

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <BrandMark />
        <View style={styles.successIcon}><Feather name="check" size={25} color={colors.white} /></View>
        <Text style={styles.eyebrow}>THOUGHTFULLY DELIVERED</Text>
        <Text style={styles.title}>Thank you, {order.fullName || 'friend'}.</Text>
        <View style={styles.orderSummary}>
          <View style={styles.summaryLine}><Text style={styles.label}>Pieces</Text><Text style={styles.value}>{order.items}</Text></View>
          <View style={styles.summaryLine}><Text style={styles.label}>Payment</Text><Text style={styles.value}>{order.paymentMethod === 'card' ? 'Card demo' : 'Cash on delivery'}</Text></View>
          <View style={styles.summaryLine}><Text style={styles.label}>Total</Text><Text style={styles.total}>{formatRupees(order.total)}</Text></View>
        </View>
        <PrimaryButton title="Continue Shopping" icon="arrow-right" onPress={() => navigation.navigate('Shop', { screen: 'Store', params: { screen: 'Home' } })} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  successIcon: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  eyebrow: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.4, marginTop: 22 },
  title: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 32, textAlign: 'center', marginTop: 6 },
  copy: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 18, textAlign: 'center', marginTop: 5 },
  orderSummary: { width: '100%', backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 7, marginTop: 21 },
  summaryLine: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: colors.border },
  label: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 10 },
  value: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  total: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 11 },
  button: { width: '100%', marginTop: 22 },
});
