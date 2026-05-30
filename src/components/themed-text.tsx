import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code'
    | 'h1' | 'h2' | 'h3' | 'h4' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'caption';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        type === 'h1' && styles.h1,
        type === 'h2' && styles.h2,
        type === 'h3' && styles.h3,
        type === 'h4' && styles.h4,
        type === 'bodyLarge' && styles.bodyLarge,
        type === 'bodyMedium' && styles.bodyMedium,
        type === 'bodySmall' && styles.bodySmall,
        type === 'caption' && styles.caption,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  smallBold: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: 20,
  },
  default: {
    fontFamily: Fonts.poppins,
    fontSize: 14,
    lineHeight: 22,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 48,
    lineHeight: 52,
  },
  subtitle: {
    fontFamily: Fonts.semibold,
    fontSize: 32,
    lineHeight: 44,
  },
  link: {
    fontFamily: Fonts.poppins,
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    fontFamily: Fonts.poppins,
    lineHeight: 30,
    fontSize: 14,
    color: '#6C4EF5',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
  h1: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    lineHeight: 38,
  },
  h2: {
    fontFamily: Fonts.semibold,
    fontSize: 24,
    lineHeight: 31,
  },
  h3: {
    fontFamily: Fonts.semibold,
    fontSize: 20,
    lineHeight: 26,
  },
  h4: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 22,
  },
  bodyLarge: {
    fontFamily: Fonts.poppins,
    fontSize: 16,
    lineHeight: 26,
  },
  bodyMedium: {
    fontFamily: Fonts.poppins,
    fontSize: 14,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: Fonts.poppins,
    fontSize: 13,
    lineHeight: 21,
  },
  caption: {
    fontFamily: Fonts.poppins,
    fontSize: 11,
    lineHeight: 15,
  },
});
