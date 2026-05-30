import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { BookingSuccessContent } from '@/components/booking-success-content';
import { BackIcon } from '@/components/icons';
import { getRedirectHref } from '@/lib/navigation';
import { getBookingById, useBookingStore } from '@/store/use-booking-store';

export default function BookingSuccessScreen() {
  const { bookingId } = useLocalSearchParams<{ id: string; bookingId?: string }>();
  const bookings = useBookingStore((state) => state.bookings);

  const resolvedBookingId = typeof bookingId === 'string' ? bookingId : undefined;
  const booking = resolvedBookingId ? getBookingById(bookings, resolvedBookingId) : undefined;

  const handleViewBookings = () => {
    router.replace(getRedirectHref('/?tab=bookings'));
  };

  const handleGoHome = () => {
    router.replace('/');
  };

  if (!booking) {
    return (
      <View className="flex-1 bg-white dark:bg-slate-950">
        <SafeAreaView style={styles.safeArea}>
          <View className="px-6 pt-2">
            <TouchableOpacity
              onPress={handleGoHome}
              activeOpacity={0.7}
              className="mb-8 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
            >
              <BackIcon size={18} color="#64748B" />
            </TouchableOpacity>
            <Text className="font-poppins-bold text-xl text-text-primary dark:text-slate-50">
              Booking not found
            </Text>
            <Text className="mt-2 font-poppins text-sm text-text-secondary dark:text-slate-400">
              This confirmation may have expired. Check your Bookings tab for recent requests.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <SafeAreaView style={styles.safeArea}>
        <BookingSuccessContent
          booking={booking}
          onViewBookings={handleViewBookings}
          onGoHome={handleGoHome}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
