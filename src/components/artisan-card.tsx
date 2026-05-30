import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Artisan } from '@/data/artisans';

interface ArtisanCardProps {
  artisan: Artisan;
  onBookPress?: () => void;
}

export function ArtisanCard({ artisan, onBookPress }: ArtisanCardProps) {
  return (
    <View className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-4 mb-4 shadow-sm shadow-slate-100/50 dark:shadow-none">
      <View className="flex-row items-start gap-3">
        <Image
          source={{ uri: artisan.avatar }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
              {artisan.name}
            </Text>
            {artisan.isVerified && <Text className="text-xs">🔰</Text>}
          </View>
          <Text className="font-poppins text-xs text-primary-purple dark:text-indigo-400 capitalize mt-0.5">
            {artisan.category} • {artisan.location}
          </Text>
          <Text className="font-poppins text-[11px] text-text-secondary dark:text-slate-400 mt-2 leading-relaxed" numberOfLines={2}>
            {artisan.bio}
          </Text>
        </View>
      </View>

      {/* Rating, Rate and Action Row */}
      <View className="flex-row items-center justify-between border-t border-slate-50 dark:border-slate-800/50 mt-4 pt-3">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <Text className="text-xs">⭐</Text>
            <Text className="font-poppins-bold text-xs text-text-primary dark:text-slate-50">
              {artisan.rating}
            </Text>
            <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-500">
              ({artisan.reviewsCount} reviews)
            </Text>
          </View>
          <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-300">
            {artisan.rate}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onBookPress}
          activeOpacity={0.8}
          className="bg-primary-purple/10 dark:bg-primary-purple/20 px-4 py-2 rounded-xl"
        >
          <Text className="font-poppins-semibold text-xs text-primary-purple dark:text-indigo-300">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 20,
  },
});
