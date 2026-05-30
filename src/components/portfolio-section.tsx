import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import type { PortfolioItem } from '@/types/artisan-detail';

interface PortfolioSectionProps {
  items: PortfolioItem[];
}

export function PortfolioSection({ items }: PortfolioSectionProps) {
  return (
    <View className="mb-8">
      <Text className="mb-1 font-poppins-semibold text-base text-text-primary dark:text-slate-100">
        Recent Work
      </Text>
      <Text className="mb-4 font-poppins text-xs text-text-secondary dark:text-slate-500">
        Portfolio of completed projects
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => (
          <View
            key={item.id}
            className="mr-3 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" transition={200} />
            <View className="p-3">
              <Text
                numberOfLines={2}
                className="font-poppins-semibold text-xs text-text-primary dark:text-slate-100"
              >
                {item.title}
              </Text>
              <Text className="mt-1 font-poppins text-[10px] text-text-secondary dark:text-slate-500">
                {item.completedAt}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingRight: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderWidth: 0,
  },
});
