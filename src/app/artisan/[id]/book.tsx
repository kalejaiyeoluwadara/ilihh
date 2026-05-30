import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { AuthTextInput } from '@/components/auth-text-input';
import { BookingArtisanSummary } from '@/components/booking-artisan-summary';
import { BookingDateTimeField } from '@/components/booking-datetime-field';
import { BackIcon } from '@/components/icons';
import { PrimaryButton } from '@/components/primary-button';
import { validateBookingForm } from '@/lib/booking-validation';
import {
  formatBookingDate,
  formatBookingTime,
  getDefaultBookingDate,
  getDefaultBookingTime,
  getMaximumBookingDate,
} from '@/lib/booking-format';
import { getArtisanDetail } from '@/lib/artisans';
import { getRedirectHref } from '@/lib/navigation';
import { useAuthStore } from '@/store/use-auth-store';
import { useBookingStore } from '@/store/use-booking-store';
import type { BookingValidationErrors } from '@/types/booking';

export default function BookArtisanScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { id } = useLocalSearchParams<{ id: string }>();
  const artisan = typeof id === 'string' ? getArtisanDetail(id) : undefined;

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const createBooking = useBookingStore((state) => state.createBooking);

  const [serviceDescription, setServiceDescription] = useState('');
  const [location, setLocation] = useState(user?.location ?? '');
  const [preferredDate, setPreferredDate] = useState<Date | null>(getDefaultBookingDate());
  const [preferredTime, setPreferredTime] = useState<Date | null>(getDefaultBookingTime());
  const [budget, setBudget] = useState(artisan?.rate ?? '');
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const iconColor = isDark ? '#94A3B8' : '#64748B';

  useEffect(() => {
    if (!isAuthenticated && typeof id === 'string') {
      router.replace(getRedirectHref(`/login?redirect=${encodeURIComponent(`/artisan/${id}/book`)}`));
    }
  }, [isAuthenticated, id]);

  if (!isAuthenticated) {
    return null;
  }

  if (!artisan) {
    return (
      <AuthScreenLayout
        header={
          <View className="pt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="mb-8 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
            >
              <BackIcon size={18} color={iconColor} />
            </TouchableOpacity>
            <Text className="font-poppins-bold text-xl text-text-primary dark:text-slate-50">
              Artisan not found
            </Text>
            <Text className="mt-2 font-poppins text-sm text-text-secondary dark:text-slate-400">
              This profile may have been removed or the link is invalid.
            </Text>
          </View>
        }
      >
        <View />
      </AuthScreenLayout>
    );
  }

  if (!artisan.isAvailable) {
    return (
      <AuthScreenLayout
        header={
          <View className="pt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="mb-8 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
            >
              <BackIcon size={18} color={iconColor} />
            </TouchableOpacity>
            <Text className="font-poppins-bold text-xl text-text-primary dark:text-slate-50">
              Currently unavailable
            </Text>
            <Text className="mt-2 font-poppins text-sm text-text-secondary dark:text-slate-400">
              {artisan.name} is not accepting new bookings right now.
            </Text>
          </View>
        }
      >
        <View />
      </AuthScreenLayout>
    );
  }

  const handleSubmit = () => {
    if (!user) return;

    const formValues = {
      serviceDescription,
      location,
      preferredDate,
      preferredTime,
      budget,
    };

    const validation = validateBookingForm(formValues);
    setErrors(validation.errors);

    if (!validation.isValid || !preferredDate || !preferredTime) {
      setFormError(null);
      return;
    }

    createBooking({
      clientId: user.id,
      artisanId: artisan.id,
      artisanName: artisan.name,
      artisanAvatar: artisan.avatar,
      artisanCategory: artisan.category,
      serviceDescription,
      location,
      preferredDate: formatBookingDate(preferredDate),
      preferredTime: formatBookingTime(preferredTime),
      budget: budget || artisan.rate,
    });

    router.replace('/');
  };

  return (
    <AuthScreenLayout
      header={
        <View className="pt-2">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="mb-6 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
          >
            <BackIcon size={18} color={iconColor} />
          </TouchableOpacity>

          <Text className="font-poppins-bold text-2xl text-text-primary dark:text-slate-50">
            Book {artisan.name}
          </Text>
          <Text className="mt-2 font-poppins mb-4 text-sm text-text-secondary dark:text-slate-400">
            Describe your job and when you need it done. The artisan will review your request.
          </Text>
        </View>
      }
    >
      <BookingArtisanSummary artisan={artisan} />

      <AuthTextInput
        label="What do you need done?"
        value={serviceDescription}
        onChangeText={setServiceDescription}
        placeholder="e.g. Fix leaking kitchen tap and replace worn washers"
        error={errors.serviceDescription}
      />

      <AuthTextInput
        label="Service location"
        value={location}
        onChangeText={setLocation}
        placeholder="Where should the artisan come?"
        error={errors.location}
      />

      <BookingDateTimeField
        label="Preferred date"
        mode="date"
        value={preferredDate}
        onChange={setPreferredDate}
        minimumDate={getDefaultBookingDate()}
        maximumDate={getMaximumBookingDate()}
        error={errors.preferredDate}
      />

      <BookingDateTimeField
        label="Preferred time"
        mode="time"
        value={preferredTime}
        onChange={setPreferredTime}
        error={errors.preferredTime}
      />

      <AuthTextInput
        label="Budget (optional)"
        value={budget}
        onChangeText={setBudget}
        placeholder={artisan.rate}
        error={errors.budget}
      />

      {formError ? (
        <Text className="mb-2 font-poppins text-xs text-danger">{formError}</Text>
      ) : null}

      <PrimaryButton label="Send Booking Request" onPress={handleSubmit} />
    </AuthScreenLayout>
  );
}
