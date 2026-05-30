import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { images } from '@/constants/images';

interface HomeHeaderProps {
  userName?: string;
  userLocation?: string;
  isAuthenticated?: boolean;
  onNotificationPress?: () => void;
  onLoginPress?: () => void;
}

export function HomeHeader({
  userName = 'Guest',
  userLocation = 'Ilisan, Ogun State',
  isAuthenticated = false,
  onNotificationPress,
  onLoginPress,
}: HomeHeaderProps) {
  return (
    <View className="flex-row justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-900">
      <View className="flex-row items-center gap-3">
        <Image
          source={images.mascotHappy}
          style={styles.profileAvatar}
          contentFit="contain"
        />
        <View>
          <Text className="font-poppins-bold text-base text-text-primary dark:text-slate-50">
            {userName}
          </Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-400">
              {userLocation}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={onNotificationPress}
          activeOpacity={0.7}
          className="w-10 h-10 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl items-center justify-center relative"
        >
          <Text className="text-lg">🔔</Text>
          <View className="absolute top-1.5 right-2 w-2 h-2 bg-danger rounded-full border border-white dark:border-slate-900" />
        </TouchableOpacity>

        {!isAuthenticated ? (
          <TouchableOpacity
            onPress={onLoginPress}
            activeOpacity={0.8}
            className="bg-primary-purple px-4 py-2.5 rounded-2xl shadow-sm shadow-primary-purple/25"
          >
            <Text className="font-poppins-semibold text-xs text-white">Login</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileAvatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
  },
});
