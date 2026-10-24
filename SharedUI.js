import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import BrandMark from './BrandMark';
import { colors, fontFamilies, globalStyles } from '../styles/GlobalStyles';
import { useShop } from '../context/ShopContext';

export function ScreenHeader({ navigation, title, showLogo = false, back = false, showActions = true }) {
  const { cart } = useShop();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const openDrawer = () => {
    let parent = navigation;
    while (parent) {
      if (parent.openDrawer) {
        parent.openDrawer();
        return;
      }
      parent = parent.getParent?.();
    }
    navigation.goBack?.();
  };

  const goTo = (tab) => navigateToTab(navigation, tab);

  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={back ? 'Go back' : 'Open navigation menu'}
        onPress={back ? () => navigation.goBack() : openDrawer}
        style={styles.headerIcon}
      >
        <Feather name={back ? 'arrow-left' : 'menu'} size={21} color={colors.text} />
      </Pressable>
      <View pointerEvents="none" style={styles.headerCenter}>
        {showLogo ? <BrandMark /> : <Text numberOfLines={1} style={styles.headerTitle}>{title}</Text>}
      </View>
      {showActions ? (
        <View style={styles.headerActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open your account"
            onPress={() => goTo('Profile')}
            hitSlop={8}
            style={styles.headerAction}
          >
            <Feather name="user" size={19} color={colors.text} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open your cart${cartCount ? `, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : ''}`}
            onPress={() => goTo('Cart')}
            hitSlop={8}
            style={styles.headerAction}
          >
            <Feather name="shopping-bag" size={19} color={colors.text} />
            {cartCount > 0 ? (
              <View style={styles.headerCartBadge}>
                <Text style={styles.headerCartBadgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      ) : <View style={styles.headerRightSpace} />}
    </View>
  );
}

export function SearchBox({ value, onChangeText, placeholder = 'Search your next favourite' }) {
  return (
    <View style={styles.searchBox}>
      <Feather name="search" size={15} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        returnKeyType="search"
        style={styles.searchInput}
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} accessibilityLabel="Clear search">
          <Feather name="x" size={16} color={colors.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function SectionHeading({ eyebrow, title, action, onAction }) {
  return (
    <View style={styles.sectionHeading}>
      <View style={styles.sectionText}>
        {eyebrow ? <Text style={globalStyles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={globalStyles.sectionTitle}>{title}</Text>
      </View>
      {action ? (
        <Pressable onPress={onAction} style={styles.viewAll} accessibilityRole="button">
          <Text style={styles.viewAllText}>{action}</Text>
          <Feather name="arrow-right" size={14} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function PrimaryButton({ title, onPress, icon, disabled = false, loading = false, style }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.78}
      style={[
        styles.primaryButton,
        style,
        (disabled || loading) && styles.buttonDisabled,
      ]}
    >
      {loading ? <ActivityIndicator color={colors.white} size="small" /> : null}
      <Text style={styles.primaryButtonText}>{title}</Text>
      {icon ? <Feather name={icon} size={15} color={colors.white} /> : null}
    </TouchableOpacity>
  );
}

export function TextField({ label, value, onChangeText, placeholder, secureTextEntry = false, keyboardType = 'default', autoCapitalize = 'sentences', multiline = false, ...rest }) {
  return (
    <View style={styles.fieldBlock}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[styles.input, multiline && styles.multilineInput]}
        {...rest}
      />
    </View>
  );
}

export function FilterPill({ label, active = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.filterPill, active && styles.filterPillActive]}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function EmptyState({ title, message, buttonTitle, onPress, icon = 'heart' }) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Feather name={icon} size={25} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyMessage}>{message}</Text>
      {buttonTitle ? <PrimaryButton title={buttonTitle} icon="arrow-right" onPress={onPress} style={styles.emptyButton} /> : null}
    </View>
  );
}

export function ErrorState({ title = 'A little interruption', message, onRetry }) {
  return (
    <View style={styles.errorState}>
      <Feather name="wifi-off" size={23} color={colors.primary} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyMessage}>{message}</Text>
      <PrimaryButton title="Retry" icon="refresh-cw" onPress={onRetry} style={styles.emptyButton} />
    </View>
  );
}

export function BottomLinkBar({ navigation, active }) {
  const links = [
    { label: 'Home', icon: 'home' },
    { label: 'Categories', icon: 'grid' },
    { label: 'Wishlist', icon: 'heart' },
    { label: 'Cart', icon: 'shopping-bag' },
    { label: 'Profile', icon: 'user' },
  ];
  return (
    <View style={styles.bottomLinkBar}>
      {links.map((link) => {
        const selected = active === link.label;
        return (
          <Pressable
            key={link.label}
            onPress={() => navigateToTab(navigation, link.label)}
            accessibilityRole="button"
            accessibilityLabel={link.label}
            style={styles.bottomLink}
          >
            <Feather name={link.icon} size={17} color={selected ? colors.primary : colors.muted} />
            <Text style={[styles.bottomLinkLabel, selected && styles.bottomLinkLabelActive]}>{link.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function navigateToTab(navigation, tab) {
  let current = navigation;
  while (current) {
    const routeNames = current.getState?.().routeNames || [];
    if (routeNames.includes(tab)) {
      current.navigate(tab);
      return;
    }
    current = current.getParent?.();
  }
  navigation.navigate('Shop', { screen: 'Store', params: { screen: tab } });
}

const styles = StyleSheet.create({
  header: {
    minHeight: 66,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: { width: 44, height: 44, alignItems: 'flex-start', justifyContent: 'center', zIndex: 1 },
  headerCenter: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { maxWidth: '52%', color: colors.text, fontFamily: fontFamilies.editorialMedium, fontSize: 22, textAlign: 'center' },
  headerActions: { width: 80, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 12, zIndex: 1 },
  headerAction: { width: 28, height: 44, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  headerCartBadge: { position: 'absolute', right: -4, top: 4, minWidth: 16, height: 16, paddingHorizontal: 3, borderRadius: 9, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.background },
  headerCartBadgeText: { color: colors.white, fontFamily: fontFamilies.semibold, fontSize: 8, lineHeight: 10 },
  headerRightSpace: { width: 80 },
  searchBox: {
    minHeight: 42,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  searchInput: { flex: 1, minHeight: 40, color: colors.text, fontFamily: fontFamilies.body, fontSize: 12 },
  sectionHeading: { marginTop: 20, marginBottom: 12, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  sectionText: { flex: 1 },
  viewAll: { flexDirection: 'row', gap: 4, alignItems: 'center', paddingBottom: 5 },
  viewAllText: { color: colors.primary, fontFamily: fontFamilies.medium, fontSize: 10 },
  primaryButton: {
    minHeight: 48,
    paddingHorizontal: 18,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 9,
  },
  primaryButtonText: { color: colors.white, fontFamily: fontFamilies.semibold, fontSize: 12, letterSpacing: 0.15 },
  buttonDisabled: { opacity: 0.45 },
  fieldBlock: { marginBottom: 13 },
  fieldLabel: { color: colors.text, fontFamily: fontFamilies.medium, fontSize: 11, marginBottom: 7 },
  input: {
    minHeight: 47,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 7,
    paddingHorizontal: 12,
    color: colors.text,
    fontFamily: fontFamilies.body,
    fontSize: 13,
  },
  multilineInput: { minHeight: 88, paddingTop: 12 },
  filterPill: { borderRadius: 20, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 14, minHeight: 31, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  filterPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.muted, fontFamily: fontFamilies.medium, fontSize: 10 },
  filterTextActive: { color: colors.white },
  emptyState: { alignItems: 'center', paddingHorizontal: 28, paddingVertical: 40 },
  emptyIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  emptyTitle: { color: colors.text, fontFamily: fontFamilies.editorial, fontSize: 27, textAlign: 'center', marginTop: 10 },
  emptyMessage: { color: colors.muted, fontFamily: fontFamilies.body, fontSize: 12, lineHeight: 19, textAlign: 'center', marginTop: 7, maxWidth: 300 },
  emptyButton: { minWidth: 200, marginTop: 20 },
  errorState: { alignItems: 'center', paddingHorizontal: 28, paddingVertical: 45 },
  bottomLinkBar: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, paddingBottom: 3 },
  bottomLink: { minWidth: 52, alignItems: 'center', gap: 4 },
  bottomLinkLabel: { fontFamily: fontFamilies.body, fontSize: 9, color: colors.muted },
  bottomLinkLabelActive: { color: colors.primary, fontFamily: fontFamilies.medium },
});
