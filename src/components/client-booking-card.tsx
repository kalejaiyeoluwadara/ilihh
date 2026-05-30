import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

import { BookingStatusBadge } from '@/components/booking-status-badge';
import { CalendarIcon, ClockIcon, LocationIcon } from '@/components/icons';
import type { ClientBooking } from '@/types/booking';

interface ClientBookingCardProps {
  booking: ClientBooking;
  onCancel?: (id: string) => void;
}

export function ClientBookingCard({ booking, onCancel }: ClientBookingCardProps) {
  const canCancel = booking.status === 'pending' && onCancel;

  return (
    <View className="mb-4 rounded-3xl border border-slate-100 bg-white p-4 dark:border-slate-800/80 dark:bg-slate-900">
      <View className="mb-3 flex-row items-start gap-3">
        <Image source={{ uri: booking.artisanAvatar }} style={styles.avatar} contentFit="cover" />
        <View className="flex-1">
          <View className="flex-row items-start justify-between gap-2">
            <View className="flex-1">
              <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
                {booking.artisanName}
              </Text>
              <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
                {booking.artisanCategory}
              </Text>
            </View>
            <BookingStatusBadge status={booking.status} />
          </View>
        </View>
      </View>

      <View className="mb-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/50">
        <Text className="font-poppins text-xs leading-relaxed text-text-secondary dark:text-slate-400">
          {booking.serviceDescription}
        </Text>
      </View>

      <View className="gap-2">
        <View className="flex-row items-center gap-2">
          <LocationIcon size={14} color="#94A3B8" />
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            {booking.location}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <CalendarIcon size={14} color="#94A3B8" />
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            {booking.preferredDate}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <ClockIcon size={14} color="#94A3B8" />
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            {booking.preferredTime}
          </Text>
        </View>
      </View>

      {booking.budget ? (
        <Text className="mt-3 font-poppins-bold text-sm text-primary-purple dark:text-indigo-400">
          Budget: {booking.budget}
        </Text>
      ) : null}

      {canCancel ? (
        <TouchableOpacity
          onPress={() => onCancel(booking.id)}
          activeOpacity={0.8}
          className="mt-4 items-center rounded-2xl bg-slate-100 py-3 dark:bg-slate-800"
        >
          <Text className="font-poppins-semibold text-xs text-slate-700 dark:text-slate-300">
            Cancel Request
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
  },
});
