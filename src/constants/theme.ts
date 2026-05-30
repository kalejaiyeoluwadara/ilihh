/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#6C4EF5',
    primaryDeep: '#5B3BF6',
    primaryBlue: '#4D8BFF',
    primaryGreen: '#21C16B',
    success: '#21C16B',
    warning: '#FFC800',
    streak: '#FF8A00',
    danger: '#FF4D4F',
    info: '#4D8BFF',
    text: '#0D132B',
    background: '#FFFFFF',
    backgroundElement: '#F6F7FB',
    backgroundSelected: '#E5E7EB',
    textSecondary: '#6B7280',
  },
  dark: {
    primary: '#818CF8',
    primaryDeep: '#7257F7',
    primaryBlue: '#66A0FF',
    primaryGreen: '#3BE387',
    success: '#3BE387',
    warning: '#FFD633',
    streak: '#FF9F33',
    danger: '#FF6B6D',
    info: '#66A0FF',
    text: '#F1F5F9',
    background: '#0A0E1A',
    backgroundElement: '#161F38',
    backgroundSelected: '#232E4E',
    textSecondary: '#94A3B8',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  poppins: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  mono: Platform.select({
    ios: 'ui-monospace',
    android: 'monospace',
    default: 'monospace',
    web: 'var(--font-mono)',
  }) ?? 'monospace',
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
