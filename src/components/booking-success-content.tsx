import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

import { BookingStatusBadge } from '@/components/booking-status-badge';
import { CalendarIcon, CheckCircleIcon, ClockIcon, LocationIcon } from '@/components/icons';
import { PrimaryButton } from '@/components/primary-button';
import { images } from '@/constants/images';
import type { ClientBooking } from '@/types/booking';

interface BookingSuccessContentProps {
  booking: ClientBooking;
  onViewBookings: () => void;
  onGoHome: () => void;
}

export function BookingSuccessContent({
  booking,
  onViewBookings,
  onGoHome,
}: BookingSuccessContentProps) {
  return (
    <View className="flex-1 justify-center px-6 pb-8">
      <View className="items-center">
        <View className="relative mb-6 items-center justify-center">
          <View className="h-28 w-28 items-center justify-center rounded-[36px] bg-indigo-50 dark:bg-indigo-950/40">
            <Image source={images.mascotHappy} style={styles.mascot} contentFit="cover" />
          </View>
          <View className="absolute -bottom-1 -right-1 rounded-full border-4 border-white bg-white dark:border-slate-950 dark:bg-slate-950">
            <CheckCircleIcon size={34} color="#10B981" />
          </View>
        </View>

        <Text className="text-center font-poppins-bold text-2xl text-text-primary dark:text-slate-50">
          Request sent!
        </Text>
        <Text className="mt-3 max-w-[300px] text-center font-poppins text-sm leading-relaxed text-text-secondary dark:text-slate-400">
          Your booking request has been sent to {booking.artisanName}. They will review it and get
          back to you soon.
        </Text>
      </View>

      <View className="mt-8 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <View className="mb-4 flex-row items-center gap-3">
          <Image source={{ uri: booking.artisanAvatar }} style={styles.avatar} contentFit="cover" />
          <View className="flex-1">
            <Text className="font-poppins-bold text-base text-text-primary dark:text-slate-50">
              {booking.artisanName}
            </Text>
            <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400">
              {booking.artisanCategory}
            </Text>
          </View>
          <BookingStatusBadge status={booking.status} />
        </View>

        <View className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/50">
          <Text className="font-poppins text-xs leading-relaxed text-text-secondary dark:text-slate-400">
            {booking.serviceDescription}
          </Text>
        </View>

        <View className="mt-4 gap-2.5">
          <View className="flex-row items-center gap-2.5">
            <CalendarIcon size={15} color="#94A3B8" />
            <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400">
              {booking.preferredDate}
            </Text>
          </View>
          <View className="flex-row items-center gap-2.5">
            <ClockIcon size={15} color="#94A3B8" />
            <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400">
              {booking.preferredTime}
            </Text>
          </View>
          <View className="flex-row items-center gap-2.5">
            <LocationIcon size={15} color="#94A3B8" />
            <Text className="flex-1 font-poppins text-xs text-text-secondary dark:text-slate-400">
              {booking.location}
            </Text>
          </View>
        </View>

        {booking.budget ? (
          <Text className="mt-4 font-poppins-bold text-sm text-primary-purple dark:text-indigo-400">
            Budget: {booking.budget}
          </Text>
        ) : null}
      </View>

      <View className="mt-8">
        <PrimaryButton label="View My Bookings" onPress={onViewBookings} />
        <TouchableOpacity
          onPress={onGoHome}
          activeOpacity={0.8}
          className="mt-3 items-center rounded-2xl border border-slate-200 py-4 dark:border-slate-800"
        >
          <Text className="font-poppins-semibold text-sm text-text-primary dark:text-slate-200">
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mascot: {
    width: 72,
    height: 72,
    borderRadius: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
  },
});
