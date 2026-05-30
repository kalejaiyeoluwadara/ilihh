import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { CATEGORIES } from '@/data/categories';
import { Artisan } from '@/data/artisans';
import { ArtisanCard } from './artisan-card';
import { images } from '@/constants/images';

interface ClientDashboardProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  filteredArtisans: Artisan[];
  isDark: boolean;
}

export function ClientDashboard({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  filteredArtisans,
  isDark,
}: ClientDashboardProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* Hero Greeting */}
      <View className="mb-6">
        <Text className="font-poppins text-sm text-text-secondary dark:text-slate-400">
          Welcome back 👋
        </Text>
        <Text className="font-poppins-bold text-2xl text-text-primary dark:text-slate-50 mt-1">
          Find the Best Hands for Your Craft!
        </Text>
      </View>

      {/* Search and Filter */}
      <View className="flex-row items-center gap-3 mb-6">
        <View className="flex-1 flex-row items-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-2">
          <Text className="text-lg mr-2">🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search carpenter, plumber..."
            placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
            className="flex-1 font-poppins text-sm text-text-primary dark:text-slate-200"
            style={styles.textInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text className="text-text-secondary dark:text-slate-400 font-poppins-bold px-2">✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories Section */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="font-poppins-semibold text-base text-text-primary dark:text-slate-100">
            Popular Categories
          </Text>
          {selectedCategory && (
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text className="font-poppins-medium text-xs text-primary-purple">
                Clear Filter
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(isSelected ? null : category.id)}
                activeOpacity={0.7}
                className={`flex-row items-center px-4 py-2.5 rounded-full border mr-3 gap-2 ${
                  isSelected
                    ? 'bg-primary-purple border-primary-purple shadow-sm shadow-primary-purple/25'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Color accent dot */}
                <View
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white/60' : ''
                  }`}
                  style={!isSelected ? { backgroundColor: category.dotColor } : undefined}
                />
                <Text
                  className={`font-poppins-semibold text-xs ${
                    isSelected ? 'text-white' : 'text-text-primary dark:text-slate-200'
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Featured Artisans */}
      <View className="mb-8">
        <Text className="font-poppins-semibold text-base text-text-primary dark:text-slate-100 mb-4">
          {selectedCategory ? 'Matching Artisans' : 'Featured Artisans in Ilisan'}
        </Text>

        {filteredArtisans.length === 0 ? (
          <View className="items-center justify-center py-10 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800">
            <Text className="text-3xl mb-2">🧑🔧</Text>
            <Text className="font-poppins-semibold text-sm text-text-primary dark:text-slate-200">
              No artisans found
            </Text>
            <Text className="font-poppins text-xs text-text-secondary dark:text-slate-500 text-center px-6 mt-1">
              Try searching for something else or clearing active category filters.
            </Text>
          </View>
        ) : (
          filteredArtisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id}
              artisan={artisan}
              onBookPress={() => router.push(`/artisan/${artisan.id}`)}
            />
          ))
        )}
      </View>

      {/* Help/Mascot Banner */}
      <View className="bg-primary-purple/5 dark:bg-primary-purple/10 border border-primary-purple/10 dark:border-primary-purple/20 rounded-3xl p-5 flex-row items-center gap-4 mb-4">
        <Image
          source={images.mascotHappy}
          style={styles.mascotBannerImage}
          contentFit="contain"
        />
        <View className="flex-1">
          <Text className="font-poppins-bold text-xs text-primary-purple uppercase tracking-wider">
            Mascot Tip
          </Text>
          <Text className="font-poppins text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
            &quot;Need custom work? You can chat directly with artisans to agree on pricing and schedules before booking!&quot;
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
    paddingBottom: Platform.OS === 'web' ? 80 : 40,
  },
  mascotBannerImage: {
    width: 44,
    height: 44,
  },
  textInput: {
    outlineWidth: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  } as any,
  horizontalScroll: {
    paddingVertical: 4,
  },
});
