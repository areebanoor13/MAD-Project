import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [pendingItem, setPendingItem] = useState(null);
  const [cartNotice, setCartNotice] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('@user');
        const savedCart = await AsyncStorage.getItem('@cart');
        const savedWishlist = await AsyncStorage.getItem('@wishlist');
        
        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        // console.log('Failed to load data', e);
      }
      setIsLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) AsyncStorage.setItem('@user', JSON.stringify(user));
  }, [user, isLoaded]);

  useEffect(() => {
    if (isLoaded) AsyncStorage.setItem('@cart', JSON.stringify(cart));
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) AsyncStorage.setItem('@wishlist', JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  function addToCart(item, quantity = 1) {
    setCart((currentCart) => {
      const existing = currentCart.find((entry) => entry.id === item.id);
      if (existing) {
        return currentCart.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry,
        );
      }
      return [...currentCart, { ...item, quantity }];
    });
    setCartNotice(`${item.name} has been added to your cart.`);
  }

  function changeQuantity(itemId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((entry) =>
          entry.id === itemId
            ? { ...entry, quantity: Math.max(1, entry.quantity + amount) }
            : entry,
        )
        .filter((entry) => entry.quantity > 0),
    );
  }

  function removeFromCart(itemId) {
    setCart((currentCart) => currentCart.filter((entry) => entry.id !== itemId));
  }

  function toggleWishlist(item) {
    setWishlist((currentList) =>
      currentList.some((entry) => entry.id === item.id)
        ? currentList.filter((entry) => entry.id !== item.id)
        : [...currentList, item],
    );
  }

  function beginAddToCart(item, quantity = 1) {
    if (!user) {
      setPendingItem({ item, quantity });
      return false;
    }
    addToCart(item, quantity);
    return true;
  }

  function finishAuthentication(email) {
    setUser({ email });
    if (pendingItem) {
      addToCart(pendingItem.item, pendingItem.quantity);
      setPendingItem(null);
      return true;
    }
    return false;
  }

  function signOut() {
    setUser(null);
  }

  function clearCart() {
    setCart([]);
    setCartNotice('');
  }

  const value = useMemo(
    () => ({
      user,
      cart,
      wishlist,
      pendingItem,
      cartNotice,
      isLoaded,
      setCartNotice,
      addToCart,
      beginAddToCart,
      changeQuantity,
      removeFromCart,
      toggleWishlist,
      finishAuthentication,
      signOut,
      clearCart,
    }),
    [user, cart, wishlist, pendingItem, cartNotice, isLoaded],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) {
    throw new Error('useShop must be used inside ShopProvider.');
  }
  return value;
}