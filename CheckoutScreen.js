import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollViewCompat } from '../components/KeyboardAwareScrollViewCompat';
import { BottomLinkBar, PrimaryButton, ScreenHeader, TextField } from '../components/SharedUI';
import { useShop } from '../context/ShopContext';
import { colors, fontFamilies, formatRupees, globalStyles } from '../styles/GlobalStyles';

const initialForm = {
  email: '',
  phone: '',
  fullName: '',
  address: '',
  apartment: '',
  city: '',
  postalCode: '',
  country: 'Pakistan',
};

export default function CheckoutScreen({ navigation }) {
  const { cart, clearCart, user, isLoaded } = useShop(); 
  const [form, setForm] = useState({
    ...initialForm,
    email: user?.email || '', 
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [error, setError] = useState('');
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = subtotal > 1200 ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal - discount;

  useEffect(() => {
    if (isLoaded && !user) {
      navigation.replace('Authentication', { mode: 'login', returnToCheckout: true });
    }
  }, [isLoaded, user, navigation]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function placeOrder() {
    setError('');
    const requiredFields = ['email', 'phone', 'fullName', 'address', 'city', 'postalCode'];
    if (cart.length === 0) {
      setError('Your cart is empty. Add a piece before checkout.');
      return;
    }
    if (requiredFields.some((field) => !form[field].trim())) {
      setError('Please complete your contact and delivery details.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    const order = {
      // YAHAN CHANGE HUA HAI: Ab total quantity calculate hogi
      items: cart.reduce((n, item) => n + item.quantity, 0), 
      subtotal,
      discount,
      total,
      fullName: form.fullName.trim(),
      paymentMethod,
    };
    clearCart();
    navigation.replace('OrderComplete', { order });
  }

  if (!isLoaded || !user) {
    return (
      <SafeAreaView style={globalStyles.screen} edges={['top', 'bottom']}>
        <View style={styles.guardLoading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top', 'bottom']}>
      <ScreenHeader navigation={navigation} title="Checkout" back />
      <KeyboardAwareScrollViewCompat
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        bottomOffset={38}
      >
        
        <Text style={styles.heading}>The finishing touches.</Text>
        <Text style={styles.intro}>Add your details and review your lovely pairing.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TextField label="Email address" placeholder="you@example.com" value={form.email} onChangeText={(value) => updateField('email', value)} keyboardType="email-address" autoCapitalize="none" />
          <TextField label="Phone number" placeholder="Enter phone number" value={form.phone} onChangeText={(value) => updateField('phone', value)} keyboardType="phone-pad" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery details</Text>
          <TextField label="Full name" placeholder="Enter full name" value={form.fullName} onChangeText={(value) => updateField('fullName', value)} />
          <TextField label="Street address" placeholder="House number and street" value={form.address} onChangeText={(value) => updateField('address', value)} />
          <TextField label="Apartment, suite, etc. (optional)" placeholder="Add address details" value={form.apartment} onChangeText={(value) => updateField('apartment', value)} />
          <View style={styles.halfRow}>
            <View style={styles.halfField}><TextField label="City" placeholder="Enter city" value={form.city} onChangeText={(value) => updateField('city', value)} /></View>
            <View style={styles.halfField}><TextField label="Postal code" placeholder="Enter postal code" value={form.postalCode} onChangeText={(value) => updateField('postalCode', value)} keyboardType="number-pad" /></View>
          </View>
          <TextField label="Country / region" placeholder="Pakistan" value={form.country} onChangeText={(value) => updateField('country', value)} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping</Text>
          <View style={styles.optionCard}>
            <Feather name="truck" size={17} color={colors.primary} />
            <View style={styles.optionDescription}>
              <Text style={styles.optionTitle}>Standard delivery</Text>
              <Text style={styles.optionNote}>Delivery cost is not calculated in this preview</Text>
            </View>
            <Text style={styles.optionPrice}>—</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <PaymentOption
            selected={paymentMethod === 'cod'}
            title="Cash on delivery"
            note="Pay with cash when your order arrives at your doorstep"
            onPress={() => setPaymentMethod('cod')}
          />
          <PaymentOption
            selected={paymentMethod === 'card'}
            title="Credit / debit card"
            note="Pay with your credit or debit card at checkout"
            onPress={() => setPaymentMethod('card')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your pairing · {cart.reduce((n, item) => n + item.quantity, 0)} items</Text>
          {cart.map((item) => (
            <View key={item.id} style={styles.orderLine}>
              <View style={styles.orderIcon}><Feather name="package" size={15} color={colors.primary} /></View>
              <View style={styles.orderCopy}>
                <Text numberOfLines={1} style={styles.orderName}>{item.name}</Text>
                <Text style={styles.orderMeta}>{item.quantity} × {formatRupees(item.price)}</Text>
              </View>
              <Text style={styles.orderValue}>{formatRupees(item.price * item.quantity)}</Text>
            </View>
          ))}
        </View>

        {discount ? (
          <View style={styles.campaignNotice}>
            <Feather name="tag" size={15} color={colors.primary} />
            <Text style={styles.campaignCopy}>20% campaign discount applied · Available till 20 October</Text>
          </View>
        ) : (
          <Text style={styles.campaignNote}>20% discount applies only when subtotal exceeds Rs. 1,200. A subtotal of exactly Rs. 1,200 is not eligible.</Text>
        )}

        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>The details</Text>
          <SummaryRow label={`Subtotal · ${cart.reduce((n, item) => n + item.quantity, 0)} items`} value={formatRupees(subtotal)} />
          <SummaryRow label="20% campaign discount" value={discount ? `−${formatRupees(discount)}` : formatRupees(0)} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Preview total</Text>
            <Text style={styles.totalAmount}>{formatRupees(total)}</Text>
          </View>
        </View>
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        <PrimaryButton title="Place order" icon="arrow-right" onPress={placeOrder} style={styles.placeOrder} />
      </KeyboardAwareScrollViewCompat>
      <BottomLinkBar navigation={navigation} active="Cart" />
    </SafeAreaView>
  );
}

function PaymentOption({ selected, title, note, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.paymentOption, selected && styles.paymentOptionSelected]}>
      <View style={[styles.radio, selected && styles.radioSelected]}>{selected ? <View style={styles.radioDot} /> : null}</View>
      <View style={styles.optionDescription}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionNote}>{note}</Text>
      </View>
      {title === 'Cash on delivery' ? <Feather name="truck" size={15} color={colors.primary} /> : <Feather name="credit-card" size={15} color={colors.primary} />}
    </Pressable>
  );
}

function SummaryRow({ label, value }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  guardLoading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { ...globalStyles.content, paddingTop: 7, paddingBottom: 24 },
  heading: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 31, lineHeight: 34, marginTop: 4 },
  intro: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 17, marginTop: 2 },
  section: { marginTop: 21 },
  sectionTitle: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 22, marginBottom: 10 },
  halfRow: { flexDirection: 'row', gap: 10 },
  halfField: { flex: 1 },
  optionCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 8, padding: 12 },
  optionDescription: { flex: 1 },
  optionTitle: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 11 },
  optionNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, lineHeight: 14, marginTop: 3 },
  optionPrice: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  paymentOption: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 11, backgroundColor: colors.surface, marginBottom: 8 },
  paymentOptionSelected: { borderColor: colors.primary, backgroundColor: '#FBF6F4' },
  radio: { width: 17, height: 17, borderRadius: 9, borderWidth: 1, borderColor: colors.muted, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: colors.primary },
  radioDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary },
  orderLine: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  orderIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft },
  orderCopy: { flex: 1 },
  orderName: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  orderMeta: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, marginTop: 3 },
  orderValue: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  campaignNotice: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.primarySoft, padding: 11, borderRadius: 7, marginTop: 18 },
  campaignCopy: { flex: 1, color: colors.primaryDark, fontFamily: fontFamilies.medium, fontSize: 9, lineHeight: 14 },
  campaignNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, lineHeight: 14, marginTop: 17 },
  summary: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 19, paddingTop: 13 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, gap: 10 },
  summaryLabel: { flex: 1, color: colors.muted, fontFamily: fontFamilies.body, fontSize: 10 },
  summaryValue: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, marginTop: 5, paddingTop: 13 },
  totalLabel: { color: colors.text, fontFamily: fontFamilies.semibold, fontSize: 11 },
  totalAmount: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 13 },
  error: { color: colors.danger, fontFamily: fontFamilies.medium, fontSize: 10, marginTop: 11 },
  placeOrder: { marginTop: 18 },
  secureNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, textAlign: 'center', marginTop: 11 },
});