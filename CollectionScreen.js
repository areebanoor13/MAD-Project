import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { BottomLinkBar, FilterPill, ScreenHeader, SearchBox } from '../components/SharedUI';
import { collections } from '../data/catalog';
import { colors, fontFamilies, globalStyles } from '../styles/GlobalStyles';

export default function CollectionScreen({ navigation, route }) {
  const slug = route.params?.slug || 'male-wallets';
  const collection = collections[slug] || collections['male-wallets'];
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [ascending, setAscending] = useState(true);

  const products = useMemo(() => {
    const search = query.trim().toLowerCase();
    return collection.items
      .filter((item) => activeFilter === 'All' || item.tag === activeFilter)
      .filter((item) => !search || item.name.toLowerCase().includes(search))
      .slice()
      .sort((first, second) => ascending ? first.price - second.price : second.price - first.price);
  }, [collection, activeFilter, query, ascending]);

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      <ScreenHeader navigation={navigation} title={collection.title} back />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <SearchBox value={query} onChangeText={setQuery} />
        <Text style={styles.breadcrumb}>{collection.breadcrumb}</Text>
        <Text style={styles.title}>{collection.title}</Text>
        <Text style={styles.description}>{collection.intro}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {collection.filters.map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>
        <View style={styles.collectionTools}>
          <Text style={styles.count}>{products.length} curated {products.length === 1 ? 'piece' : 'pieces'}</Text>
          <Pressable onPress={() => setAscending((current) => !current)} style={styles.sortButton}>
            <Text style={styles.sortLabel}>Sort {ascending ? '↑' : '↓'}</Text>
            <Feather name="sliders" size={13} color={colors.text} />
          </Pressable>
        </View>
        {products.length ? (
          <View style={styles.grid}>
            {products.map((item) => (
              <ProductCard key={item.id} item={item} navigation={navigation} />
            ))}
          </View>
        ) : (
          <View style={styles.noResults}>
            <Text style={globalStyles.body}>No pieces match your selection.</Text>
            <Pressable onPress={() => { setActiveFilter('All'); setQuery(''); }} style={styles.reset}>
              <Text style={styles.resetText}>Clear filters</Text>
            </Pressable>
          </View>
        )}
        <Text style={styles.signature}>Considered details. Everyday distinction.</Text>
      </ScrollView>
      <BottomLinkBar navigation={navigation} active="Categories" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { ...globalStyles.content, paddingTop: 5 },
  breadcrumb: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.15, marginTop: 17 },
  title: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 32, lineHeight: 34, marginTop: 5 },
  description: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, lineHeight: 17, marginTop: 2 },
  filterRow: { gap: 7, paddingTop: 15, paddingBottom: 6 },
  collectionTools: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 7, marginBottom: 9 },
  count: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 10 },
  sortButton: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 6 },
  sortLabel: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 9 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  signature: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 18, textAlign: 'center', paddingTop: 10, paddingBottom: 16 },
  noResults: { minHeight: 170, justifyContent: 'center', alignItems: 'center' },
  reset: { marginTop: 10, padding: 8 },
  resetText: { color: colors.primary, fontFamily: fontFamilies.medium, fontSize: 11 },
});
