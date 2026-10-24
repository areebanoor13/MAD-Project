import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import SplashRoute from '../screens/SplashScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AuthScreen from '../screens/AuthScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderCompleteScreen from '../screens/OrderCompleteScreen';
import { colors } from '../styles/GlobalStyles';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashRoute} />
        <Stack.Screen name="Shop" component={DrawerNavigator} />
        <Stack.Screen name="Collection" component={CollectionScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Authentication" component={AuthScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
