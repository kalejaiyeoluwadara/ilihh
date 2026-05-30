import { Text, View } from 'react-native';

import { ReviewCard } from '@/components/review-card';
import { StarIcon } from '@/components/icons';
import type { ArtisanReview } from '@/types/artisan-detail';

interface ReviewsSectionProps {
  reviews: ArtisanReview[];
  rating: number;
  reviewsCount: number;
}

export function ReviewsSection({ reviews, rating, reviewsCount }: ReviewsSectionProps) {
  return (
    <View className="mb-8">
      <Text className="mb-1 font-poppins-semibold text-base text-text-primary dark:text-slate-100">
        Reviews & Ratings
      </Text>
      <Text className="mb-4 font-poppins text-xs text-text-secondary dark:text-slate-500">
        What clients say about this artisan
      </Text>

      <View className="mb-4 flex-row items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <View className="items-center">
          <Text className="font-poppins-bold text-3xl text-text-primary dark:text-slate-50">
            {rating}
          </Text>
          <View className="mt-1 flex-row items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                color={index < Math.round(rating) ? '#F59E0B' : '#CBD5E1'}
              />
            ))}
          </View>
        </View>
        <View className="h-10 w-px bg-slate-100 dark:bg-slate-800" />
        <View>
          <Text className="font-poppins-semibold text-sm text-text-primary dark:text-slate-100">
            {reviewsCount} reviews
          </Text>
          <Text className="mt-0.5 font-poppins text-[11px] text-text-secondary dark:text-slate-500">
            Based on verified client feedback
          </Text>
        </View>
      </View>

      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </View>
  );
}
