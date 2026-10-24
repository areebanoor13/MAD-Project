import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, fontFamilies, formatRupees } from '../styles/GlobalStyles';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ item, navigation, compact = false }) {
  const { wishlist, toggleWishlist, beginAddToCart } = useShop();
  const isSaved = wishlist.some((saved) => saved.id === item.id);
  const imageSource = typeof item.image === 'number' ? item.image : { uri: item.image };
  const isApiImage = item.source === 'api'; // API images ki pehchan

  const handleAdd = () => {
    const added = beginAddToCart(item, 1);
    if (added) {
      navigation.navigate('Shop', { screen: 'Store', params: { screen: 'Cart' } });
    } else {
      navigation.navigate('Authentication', { mode: 'signup', pendingName: item.name });
    }
  };

  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      <Pressable
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        accessibilityRole="button"
        accessibilityLabel={`View ${item.name}`}
      >
        <View style={[styles.imageWrap, isApiImage && styles.apiImageWrap]}>
          <Image 
            source={imageSource} 
            style={styles.image} 
            resizeMode={isApiImage ? 'contain' : 'cover'} // API ke liye contain, local ke liye cover
          />
          {item.compareAt ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>−20%</Text>
            </View>
          ) : null}
        </View>
      </Pressable>
      
      <Pressable
        onPress={() => toggleWishlist(item)}
        accessibilityRole="button"
        accessibilityLabel={isSaved ? `Remove ${item.name} from wishlist` : `Save ${item.name}`}
        style={styles.heart}
        hitSlop={8}
      >
        <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={16} color={isSaved ? colors.primary : colors.text} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('ProductDetails', { product: item })} style={styles.details}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <View style={styles.priceLine}>
          <Text style={styles.price}>{formatRupees(item.price)}</Text>
          {item.compareAt ? <Text style={styles.compareAt}>{formatRupees(item.compareAt)}</Text> : null}
        </View>
      </Pressable>

      <Pressable 
        onPress={handleAdd} 
        style={styles.addButton}
        accessibilityRole="button"
        accessibilityLabel={`Add ${item.name} to cart`}
      >
        <Feather name="plus" size={16} color={colors.white} />
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48.5%',
    borderRadius: 9,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 11,
    position: 'relative',
  },
  compactCard: { width: '48%' },
  imageWrap: { width: '100%', aspectRatio: 0.94, backgroundColor: colors.sand, overflow: 'hidden' },
  apiImageWrap: { padding: 12, backgroundColor: colors.white }, // API images ko premium look
  image: { width: '100%', height: '100%' },
  discountBadge: { position: 'absolute', left: 7, top: 7, backgroundColor: colors.primary, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 4 },
  discountText: { color: colors.white, fontFamily: fontFamilies.medium, fontSize: 8 },
  heart: { position: 'absolute', right: 7, top: 7, width: 29, height: 29, borderRadius: 15, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  details: { paddingHorizontal: 8, paddingTop: 7, paddingBottom: 8 },
  name: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10, paddingRight: 20 },
  priceLine: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 4, paddingRight: 20 },
  price: { color: colors.text, fontFamily: fontFamilies.semibold, fontSize: 10 },
  compareAt: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 8, textDecorationLine: 'line-through' },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});