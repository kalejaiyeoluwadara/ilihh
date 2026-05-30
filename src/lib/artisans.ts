import { ARTISAN_DETAILS } from '@/data/artisan-details';
import type { ArtisanDetail, ArtisanSummary } from '@/types/artisan-detail';

export function getArtisanDetail(id: string): ArtisanDetail | undefined {
  return ARTISAN_DETAILS.find((artisan) => artisan.id === id);
}

export function getAllArtisanSummaries(): ArtisanSummary[] {
  return ARTISAN_DETAILS.map(
    ({
      id,
      name,
      category,
      rating,
      reviewsCount,
      jobsCompleted,
      location,
      distance,
      rate,
      bio,
      avatar,
      isVerified,
      isAvailable,
    }) => ({
      id,
      name,
      category,
      rating,
      reviewsCount,
      jobsCompleted,
      location,
      distance,
      rate,
      bio,
      avatar,
      isVerified,
      isAvailable,
    })
  );
}
