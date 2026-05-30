import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { images } from '@/constants/images';

interface HomeHeaderProps {
  userRole: 'client' | 'artisan';
  onToggleRole: () => void;
}

export function HomeHeader({ userRole, onToggleRole }: HomeHeaderProps) {
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
            Dara
          </Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-400">
              Ilisan, Ogun State
            </Text>
          </View>
        </View>
      </View>

      {/* Toggle Role Pill Switcher */}
      <View className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 flex-row rounded-full h-10 w-36 relative">
        <TouchableOpacity
          onPress={() => userRole !== 'client' && onToggleRole()}
          activeOpacity={0.9}
          className={`flex-1 items-center justify-center rounded-full ${
            userRole === 'client'
              ? 'bg-primary-purple shadow-sm shadow-primary-purple/35'
              : ''
          }`}
        >
          <Text
            className={`font-poppins-semibold text-xs ${
              userRole === 'client' ? 'text-white' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Client
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => userRole !== 'artisan' && onToggleRole()}
          activeOpacity={0.9}
          className={`flex-1 items-center justify-center rounded-full ${
            userRole === 'artisan'
              ? 'bg-primary-purple shadow-sm shadow-primary-purple/35'
              : ''
          }`}
        >
          <Text
            className={`font-poppins-semibold text-xs ${
              userRole === 'artisan' ? 'text-white' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Artisan
          </Text>
        </TouchableOpacity>
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
