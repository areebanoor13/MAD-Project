import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState, ScreenHeader } from '../components/SharedUI';
import { useShop } from '../context/ShopContext';
import { colors, fontFamilies, formatRupees, globalStyles } from '../styles/GlobalStyles';

export default function WishlistScreen({ navigation }) {
  const { wishlist, toggleWishlist } = useShop();
  const { width } = useWindowDimensions();
  const itemWidth = Math.floor((width - 46) / 2);
  const imageSize = itemWidth - 18;

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
    <ScreenHeader navigation={navigation} title="Wishlist"/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={globalStyles.eyebrow}>THE PIECES YOU LOVE</Text>
        {wishlist.length === 0 ? (
          <EmptyState
            title="A little room for lovely"
            message="Save pieces as you browse. Your considered edit will be waiting here."
            buttonTitle="Explore categories"
            icon="heart"
            onPress={() => navigation.navigate('Categories')}
          />
        ) : (
          <View style={styles.grid}>
            {wishlist.map((item) => {
              const imageSource = typeof item.image === 'number' ? item.image : { uri: item.image };
              return (
                <View key={item.id} style={[styles.card, { width: itemWidth }]}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`View ${item.name}`}
                    onPress={() => navigation.navigate('ProductDetails', { product: item })}
                  >
                    <Image source={imageSource} resizeMode="cover" style={{ width: imageSize, height: imageSize, backgroundColor: colors.sand }} />
                  </Pressable>
                  <Pressable
                    onPress={() => toggleWishlist(item)}
                    style={styles.remove}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${item.name} from wishlist`}
                  >
                    <Feather name="x" size={14} color={colors.text} />
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('ProductDetails', { product: item })} style={styles.caption}>
                    <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{formatRupees(item.price)}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { ...globalStyles.content, paddingTop: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingTop: 15 },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 9, overflow: 'hidden', position: 'relative', marginBottom: 12, alignItems: 'center', padding: 8 },
  remove: { position: 'absolute', right: 7, top: 7, width: 27, height: 27, backgroundColor: colors.surface, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  caption: { width: '100%', paddingTop: 8 },
  name: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  price: { color: colors.text, fontFamily: fontFamilies.semibold, fontSize: 10, marginTop: 4 },
});
