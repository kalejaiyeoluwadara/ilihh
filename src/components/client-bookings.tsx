import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ClientBookingCard } from '@/components/client-booking-card';
import { SearchIcon } from '@/components/icons';
import { buildClientConversationPayload, startConversation } from '@/lib/start-conversation';
import { getBookingsForClient, useBookingStore } from '@/store/use-booking-store';
import { useAuthStore } from '@/store/use-auth-store';
import type { ClientBooking } from '@/types/booking';

interface ClientBookingsProps {
  onBrowsePress: () => void;
}

export function ClientBookings({ onBrowsePress }: ClientBookingsProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const bookings = useBookingStore((state) => state.bookings);
  const cancelBooking = useBookingStore((state) => state.cancelBooking);

  const clientBookings = user ? getBookingsForClient(bookings, user.id) : [];

  const handleChatPress = (booking: ClientBooking) => {
    if (!user) return;

    const payload = buildClientConversationPayload(
      user,
      {
        id: booking.artisanId,
        name: booking.artisanName,
        avatar: booking.artisanAvatar,
        category: booking.artisanCategory,
      },
      booking.id
    );

    startConversation(payload, isAuthenticated, '/?tab=bookings');
  };

  if (clientBookings.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-8 dark:bg-slate-950">
        <View className="max-w-[280px] items-center">
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-[28px] border border-indigo-100/50 bg-indigo-50 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SearchIcon size={32} color="#7C3AED" />
          </View>

          <Text className="mb-2 text-center font-poppins-bold text-lg text-text-primary dark:text-slate-50">
            No bookings yet
          </Text>

          <Text className="mb-8 text-center font-poppins text-xs leading-[18px] text-text-secondary dark:text-slate-400">
            Looking for a quick fix or project help? Find local artisans in your neighborhood and
            book them instantly.
          </Text>

          <TouchableOpacity
            onPress={onBrowsePress}
            activeOpacity={0.8}
            className="w-full flex-row items-center justify-center rounded-2xl bg-primary-purple px-6 py-3 shadow-sm shadow-primary-purple/20"
          >
            <Text className="font-poppins-semibold text-xs text-white">Browse Artisans</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="px-6 pt-4">
          <Text className="mb-1 font-poppins-bold text-lg text-text-primary dark:text-slate-50">
            My Bookings
          </Text>
          <Text className="mb-4 font-poppins text-xs text-text-secondary dark:text-slate-400">
            Track your service requests and booking status.
          </Text>

          {clientBookings.map((booking) => (
            <ClientBookingCard
              key={booking.id}
              booking={booking}
              onCancel={cancelBooking}
              onChatPress={handleChatPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
});
