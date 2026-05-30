import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { images } from '@/constants/images';

interface ArtisanProfileProps {
  userRole: 'client' | 'artisan';
  onToggleRole: () => void;
  onResetOnboarding: () => void;
}

export function ArtisanProfile({ userRole, onToggleRole, onResetOnboarding }: ArtisanProfileProps) {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Artisan Profile Card */}
      <View className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-6 items-center mb-6">
        <View className="relative">
          <Image
            source={images.mascotHappy}
            style={styles.avatar}
            contentFit="cover"
          />
          <View className="absolute bottom-0 right-0 bg-primary-green w-4 h-4 rounded-full border-2 border-white dark:border-slate-900" />
        </View>
        
        <Text className="font-poppins-bold text-lg text-text-primary dark:text-slate-50 mt-4">
          {"Dara's Services"}
        </Text>
        <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400 mt-1">
          Professional Artisan • Ilisan, Ogun State
        </Text>

        {/* Rating and Reviews Row */}
        <View className="flex-row items-center gap-4 mt-4 bg-white dark:bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <View className="items-center">
            <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
              ⭐ 4.9
            </Text>
            <Text className="font-poppins text-[9px] text-text-secondary dark:text-slate-400 mt-0.5">
              Rating
            </Text>
          </View>
          <View className="w-[1px] h-6 bg-slate-100 dark:bg-slate-800" />
          <View className="items-center">
            <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
              24
            </Text>
            <Text className="font-poppins text-[9px] text-text-secondary dark:text-slate-400 mt-0.5">
              Jobs Done
            </Text>
          </View>
        </View>
      </View>

      {/* Settings Sections */}
      <Text className="font-poppins-semibold text-xs text-text-secondary dark:text-slate-500 uppercase tracking-wider mb-3 px-1">
        Business Operations
      </Text>

      <View className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] overflow-hidden mb-6">
        {/* Toggle Role Button */}
        <TouchableOpacity
          onPress={onToggleRole}
          activeOpacity={0.7}
          className="flex-row justify-between items-center px-5 py-4 border-b border-slate-100/50 dark:border-slate-800/50"
        >
          <View className="flex-row items-center gap-3">
            <Text className="text-lg">🔄</Text>
            <View>
              <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-100">
                Switch to Client
              </Text>
              <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-400 mt-0.5">
                Browse and hire other local artisans
              </Text>
            </View>
          </View>
          <Text className="text-slate-400 dark:text-slate-600 text-xs">➔</Text>
        </TouchableOpacity>

        {/* Set Pricing & Availability */}
        <View className="flex-row justify-between items-center px-5 py-4 border-b border-slate-100/50 dark:border-slate-800/50">
          <View className="flex-row items-center gap-3">
            <Text className="text-lg">💰</Text>
            <View>
              <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-100">
                Pricing & Availability
              </Text>
              <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-400 mt-0.5">
                Set hourly rate and working hours
              </Text>
            </View>
          </View>
          <Text className="text-slate-400 dark:text-slate-600 text-xs">➔</Text>
        </View>

        {/* Reset Onboarding */}
        <TouchableOpacity
          onPress={onResetOnboarding}
          activeOpacity={0.7}
          className="flex-row justify-between items-center px-5 py-4"
        >
          <View className="flex-row items-center gap-3">
            <Text className="text-lg">🔁</Text>
            <View>
              <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-100">
                Reset Onboarding
              </Text>
              <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-400 mt-0.5">
                View onboarding screen introduction again
              </Text>
            </View>
          </View>
          <Text className="text-slate-400 dark:text-slate-600 text-xs">➔</Text>
        </TouchableOpacity>
      </View>

      <Text className="font-poppins-semibold text-xs text-text-secondary dark:text-slate-500 uppercase tracking-wider mb-3 px-1">
        General Settings
      </Text>

      <View className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] overflow-hidden mb-8">
        <View className="flex-row justify-between items-center px-5 py-4 border-b border-slate-100/50 dark:border-slate-800/50">
          <View className="flex-row items-center gap-3">
            <Text className="text-lg">ℹ️</Text>
            <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-100">
              Help Center & Support
            </Text>
          </View>
          <Text className="text-slate-400 dark:text-slate-600 text-xs">➔</Text>
        </View>

        <View className="flex-row justify-between items-center px-5 py-4">
          <View className="flex-row items-center gap-3">
            <Text className="text-lg">🛡️</Text>
            <Text className="font-poppins-semibold text-xs text-text-primary dark:text-slate-100">
              Legal & Privacy
            </Text>
          </View>
          <Text className="text-slate-400 dark:text-slate-600 text-xs">➔</Text>
        </View>
      </View>

      <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-600 text-center mb-4">
        Ilisan Help Hub v1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100, // extra padding so we don't get covered by floating tabs
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 32,
  },
});
