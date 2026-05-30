import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { StarIcon } from '@/components/icons';
import type { ArtisanReview } from '@/types/artisan-detail';

interface ReviewCardProps {
  review: ArtisanReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View className="mb-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <View className="flex-row items-start gap-3">
        {review.clientAvatar ? (
          <Image source={{ uri: review.clientAvatar }} style={styles.avatar} contentFit="cover" />
        ) : (
          <View className="h-9 w-9 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800">
            <Text className="font-poppins-bold text-xs text-text-secondary dark:text-slate-400">
              {review.clientName.charAt(0)}
            </Text>
          </View>
        )}

        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-100">
              {review.clientName}
            </Text>
            <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-500">
              {review.date}
            </Text>
          </View>

          <Text className="mt-0.5 font-poppins text-[10px] text-primary-purple dark:text-indigo-400">
            {review.serviceType}
          </Text>

          <View className="mt-1.5 flex-row items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                size={11}
                color={index < review.rating ? '#F59E0B' : '#CBD5E1'}
              />
            ))}
          </View>

          <Text className="mt-2 font-poppins text-xs leading-relaxed text-text-secondary dark:text-slate-400">
            {review.comment}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 0,
  },
});
