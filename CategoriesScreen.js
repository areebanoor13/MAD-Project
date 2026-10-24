import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBox } from '../components/SharedUI';
import { categoryCards, categorySections } from '../data/catalog';
import { colors, fontFamilies, globalStyles } from '../styles/GlobalStyles';

const departmentColors = {
  clothes: colors.categoryClothes,
  makeup: colors.categoryMakeup,
  accessories: colors.categoryAccessories,
};

export default function CategoriesScreen({ navigation, route }) {
  const [query, setQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    if (route.params?.department) {
      setSelectedDepartment(route.params.department);
    } else if (route.params?.resetToOverview) {
      setSelectedDepartment(null);
      setQuery('');
    }
    if (route.params?.department || route.params?.resetToOverview) {
      navigation.setParams({ department: undefined, resetToOverview: undefined });
    }
  }, [route.params?.department, route.params?.resetToOverview, navigation]);

  useEffect(() => {
    if (!selectedDepartment) return undefined;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setSelectedDepartment(null);
      setQuery('');
      return true;
    });
    return () => subscription.remove();
  }, [selectedDepartment]);

  useEffect(() => {
    const resetCategories = () => {
      setQuery('');
      setSelectedDepartment(null);
    };
    
    const removeTabListener = navigation.addListener('tabPress', resetCategories);
    return () => {
      removeTabListener();
    };
  }, [navigation]);

  const visibleCategories = useMemo(
    () => categoryCards.filter((category) => (
      !normalizedQuery
      || `${category.title} ${category.subtitle}`.toLowerCase().includes(normalizedQuery)
    )),
    [normalizedQuery],
  );

  const department = categorySections.find(
    (section) => section.title.toLowerCase() === selectedDepartment,
  );
  const visibleGroups = (department?.groups || [])
    .map((group) => {
      const groupMatches = normalizedQuery
        && group.heading.toLowerCase().includes(normalizedQuery);
      return {
        ...group,
        options: group.options.filter((option) => (
          !normalizedQuery
          || groupMatches
          || `${option.label} ${option.note}`.toLowerCase().includes(normalizedQuery)
        )),
      };
    })
    .filter((group) => group.options.length > 0);

  function openCategory(category) {
    setQuery('');
    if (category.key === 'makeup') {
      navigation.navigate('Collection', { slug: 'makeup' });
      return;
    }
    setSelectedDepartment(category.key);
  }

  function goBack() {
    if (selectedDepartment) {
      setSelectedDepartment(null);
      setQuery('');
      return;
    }
    navigation.navigate('Home');
  }

  function openDrawer() {
    let parent = navigation;
    while (parent) {
      if (parent.openDrawer) {
        parent.openDrawer();
        return;
      }
      parent = parent.getParent?.();
    }
    navigation.navigate('Home');
  }

  function handleHeaderBack() {
    if (selectedDepartment) goBack();
    else openDrawer();
  }

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={selectedDepartment ? 'Back to categories' : 'Open navigation menu'}
          onPress={handleHeaderBack}
          hitSlop={8}
          style={styles.headerButton}
        >
          <Feather name={selectedDepartment ? 'arrow-left' : 'menu'} size={21} color={colors.text} />
        </Pressable>
        <Text numberOfLines={1} style={styles.headerTitle}>Categories</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open your profile"
          onPress={() => navigation.navigate('Profile')}
          hitSlop={8}
          style={styles.headerButton}
        >
          <Feather name="user" size={19} color={colors.text} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open your cart"
          onPress={() => navigation.navigate('Cart')}
          hitSlop={8}
          style={[styles.headerButton, styles.cartButton]}
        >
          <Feather name="shopping-bag" size={19} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {!selectedDepartment ? <SearchBox value={query} onChangeText={setQuery} /> : null}

        {!selectedDepartment ? (
          <View style={styles.categoryList}>
            {visibleCategories.map((category) => (
              <Pressable
                key={category.key}
                accessibilityRole="button"
                accessibilityLabel={`Shop ${category.title}`}
                onPress={() => openCategory(category)}
                style={({ pressed }) => [
                  styles.categoryCard,
                  { backgroundColor: departmentColors[category.key] || colors.sand },
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.categoryCopy}>
                  <Text style={styles.categoryEyebrow}>{category.key.toUpperCase()}</Text>
                  <Text numberOfLines={1} style={styles.categoryTitle}>{category.title}</Text>
                  <Text numberOfLines={2} style={styles.categoryDescription}>{category.subtitle}</Text>
                  <View style={styles.shopPill}>
                    <Text style={styles.shopPillText}>Shop Now</Text>
                    <Feather name="arrow-right" size={12} color={colors.white} />
                  </View>
                </View>
                <Image source={category.image} style={styles.categoryImage} resizeMode="cover" />
              </Pressable>
            ))}
            {visibleCategories.length === 0 ? <NoResults /> : null}

            {visibleCategories.length > 0 && (
              <>
                <View style={styles.brandPromises}>
                  <View style={styles.promiseItem}>
                    <Feather name="star" size={20} color={colors.primary} />
                    <Text style={styles.promiseTitle}>Curated edit</Text>
                    <Text style={styles.promiseText}>Thoughtful finds</Text>
                  </View>
                  <View style={styles.promiseDivider} />
                  <View style={styles.promiseItem}>
                    <Feather name="heart" size={20} color={colors.primary} />
                    <Text style={styles.promiseTitle}>Your wishlist</Text>
                    <Text style={styles.promiseText}>Saved on device</Text>
                  </View>
                  <View style={styles.promiseDivider} />
                  <View style={styles.promiseItem}>
                    <Feather name="shopping-bag" size={20} color={colors.primary} />
                    <Text style={styles.promiseTitle}>Easy to browse</Text>
                    <Text style={styles.promiseText}>Shop by edit</Text>
                  </View>
                </View>

                <View style={styles.editorialFooter}>
                  <Text style={styles.footerEyebrow}>MATCH & MERGE</Text>
                  <Text style={styles.footerQuote}>"Curated for the everyday, designed for you."</Text>
                </View>
              </>
            )}

          </View>
        ) : (
          <View style={styles.details}>
            <Text style={styles.detailEyebrow}>{department?.eyebrow}</Text>
            <Text style={styles.detailTitle}>{department?.title}</Text>
            <Text style={styles.detailDescription}>{department?.description}</Text>

            {visibleGroups.map((group) => (
              <View key={group.heading} style={styles.departmentGroup}>
                <View style={styles.groupHeadingRow}>
                  <Text style={styles.groupHeading}>{group.heading}</Text>
                  <Text style={styles.groupTagline}>{group.tagline}</Text>
                </View>
                <View style={styles.subcategoryGrid}>
                  {group.options.map((option) => (
                    <Pressable
                      key={option.slug}
                      accessibilityRole="button"
                      onPress={() => navigation.navigate('Collection', { slug: option.slug })}
                      style={({ pressed }) => [styles.subcategoryCard, pressed && styles.pressed]}
                    >
                      <Image source={option.image} style={styles.subcategoryImage} resizeMode="cover" />
                      <View style={styles.subcategoryCopy}>
                        <Text numberOfLines={1} style={styles.subcategoryTitle}>{option.label}</Text>
                        <Text numberOfLines={2} style={styles.subcategoryNote}>{option.note}</Text>
                        <View style={styles.exploreRow}>
                          <Text style={styles.exploreText}>Explore</Text>
                          <Feather name="arrow-right" size={12} color={colors.primary} />
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
            {visibleGroups.length === 0 ? <NoResults /> : null}
            {department?.signature && !normalizedQuery ? (
              <Text style={styles.signature}>{department.signature}</Text>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function NoResults() {
  return (
    <View style={styles.noResults}>
      <Text style={styles.noResultsTitle}>No matches found</Text>
      <Text style={styles.noResultsCopy}>Try another search.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: { width: 38, height: 42, justifyContent: 'center' },
  cartButton: { alignItems: 'flex-end' },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: colors.text,
    fontFamily: fontFamilies.editorialMedium,
    fontSize: 23,
  },
  content: { ...globalStyles.content, paddingTop: 3, paddingBottom: 22 },
  categoryList: { marginTop: 13 },
  categoryCard: {
    height: 164,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 13,
  },
  categoryCopy: {
    width: '53%',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 5,
    paddingVertical: 13,
  },
  categoryEyebrow: {
    color: colors.muted,
    fontFamily: fontFamilies.medium,
    fontSize: 8,
    letterSpacing: 4,
  },
  categoryTitle: {
    color: colors.text,
    fontFamily: fontFamilies.editorial,
    fontSize: 28,
    lineHeight: 31,
    marginTop: 2,
  },
  categoryDescription: {
    color: colors.muted,
    fontFamily: fontFamilies.body,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 3,
    maxWidth: 145,
  },
  shopPill: {
    alignSelf: 'flex-start',
    minHeight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 11,
    marginTop: 10,
  },
  shopPillText: { color: colors.white, fontFamily: fontFamilies.medium, fontSize: 9 },
  categoryImage: { width: '47%', height: '100%', backgroundColor: colors.sand },
  
  brandPromises: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promiseItem: {
    flex: 1,
    alignItems: 'center',
  },
  promiseTitle: {
    fontFamily: fontFamilies.semibold,
    fontSize: 10,
    color: colors.text,
    marginTop: 8,
  },
  promiseText: {
    fontFamily: fontFamilies.body,
    fontSize: 8,
    color: colors.muted,
    marginTop: 3,
  },
  promiseDivider: {
    width: 1,
    height: 35,
    backgroundColor: colors.border,
  },
  editorialFooter: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  footerEyebrow: {
    color: colors.primary,
    fontFamily: fontFamilies.semibold,
    fontSize: 8,
    letterSpacing: 1.5,
  },
  footerQuote: {
    color: colors.muted,
    fontFamily: fontFamilies.editorial,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },

  details: { paddingTop: 28 },
  detailEyebrow: {
    color: colors.muted,
    fontFamily: fontFamilies.semibold,
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  detailTitle: {
    color: colors.text,
    fontFamily: fontFamilies.bold,
    fontSize: 25,
    lineHeight: 31,
    marginTop: 4,
  },
  detailDescription: {
    color: colors.muted,
    fontFamily: fontFamilies.body,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 3,
  },
  departmentGroup: { marginTop: 25 },
  groupHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  groupHeading: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 19 },
  groupTagline: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9 },
  subcategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginTop: 0,
  },
  subcategoryCard: {
    width: '48.5%',
    overflow: 'hidden',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  subcategoryImage: { width: '100%', height: 112, backgroundColor: colors.sand },
  subcategoryCopy: { padding: 10 },
  subcategoryTitle: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 11 },
  subcategoryNote: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 9, lineHeight: 13, minHeight: 26, marginTop: 4 },
  exploreRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 },
  exploreText: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 10 },
  signature: {
    color: colors.text,
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 12,
  },
  pressed: { opacity: 0.84 },
  noResults: { minHeight: 170, alignItems: 'center', justifyContent: 'center' },
  noResultsTitle: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 23 },
  noResultsCopy: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 11, marginTop: 4 },
});