import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { BookingRequest } from '@/data/artisans';

interface BookingRequestCardProps {
  request: BookingRequest;
  onAccept: (id: string, price: string) => void;
  onDecline: (id: string) => void;
}

export function BookingRequestCard({ request, onAccept, onDecline }: BookingRequestCardProps) {
  return (
    <View className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-4 mb-4">
      <View className="flex-row items-center gap-3 mb-3">
        <Image
          source={{ uri: request.clientAvatar }}
          style={styles.avatar}
          contentFit="cover"
        />
        <View className="flex-1">
          <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
            {request.clientName}
          </Text>
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400">
            📍 {request.location} • 📅 {request.date}
          </Text>
        </View>
        <Text className="font-poppins-bold text-base text-primary-purple dark:text-indigo-400">
          {request.price}
        </Text>
      </View>

      <View className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 mb-4">
        <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-200">
          {request.serviceNeeded}
        </Text>
        <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400 mt-1 leading-relaxed">
          {request.description}
        </Text>
      </View>

      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => onDecline(request.id)}
          activeOpacity={0.8}
          className="flex-1 bg-slate-100 dark:bg-slate-800 py-3 rounded-2xl items-center"
        >
          <Text className="font-poppins-semibold text-xs text-slate-700 dark:text-slate-300">
            Decline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onAccept(request.id, request.price)}
          activeOpacity={0.8}
          className="flex-1 bg-primary-purple py-3 rounded-2xl items-center"
        >
          <Text className="font-poppins-semibold text-xs text-white">
            Accept Job
          </Text>
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
