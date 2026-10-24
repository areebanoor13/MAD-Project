import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState, PrimaryButton, ScreenHeader } from '../components/SharedUI';
import { useShop } from '../context/ShopContext';
import { colors, fontFamilies, formatRupees, globalStyles } from '../styles/GlobalStyles';

export default function CartScreen({ navigation }) {
  const { cart, user, changeQuantity, removeFromCart, cartNotice, setCartNotice } = useShop();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = subtotal > 1200 ? Math.round(subtotal * 0.2) : 0;

  function startCheckout() {
    if (!user) {
      navigation.navigate('Authentication', { mode: 'login', returnToCheckout: true });
      return;
    }
    navigation.navigate('Checkout');
  }

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      <ScreenHeader navigation={navigation} title="Your cart" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {cartNotice ? (
          <Pressable onPress={() => setCartNotice('')} style={styles.notice}>
            <Feather name="check-circle" size={15} color={colors.success} />
            <Text style={styles.noticeText}>{cartNotice}</Text>
            <Feather name="x" size={14} color={colors.muted} />
          </Pressable>
        ) : null}
        <Text style={globalStyles.eyebrow}>YOUR CONSIDERED COLLECTION</Text>
        {cart.length === 0 ? (
          <EmptyState
            title="Room for something lovely"
            message="Your cart is empty for now. Discover timeless pieces that feel like you, and bring your favourites together here."
            buttonTitle="Continue Shopping"
            icon="shopping-bag"
            onPress={() => navigation.navigate('Categories')}
          />
        ) : (
          <>
            <Text style={styles.heading}>A lovely pairing.</Text>
            <Text style={styles.itemCount}>{cart.length} {cart.length === 1 ? 'piece' : 'pieces'}, chosen by you.</Text>
            {cart.map((item) => {
              const imageSource = typeof item.image === 'number' ? item.image : { uri: item.image };
              return (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={imageSource} resizeMode="cover" style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text numberOfLines={2} style={styles.itemTitle}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.itemMeta}>{item.tag || 'Considered essentials'}</Text>
                    <Text style={styles.itemPrice}>{formatRupees(item.price)}</Text>
                    {item.compareAt ? <Text style={styles.itemOldPrice}>{formatRupees(item.compareAt)}</Text> : null}
                    <View style={styles.itemControls}>
                      <View style={styles.stepper}>
                        <Pressable onPress={() => changeQuantity(item.id, -1)} style={styles.stepperButton} accessibilityLabel={`Decrease ${item.name} quantity`}>
                          <Feather name="minus" size={12} color={colors.text} />
                        </Pressable>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <Pressable onPress={() => changeQuantity(item.id, 1)} style={styles.stepperButton} accessibilityLabel={`Increase ${item.name} quantity`}>
                          <Feather name="plus" size={12} color={colors.text} />
                        </Pressable>
                      </View>
                      <Pressable onPress={() => removeFromCart(item.id)} style={styles.remove}>
                        <Text style={styles.removeText}>Remove</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.lineTotal}>
                      {item.quantity} × {formatRupees(item.price)} = {formatRupees(item.price * item.quantity)}
                    </Text>
                  </View>
                </View>
              );
            })}

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>The details</Text>
              <SummaryRow label={`Subtotal · ${cart.reduce((n, item) => n + item.quantity, 0)} items`} value={formatRupees(subtotal)} />
              <SummaryRow label="20% campaign discount" value={discount ? `−${formatRupees(discount)}` : formatRupees(0)} />
              <Text style={styles.campaignNote}>20% discount applies only when subtotal exceeds Rs. 1,200.</Text>
              <SummaryRow label="Shipping" value="Not calculated in preview" />
              <View style={styles.totalLine}>
                <Text style={styles.totalLabel}>Merchandise total</Text>
                <Text style={styles.totalValue}>{formatRupees(subtotal - discount)}</Text>
              </View>
            </View>
            <PrimaryButton title="Checkout" icon="arrow-right" onPress={startCheckout} style={styles.checkoutButton} />
            <Pressable onPress={() => navigation.navigate('Categories')} style={styles.continueButton}>
              <Text style={styles.continueText}>Continue Shopping</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
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
  content: { ...globalStyles.content, paddingTop: 5 },
  notice: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#EDF1E9', padding: 10, borderRadius: 7, marginBottom: 16 },
  noticeText: { flex: 1, color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  heading: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 30, lineHeight: 34, marginTop: 14 },
  itemCount: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, marginTop: 1, marginBottom: 12 },
  cartItem: { flexDirection: 'row', gap: 11, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.border },
  itemImage: { width: 104, height: 124, borderRadius: 7, backgroundColor: colors.sand },
  itemDetails: { flex: 1, paddingTop: 2 },
  itemTitle: { color: colors.text, fontFamily: fontFamilies.editorialMedium, fontSize: 19, lineHeight: 21 },
  itemMeta: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, marginTop: 3 },
  itemPrice: { color: colors.text, fontFamily: fontFamilies.semibold, fontSize: 11, marginTop: 7 },
  itemOldPrice: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, textDecorationLine: 'line-through', marginTop: 2 },
  itemControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  stepper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 6, backgroundColor: colors.surface },
  stepperButton: { width: 29, height: 27, alignItems: 'center', justifyContent: 'center' },
  quantity: { minWidth: 24, color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10, textAlign: 'center' },
  remove: { padding: 5 },
  removeText: { color: colors.primary, fontFamily: fontFamilies.medium, fontSize: 9 },
  lineTotal: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 8, marginTop: 6 },
  summary: { marginTop: 10, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border },
  summaryTitle: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 22, marginBottom: 5 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 7 },
  summaryLabel: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 10, flex: 1 },
  summaryValue: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  campaignNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 8, lineHeight: 13, marginTop: -2, marginBottom: 4 },
  totalLine: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 4 },
  totalLabel: { color: colors.text, fontFamily: fontFamilies.semibold, fontSize: 11 },
  totalValue: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 13 },
  checkoutButton: { marginTop: 18 },
  continueButton: { alignItems: 'center', paddingVertical: 15 },
  continueText: { color: colors.primary, fontFamily: fontFamilies.medium, fontSize: 10 },
  secureNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, textAlign: 'center', marginBottom: 10 },
});
