import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { ArtisanDetailFooter } from '@/components/artisan-detail-footer';
import { ArtisanDetailHeader } from '@/components/artisan-detail-header';
import { BillingSection } from '@/components/billing-section';
import { ContactDetailsSection } from '@/components/contact-details-section';
import { BackIcon } from '@/components/icons';
import { PortfolioSection } from '@/components/portfolio-section';
import { ReviewsSection } from '@/components/reviews-section';
import { getArtisanDetail } from '@/lib/artisans';
import { getRedirectHref } from '@/lib/navigation';
import { useAuthStore } from '@/store/use-auth-store';

export default function ArtisanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const artisan = typeof id === 'string' ? getArtisanDetail(id) : undefined;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleBookPress = () => {
    if (!artisan?.isAvailable) return;

    const bookRoute = `/artisan/${artisan.id}/book`;

    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(bookRoute)}`);
      return;
    }

    router.push(getRedirectHref(bookRoute));
  };

  if (!artisan) {
    return (
      <View className="flex-1 bg-white dark:bg-slate-950">
        <SafeAreaView style={styles.safeArea}>
          <View className="px-6 pt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="mb-8 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
            >
              <BackIcon size={18} color="#64748B" />
            </TouchableOpacity>
            <Text className="font-poppins-bold text-xl text-text-primary dark:text-slate-50">
              Artisan not found
            </Text>
            <Text className="mt-2 font-poppins text-sm text-text-secondary dark:text-slate-400">
              This profile may have been removed or the link is invalid.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="px-6 pt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="mb-4 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
            >
              <BackIcon size={18} color="#64748B" />
            </TouchableOpacity>

            <ArtisanDetailHeader artisan={artisan} />

            <View className="mb-8 mt-6">
              <Text className="mb-1 font-poppins-semibold text-base text-text-primary dark:text-slate-100">
                About
              </Text>
              <Text className="font-poppins text-sm leading-relaxed text-text-secondary dark:text-slate-400">
                {artisan.bio}
              </Text>
            </View>

            <PortfolioSection items={artisan.portfolio} />
            <ReviewsSection
              reviews={artisan.reviews}
              rating={artisan.rating}
              reviewsCount={artisan.reviewsCount}
            />
            <ContactDetailsSection contact={artisan.contact} />
            {artisan.billing ? <BillingSection billing={artisan.billing} /> : null}
          </View>
        </ScrollView>

        <ArtisanDetailFooter
          rate={artisan.rate}
          isAvailable={artisan.isAvailable}
          onBookPress={handleBookPress}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
});
