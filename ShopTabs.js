import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import WishlistScreen from '../screens/WishlistScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors, fontFamilies } from '../styles/GlobalStyles';
import { useShop } from '../context/ShopContext';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: 'home',
  Categories: 'grid',
  Wishlist: 'heart',
  Cart: 'shopping-bag',
  Profile: 'user',
};

export default function ShopTabs() {
  const { cart, wishlist } = useShop();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          minHeight: 66,
          paddingTop: 6,
          paddingBottom: 6,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamilies.body,
          fontSize: 10,
          marginTop: 1,
        },
        tabBarBadge:
          route.name === 'Cart' && cartCount > 0
            ? (cartCount > 9 ? '9+' : cartCount)
            : route.name === 'Wishlist' && wishlist.length > 0
              ? (wishlist.length > 9 ? '9+' : wishlist.length)
              : undefined,
        tabBarBadgeStyle: {
          backgroundColor: colors.primary,
          color: colors.white,
          fontFamily: fontFamilies.semibold,
          fontSize: 8,
          minWidth: 16,
          height: 16,
          lineHeight: 16,
          marginLeft: 3,
        },
        tabBarIcon: ({ color, size }) => (
          <Feather name={tabIcons[route.name]} size={size - 2} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
