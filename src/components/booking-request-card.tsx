import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

import { BookingRequest } from '@/data/artisans';

interface BookingRequestCardProps {
  request: BookingRequest;
  onAccept: (id: string, price: string) => void;
  onDecline: (id: string) => void;
  onMessagePress?: (request: BookingRequest) => void;
}

export function BookingRequestCard({
  request,
  onAccept,
  onDecline,
  onMessagePress,
}: BookingRequestCardProps) {
  return (
    <View className="mb-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
      <View className="mb-3 flex-row items-center gap-3">
        <Image source={{ uri: request.clientAvatar }} style={styles.avatar} contentFit="cover" />
        <View className="flex-1">
          <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
            {request.clientName}
          </Text>
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            {request.location} • {request.date}
          </Text>
        </View>
        <Text className="font-poppins-bold text-base text-primary-purple dark:text-indigo-400">
          {request.price}
        </Text>
      </View>

      <View className="mb-4 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/50">
        <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-200">
          {request.serviceNeeded}
        </Text>
        <Text className="mt-1 font-poppins text-xs leading-relaxed text-text-secondary dark:text-slate-400">
          {request.description}
        </Text>
      </View>

      {onMessagePress ? (
        <TouchableOpacity
          onPress={() => onMessagePress(request)}
          activeOpacity={0.8}
          className="mb-3 items-center rounded-2xl border border-slate-200 bg-slate-50 py-3 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-200">
            Message Client
          </Text>
        </TouchableOpacity>
      ) : null}

      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => onDecline(request.id)}
          activeOpacity={0.8}
          className="flex-1 items-center rounded-2xl bg-slate-100 py-3 dark:bg-slate-800"
        >
          <Text className="font-poppins-semibold text-xs text-slate-700 dark:text-slate-300">
            Decline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onAccept(request.id, request.price)}
          activeOpacity={0.8}
          className="flex-1 items-center rounded-2xl bg-primary-purple py-3"
        >
          <Text className="font-poppins-semibold text-xs text-white">Accept Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
  },
});
