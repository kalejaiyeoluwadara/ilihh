import { Text, TouchableOpacity, View } from 'react-native';

import { ChevronRightIcon } from '@/components/icons';

interface ProfileSettingsRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  titleClassName?: string;
  showDivider?: boolean;
}

export function ProfileSettingsRow({
  icon,
  title,
  subtitle,
  onPress,
  titleClassName = 'text-text-primary dark:text-slate-100',
  showDivider = true,
}: ProfileSettingsRowProps) {
  const content = (
    <View
      className={`flex-row items-center justify-between px-5 py-4 ${
        showDivider ? 'border-b border-slate-100/50 dark:border-slate-800/50' : ''
      }`}
    >
      <View className="flex-1 flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-950">
          {icon}
        </View>
        <View className="flex-1">
          <Text className={`font-poppins-semibold text-xs ${titleClassName}`}>{title}</Text>
          {subtitle ? (
            <Text className="mt-0.5 font-poppins text-[10px] text-text-secondary dark:text-slate-400">
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {onPress ? <ChevronRightIcon size={14} color="#94A3B8" /> : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  );
}
