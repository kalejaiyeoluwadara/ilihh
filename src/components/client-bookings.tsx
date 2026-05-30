import { Text, TouchableOpacity, View } from 'react-native';

interface ClientBookingsProps {
  onBrowsePress: () => void;
}

export function ClientBookings({ onBrowsePress }: ClientBookingsProps) {
  return (
    <View className="flex-1 justify-center items-center px-8 bg-white dark:bg-slate-950">
      <View className="items-center max-w-[280px]">
        {/* Animated-like circular emoji card container */}
        <View className="w-20 h-20 bg-indigo-50 dark:bg-slate-900 border border-indigo-100/50 dark:border-slate-800 rounded-[28px] items-center justify-center mb-6 shadow-sm">
          <Text className="text-4xl">📅</Text>
        </View>

        <Text className="font-poppins-bold text-lg text-text-primary dark:text-slate-50 text-center mb-2">
          No bookings yet
        </Text>
        
        <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400 text-center leading-[18px] mb-8">
          Looking for a quick fix or project help? Find local artisans in your neighborhood and book them instantly.
        </Text>

        <TouchableOpacity
          onPress={onBrowsePress}
          activeOpacity={0.8}
          className="bg-primary-purple px-6 py-3 rounded-2xl shadow-sm shadow-primary-purple/20 flex-row items-center justify-center w-full"
        >
          <Text className="font-poppins-semibold text-xs text-white mr-1.5">
            Browse Artisans
          </Text>
          <Text className="text-xs text-white">🔍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
