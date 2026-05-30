import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { BookingStatusBadge } from '@/components/booking-status-badge';
import { CalendarIcon, ClockIcon, LocationIcon } from '@/components/icons';
import type { ArtisanTask } from '@/lib/artisan-tasks';

interface ArtisanTaskCardProps {
  task: ArtisanTask;
}

export function ArtisanTaskCard({ task }: ArtisanTaskCardProps) {
  return (
    <View className="mb-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
      <View className="mb-3 flex-row items-start gap-3">
        <Image source={{ uri: task.clientAvatar }} style={styles.avatar} contentFit="cover" />
        <View className="flex-1">
          <View className="flex-row items-start justify-between gap-2">
            <View className="flex-1">
              <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
                {task.clientName}
              </Text>
              {task.serviceTitle ? (
                <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
                  {task.serviceTitle}
                </Text>
              ) : null}
            </View>
            <BookingStatusBadge status="accepted" />
          </View>
        </View>
      </View>

      <View className="mb-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/50">
        <Text className="font-poppins text-xs leading-relaxed text-text-secondary dark:text-slate-400">
          {task.serviceDescription}
        </Text>
      </View>

      <View className="gap-2">
        <View className="flex-row items-center gap-2">
          <LocationIcon size={14} color="#94A3B8" />
          <Text className="flex-1 font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            {task.location}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <CalendarIcon size={14} color="#94A3B8" />
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            {task.preferredDate}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <ClockIcon size={14} color="#94A3B8" />
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            {task.preferredTime}
          </Text>
        </View>
      </View>

      {task.budget ? (
        <Text className="mt-3 font-poppins-bold text-sm text-primary-purple dark:text-indigo-400">
          Budget: {task.budget}
        </Text>
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
