import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ArtisanDetailFooterProps {
  rate: string;
  isAvailable: boolean;
  onBookPress: () => void;
}

export function ArtisanDetailFooter({ rate, isAvailable, onBookPress }: ArtisanDetailFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}
      className="border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950"
    >
      <View className="px-6 pt-3">
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="font-poppins text-[10px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
              Starting at
            </Text>
            <Text className="mt-0.5 font-poppins-bold text-base text-text-primary dark:text-slate-50">
              {rate}
            </Text>
          </View>

          <TouchableOpacity
            onPress={onBookPress}
            disabled={!isAvailable}
            activeOpacity={0.85}
            className={`rounded-2xl px-6 py-3.5 ${
              isAvailable
                ? 'bg-primary-purple shadow-sm shadow-primary-purple/30'
                : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            <Text
              className={`font-poppins-semibold text-sm ${
                isAvailable ? 'text-white' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {isAvailable ? 'Book Now' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
      default: {},
    }),
  },
});
