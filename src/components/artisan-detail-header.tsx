import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { BriefcaseIcon, ClockIcon, LocationIcon, StarIcon, VerifiedIcon } from '@/components/icons';
import type { ArtisanDetail } from '@/types/artisan-detail';

interface ArtisanDetailHeaderProps {
  artisan: ArtisanDetail;
}

export function ArtisanDetailHeader({ artisan }: ArtisanDetailHeaderProps) {
  return (
    <View className="items-center pb-2">
      <Image source={{ uri: artisan.avatar }} style={styles.avatar} contentFit="cover" transition={200} />

      <View className="mt-4 flex-row items-center gap-1.5">
        <Text className="font-poppins-bold text-xl text-text-primary dark:text-slate-50">
          {artisan.name}
        </Text>
        {artisan.isVerified && <VerifiedIcon size={16} color="#4D8BFF" />}
      </View>

      <View className="mt-2 self-center rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
        <Text className="font-poppins-medium text-[11px] capitalize text-text-secondary dark:text-slate-300">
          {artisan.category}
        </Text>
      </View>

      <View className="mt-3 flex-row items-center gap-1">
        <LocationIcon size={12} color="#94A3B8" />
        <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400">
          {artisan.location} • {artisan.distance}
        </Text>
      </View>

      <View className="mt-4 flex-row flex-wrap items-center justify-center gap-2">
        <View className="flex-row items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
          <StarIcon size={13} color="#F59E0B" />
          <Text className="font-poppins-bold text-xs text-text-primary dark:text-slate-100">
            {artisan.rating}
          </Text>
          <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-500">
            ({artisan.reviewsCount} reviews)
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
          <BriefcaseIcon size={12} color="#64748B" />
          <Text className="font-poppins-bold text-xs text-text-primary dark:text-slate-100">
            {artisan.jobsCompleted} jobs
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
          <ClockIcon size={12} color="#64748B" />
          <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-400">
            {artisan.yearsExperience} yrs exp.
          </Text>
        </View>
      </View>

      <Text className="mt-3 text-center font-poppins text-[11px] text-text-secondary dark:text-slate-500">
        {artisan.responseTime}
      </Text>

      <View
        className={`mt-3 rounded-full px-3 py-1 ${
          artisan.isAvailable
            ? 'bg-emerald-50 dark:bg-emerald-950/30'
            : 'bg-slate-100 dark:bg-slate-800'
        }`}
      >
        <Text
          className={`font-poppins-semibold text-[10px] ${
            artisan.isAvailable
              ? 'text-emerald-700 dark:text-emerald-400'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {artisan.isAvailable ? 'Available for booking' : 'Currently unavailable'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 28,
    borderWidth: 0,
  },
});
