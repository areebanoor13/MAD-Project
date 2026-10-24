import React, { useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard'; 
import {
  ErrorState,
  FilterPill,
  BottomLinkBar,
  ScreenHeader,
  SearchBox,
} from '../components/SharedUI';
import { FAKE_STORE_PRODUCTS_URL, mapFakeStoreProduct } from '../services/productsApi';
import { colors, fontFamilies, globalStyles } from '../styles/GlobalStyles';

export default function ApiProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [retryCount, setRetryCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let screenIsActive = true;

    async function loadProducts() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(FAKE_STORE_PRODUCTS_URL);
        if (!response.ok) {
          throw new Error(`Product request failed (${response.status}).`);
        }
        const result = await response.json();
        if (!Array.isArray(result)) {
          throw new Error('The API returned an unexpected product list.');
        }
        if (screenIsActive) {
          setProducts(result.map(mapFakeStoreProduct));
          setError('');
        }
      } catch (requestError) {
        if (screenIsActive) {
          setError(requestError.message || 'Could not load products. Check your connection and retry.');
          setProducts([]);
        }
      } finally {
        if (screenIsActive) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    }

    loadProducts();
    return () => {
      screenIsActive = false;
    };
  }, [retryCount]);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((item) => item.tag))],
    [products],
  );
  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return products
      .filter((item) => activeCategory === 'All' || item.tag === activeCategory)
      .filter((item) => !searchTerm || item.name.toLowerCase().includes(searchTerm));
  }, [products, activeCategory, search]);

  function retry() {
    setRetryCount((count) => count + 1);
  }

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      <ScreenHeader navigation={navigation} title="The Live Edit" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); retry(); }}
            tintColor={colors.primary}
          />
        }
      >
        {/* <Text style={globalStyles.eyebrow}>THE API EDIT</Text> */}
        <Text style={styles.title}>This Week's Finds</Text>
        <Text style={styles.intro}>Browse the categories available in this catalogue.</Text>
        <SearchBox value={search} onChangeText={setSearch} placeholder="Search products" />
        {!loading && !error && categories.length > 1 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
            {categories.map((category) => (
              <FilterPill
                key={category}
                label={category === 'All' ? 'All' : category}
                active={activeCategory === category}
                onPress={() => setActiveCategory(category)}
              />
            ))}
          </ScrollView>
        ) : null}

        {loading ? (
          <View style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map((key) => <SkeletonCard key={key} />)}
          </View>
        ) : error ? (
          <ErrorState
            title="A little interruption"
            message="We couldn’t load this collection. Check your connection and try again."
            onRetry={retry}
          />
        ) : filteredProducts.length ? (
          <>
            <Text style={styles.count}>{filteredProducts.length} products</Text>
            <View style={styles.grid}>
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} item={item} navigation={navigation} />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyCopy}>We couldn’t find anything for this selection. Try clearing your search or filters.</Text>
            <Text onPress={() => { setSearch(''); setActiveCategory('All'); }} style={styles.reset}>Reset filters</Text>
          </View>
        )}
      </ScrollView>
      <BottomLinkBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { ...globalStyles.content, paddingTop: 5 },
  title: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 30, lineHeight: 35, marginTop: 2 },
  intro: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 17, marginTop: 2, marginBottom: 12 },
  filters: { gap: 7, paddingVertical: 12 },
  count: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10, marginTop: 9, marginBottom: 11 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  priceNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, lineHeight: 14, textAlign: 'center', marginTop: 4, marginBottom: 10 },
  empty: { minHeight: 250, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  emptyTitle: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 26, textAlign: 'center' },
  emptyCopy: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 6 },
  reset: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 11, marginTop: 16 },
});