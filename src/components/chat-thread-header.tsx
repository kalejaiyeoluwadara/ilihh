import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

import { BackIcon } from '@/components/icons';

interface ChatThreadHeaderProps {
  name: string;
  avatar: string;
  subtitle: string;
  onBackPress: () => void;
}

export function ChatThreadHeader({
  name,
  avatar,
  subtitle,
  onBackPress,
}: ChatThreadHeaderProps) {
  return (
    <View className="border-b border-slate-100 bg-white px-4 pb-3 pt-2 dark:border-slate-800 dark:bg-slate-950">
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={onBackPress}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
        >
          <BackIcon size={18} color="#64748B" />
        </TouchableOpacity>

        <Image source={{ uri: avatar }} style={styles.avatar} contentFit="cover" />

        <View className="min-w-0 flex-1">
          <Text
            className="font-poppins-bold text-base text-text-primary dark:text-slate-50"
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            {subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
  },
});
