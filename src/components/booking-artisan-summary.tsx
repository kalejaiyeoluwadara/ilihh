import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { VerifiedIcon } from '@/components/icons';
import type { ArtisanDetail } from '@/types/artisan-detail';

interface BookingArtisanSummaryProps {
  artisan: Pick<
    ArtisanDetail,
    'name' | 'avatar' | 'category' | 'rate' | 'isVerified' | 'location'
  >;
}

export function BookingArtisanSummary({ artisan }: BookingArtisanSummaryProps) {
  return (
    <View className="mb-6 flex-row items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      <Image source={{ uri: artisan.avatar }} style={styles.avatar} contentFit="cover" />
      <View className="flex-1">
        <View className="flex-row items-center gap-1.5">
          <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
            {artisan.name}
          </Text>
          {artisan.isVerified ? <VerifiedIcon size={14} color="#7C3AED" /> : null}
        </View>
        <Text className="mt-0.5 font-poppins text-xs text-text-secondary dark:text-slate-400">
          {artisan.category} • {artisan.location}
        </Text>
        <Text className="mt-1 font-poppins-semibold text-xs text-primary-purple dark:text-indigo-400">
          Starting at {artisan.rate}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
  },
});
