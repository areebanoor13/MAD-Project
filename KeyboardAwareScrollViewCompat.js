import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export function KeyboardAwareScrollViewCompat({ bottomOffset, ...props }) {
  if (Platform.OS === 'web') {
    return <ScrollView {...props} />;
  }
  return <KeyboardAwareScrollView bottomOffset={bottomOffset} {...props} />;
}
