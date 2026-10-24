import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F7F3ED',
  surface: '#FFFDFA',
  text: '#272421',
  muted: '#827A73',
  primary: '#8B4654',
  primaryDark: '#713541',
  primarySoft: '#F1E5E2',
  border: '#E8E0D8',
  sand: '#E8DED2',
  categoryClothes: '#E9E1D6',
  categoryMakeup: '#F2E7DB',
  categoryAccessories: '#EAE1D6',
  gold: '#B48B61',
  white: '#FFFFFF',
  danger: '#A23E42',
  success: '#55765C',
};

export const fontFamilies = {
  body: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  editorial: 'Playfair-Bold',
  editorialMedium: 'Playfair-Medium',
  editorialSemibold: 'Playfair-SemiBold',
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  eyebrow: {
    color: colors.muted,
    fontFamily: fontFamilies.semibold,
    fontSize: 9,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  titleText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: 'black',
  },
  bodyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    lineHeight: 30,
  },
  body: {
    color: colors.muted,
    fontFamily: fontFamilies.body,
    fontSize: 13,
    lineHeight: 20,
  },
  hairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});

export function formatRupees(amount) {
  return `Rs. ${Math.round(amount || 0).toLocaleString('en-US')}`;
}

export function formatApiPrice(amount) {
  return `US$ ${Number(amount || 0).toFixed(2)}`;
}