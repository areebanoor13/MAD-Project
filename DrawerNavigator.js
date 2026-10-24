import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiProductsScreen from '../screens/ApiProductsScreen';
import ShopTabs from './ShopTabs';
import BrandMark from '../components/BrandMark';
import { colors, fontFamilies } from '../styles/GlobalStyles';

const Drawer = createDrawerNavigator();

function DrawerContent({ navigation }) {
  const openTab = (screen) => {
    navigation.navigate('Store', {
      screen,
      params: screen === 'Categories' ? { resetToOverview: true } : undefined,
    });
    navigation.closeDrawer();
  };
  const entries = [
    { label: 'Home', icon: 'home', action: () => openTab('Home') },
    { label: 'Categories', icon: 'grid', action: () => openTab('Categories') },
    {
      label: 'The Live Edit',
      icon: 'globe',
      action: () => {
        navigation.navigate('API Products');
        navigation.closeDrawer();
      },
    },
    { label: 'Wishlist', icon: 'heart', action: () => openTab('Wishlist') },
    { label: 'Your cart', icon: 'shopping-bag', action: () => openTab('Cart') },
    { label: 'Profile', icon: 'user', action: () => openTab('Profile') },
  ];

  return (
    <SafeAreaView style={styles.drawerSafe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.drawerContent}>
        <View style={styles.drawerBrand}><BrandMark showName /></View>
        <Text style={styles.drawerCaption}>DISCOVER THE EDIT</Text>
        {entries.map(({ label, icon, action }) => (
          <Pressable key={label} onPress={action} style={styles.drawerItem}>
            <Feather name={icon} size={17} color={colors.primary} />
            <Text style={styles.drawerLabel}>{label}</Text>
            <Feather name="chevron-right" size={15} color={colors.muted} />
          </Pressable>
        ))}
        <View style={styles.drawerFooter}>
          <Text style={styles.drawerFooterLine}>Timeless pieces, chosen with intention.</Text>
          <Text style={styles.drawerFooterBrand}>MATCH &amp; MERGE</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function DrawerNavigator() {
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(340, width * 0.86);

  return (
    <Drawer.Navigator
      initialRouteName="Store"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        swipeEdgeWidth: 48,
        drawerStyle: { width: drawerWidth, backgroundColor: colors.background },
        overlayColor: 'rgba(39,36,33,0.28)',
      }}
    >
      <Drawer.Screen name="Store" component={ShopTabs} options={{ title: 'Shop' }} />
      <Drawer.Screen name="API Products" component={ApiProductsScreen} options={{ title: 'API collection' }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerSafe: { flex: 1, backgroundColor: colors.background },
  drawerContent: { paddingHorizontal: 21, paddingBottom: 22 },
  drawerBrand: { paddingTop: 28, paddingBottom: 28, borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: 25 },
  drawerCaption: { color: colors.muted, fontFamily: fontFamilies.semibold, fontSize: 9, letterSpacing: 1.4, marginBottom: 10 },
  drawerItem: { minHeight: 53, flexDirection: 'row', alignItems: 'center', gap: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  drawerLabel: { flex: 1, color: colors.text, fontFamily: fontFamilies.medium, fontSize: 13 },
  drawerFooter: { marginTop: 42, alignItems: 'center' },
  drawerFooterLine: { color: colors.muted, fontFamily: fontFamilies.editorial, fontSize: 17, textAlign: 'center' },
  drawerFooterBrand: { color: colors.primary, fontFamily: fontFamilies.semibold, fontSize: 8, letterSpacing: 1.4, marginTop: 10 },
});
