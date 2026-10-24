import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomLinkBar, PrimaryButton, ScreenHeader } from '../components/SharedUI';
import { useShop } from '../context/ShopContext';
import { colors, fontFamilies, formatRupees, globalStyles } from '../styles/GlobalStyles';

export default function ProductDetailsScreen({ navigation, route }) {
  const product = route.params?.product;
  const { user, beginAddToCart, wishlist, toggleWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  if (!product) {
    return (
      <SafeAreaView style={globalStyles.screen}>
        <ScreenHeader navigation={navigation} title="The finer details" back />
        <View style={styles.missing}>
          <Text style={globalStyles.body}>This piece could not be found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageSource = typeof product.image === 'number' ? product.image : { uri: product.image };
  const isSaved = wishlist.some((item) => item.id === product.id);

  function addProduct() {
    const added = beginAddToCart(product, quantity);
    if (added) {
      navigation.navigate('Shop', { screen: 'Store', params: { screen: 'Cart' } });
    } else {
      navigation.navigate('Authentication', {
        mode: 'signup',
        pendingName: product.name,
      });
    }
  }

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      <ScreenHeader navigation={navigation} title="The finer details" back />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Image source={imageSource} resizeMode="cover" style={styles.productImage} />
        {product.compareAt ? (
          <View style={styles.saleBadge}>
            <Text style={styles.saleBadgeText}>20% OFF</Text>
          </View>
        ) : null}
        <View style={styles.productIntro}>
          <Text style={globalStyles.eyebrow}>{product.collection === 'watches' ? 'THE TIMELESS COLLECTION · UNISEX' : 'THE CONSIDERED EDIT'}</Text>
          <View style={styles.titleLine}>
            <Text style={styles.title}>{product.name}</Text>
            <Pressable onPress={() => toggleWishlist(product)} accessibilityLabel={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}>
              <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={22} color={isSaved ? colors.primary : colors.text} />
            </Pressable>
          </View>
          <View style={styles.priceLine}>
            <Text style={styles.price}>{formatRupees(product.price)}</Text>
            {product.compareAt ? <Text style={styles.oldPrice}>{formatRupees(product.compareAt)}</Text> : null}
            {product.compareAt ? <Text style={styles.savings}>Save {formatRupees(product.compareAt - product.price)}</Text> : null}
          </View>
          {product.tag ? <Text style={styles.variant}>{product.tag} · Catalogue preview</Text> : null}
        </View>

        <View style={styles.detailDivider} />
        <Text style={styles.sectionTitle}>An everyday signature</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.description}>
          Carefully selected for its considered details and effortless everyday use. Wipe gently with a soft, dry cloth.
        </Text>

        <View style={styles.quantityRow}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityControl}>
            <Pressable onPress={() => setQuantity((value) => Math.max(1, value - 1))} style={styles.quantityButton} accessibilityLabel="Decrease quantity">
              <Feather name="minus" size={14} color={colors.text} />
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable onPress={() => setQuantity((value) => value + 1)} style={styles.quantityButton} accessibilityLabel="Increase quantity">
              <Feather name="plus" size={14} color={colors.text} />
            </Pressable>
          </View>
        </View>
        <Text style={styles.stock}>Available in this catalogue preview</Text>
        <PrimaryButton
          title="Add to Cart"
          icon="shopping-bag"
          onPress={addProduct}
          style={styles.addButton}
        />
        {!user ? (
          <Text style={styles.guestNote}>Sign in is required before adding this piece to your cart.</Text>
        ) : null}
        <View style={styles.benefits}>
          <Text style={styles.benefit}><Feather name="user" size={13} color={colors.primary} /> Sign in to shop</Text>
          <Text style={styles.benefit}><Feather name="heart" size={13} color={colors.primary} /> Wishlist saves on device</Text>
        </View>
      </ScrollView>
      <BottomLinkBar navigation={navigation} active="Categories" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingBottom: 24 },
  productImage: { width: '100%', height: 300, borderRadius: 10, backgroundColor: colors.sand, marginTop: 3 },
  saleBadge: { position: 'absolute', top: 14, left: 13, backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  saleBadgeText: { color: colors.white, fontFamily: fontFamilies.semibold, fontSize: 9, letterSpacing: 0.4 },
  productIntro: { paddingTop: 17 },
  titleLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 4 },
  title: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 31, lineHeight: 34, flex: 1 },
  priceLine: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  price: { color: colors.text, fontFamily: fontFamilies.semibold, fontSize: 15 },
  oldPrice: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, textDecorationLine: 'line-through' },
  savings: { color: colors.primary, fontFamily: fontFamilies.medium, fontSize: 10 },
  variant: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 10, marginTop: 6 },
  detailDivider: { height: 1, backgroundColor: colors.border, marginTop: 20, marginBottom: 14 },
  sectionTitle: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 24 },
  description: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 12, lineHeight: 19, marginTop: 8 },
  quantityRow: { marginTop: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityLabel: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 12 },
  quantityControl: { flexDirection: 'row', alignItems: 'center', gap: 17 },
  quantityButton: { width: 31, height: 31, borderRadius: 16, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  quantity: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 12 },
  stock: { color: colors.success, fontFamily: fontFamilies.medium, fontSize: 10, marginTop: 10 },
  addButton: { marginTop: 15 },
  guestNote: { color: colors.muted, fontFamily: fontFamilies.body, textAlign: 'center', fontSize: 9, lineHeight: 14, marginTop: 9 },
  benefits: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: colors.border, marginTop: 6 },
  benefit: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
