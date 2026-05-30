import { Text, View } from 'react-native';

import type { BookingStatus } from '@/types/booking';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; containerClass: string; textClass: string }
> = {
  pending: {
    label: 'Pending',
    containerClass: 'bg-amber-50 dark:bg-amber-950/40',
    textClass: 'text-amber-700 dark:text-amber-400',
  },
  accepted: {
    label: 'Accepted',
    containerClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    textClass: 'text-emerald-700 dark:text-emerald-400',
  },
  declined: {
    label: 'Declined',
    containerClass: 'bg-red-50 dark:bg-red-950/40',
    textClass: 'text-red-700 dark:text-red-400',
  },
  completed: {
    label: 'Completed',
    containerClass: 'bg-slate-100 dark:bg-slate-800',
    textClass: 'text-slate-600 dark:text-slate-300',
  },
  cancelled: {
    label: 'Cancelled',
    containerClass: 'bg-slate-100 dark:bg-slate-800',
    textClass: 'text-slate-500 dark:text-slate-400',
  },
};

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View className={`rounded-full px-2.5 py-1 ${config.containerClass}`}>
      <Text className={`font-poppins-semibold text-[10px] ${config.textClass}`}>
        {config.label}
      </Text>
    </View>
  );
}
