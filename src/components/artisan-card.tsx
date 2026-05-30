import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

import { Artisan } from '@/data/artisans';
import { BriefcaseIcon, LocationIcon, StarIcon, VerifiedIcon } from '@/components/icons';

interface ArtisanCardProps {
  artisan: Artisan;
  onBookPress?: () => void;
}

export function ArtisanCard({ artisan, onBookPress }: ArtisanCardProps) {
  return (
    <View className="mb-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
      <View className="flex-row items-start gap-3.5">
        <Image
          source={{ uri: artisan.avatar }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />

        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text
              numberOfLines={1}
              className="flex-shrink font-poppins-bold text-sm text-text-primary dark:text-slate-50"
            >
              {artisan.name}
            </Text>
            {artisan.isVerified && <VerifiedIcon size={14} color="#4D8BFF" />}
          </View>

          <View className="mt-1.5 self-start rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
            <Text className="font-poppins-medium text-[10px] capitalize text-text-secondary dark:text-slate-300">
              {artisan.category}
            </Text>
          </View>

          <View className="mt-1.5 flex-row items-center gap-1">
            <LocationIcon size={11} color="#94A3B8" />
            <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
              {artisan.location} • {artisan.distance}
            </Text>
          </View>
        </View>
      </View>

      <Text
        numberOfLines={2}
        className="mt-3 font-poppins text-[11px] leading-relaxed text-text-secondary dark:text-slate-400"
      >
        {artisan.bio}
      </Text>

      <View className="mt-3.5 flex-row items-center gap-2">
        <View className="flex-row items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 dark:bg-slate-800/60">
          <StarIcon size={12} color="#F59E0B" />
          <Text className="font-poppins-bold text-[11px] text-text-primary dark:text-slate-100">
            {artisan.rating}
          </Text>
          <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-500">
            ({artisan.reviewsCount})
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 dark:bg-slate-800/60">
          <BriefcaseIcon size={11} color="#64748B" />
          <Text className="font-poppins-bold text-[11px] text-text-primary dark:text-slate-100">
            {artisan.jobsCompleted}
          </Text>
          <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-500">
            jobs
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between border-t border-slate-50 pt-3 dark:border-slate-800/50">
        <View>
          <Text className="font-poppins text-[9px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
            Starting at
          </Text>
          <Text className="mt-0.5 font-poppins-bold text-sm text-text-primary dark:text-slate-50">
            {artisan.rate}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onBookPress}
          disabled={!artisan.isAvailable}
          activeOpacity={0.85}
          className={`rounded-xl px-5 py-2.5 ${
            artisan.isAvailable
              ? 'bg-primary-purple shadow-sm shadow-primary-purple/30'
              : 'bg-slate-100 dark:bg-slate-800'
          }`}
        >
          <Text
            className={`font-poppins-semibold text-xs ${
              artisan.isAvailable ? 'text-white' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {artisan.isAvailable ? 'Book Now' : 'Unavailable'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    borderWidth: 0,
  },
});
