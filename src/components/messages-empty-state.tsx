import { Text, TouchableOpacity, View } from 'react-native';

import { MessageIcon } from '@/components/icons';

interface MessagesEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function MessagesEmptyState({
  title,
  description,
  actionLabel,
  onActionPress,
}: MessagesEmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-8 dark:bg-slate-950">
      <View className="max-w-[280px] items-center">
        <View className="mb-6 h-20 w-20 items-center justify-center rounded-[28px] border border-indigo-100/50 bg-indigo-50 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <MessageIcon size={32} color="#7C3AED" />
        </View>

        <Text className="mb-2 text-center font-poppins-bold text-lg text-text-primary dark:text-slate-50">
          {title}
        </Text>

        <Text className="mb-8 text-center font-poppins text-xs leading-[18px] text-text-secondary dark:text-slate-400">
          {description}
        </Text>

        {actionLabel && onActionPress ? (
          <TouchableOpacity
            onPress={onActionPress}
            activeOpacity={0.8}
            className="w-full items-center rounded-2xl bg-primary-purple px-6 py-3 shadow-sm shadow-primary-purple/20"
          >
            <Text className="font-poppins-semibold text-xs text-white">{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
