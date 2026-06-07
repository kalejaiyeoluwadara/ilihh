import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import {
  BriefcaseIcon,
  InfoIcon,
  LogOutIcon,
  PencilIcon,
  RefreshIcon,
  ShieldIcon,
  StarIcon,
  SwapIcon,
} from '@/components/icons';
import { ProfileSettingsRow } from '@/components/profile-settings-row';
import { getProfileImageSource } from '@/lib/profile';
import type { User } from '@/types/user';

interface ArtisanProfileProps {
  isAuthenticated: boolean;
  user?: User | null;
  onToggleRole: () => void;
  onResetOnboarding: () => void;
  onLogout?: () => void;
  onLoginPress?: () => void;
}

export function ArtisanProfile({
  isAuthenticated,
  user,
  onToggleRole,
  onResetOnboarding,
  onLogout,
  onLoginPress,
}: ArtisanProfileProps) {
  const userName = user?.fullName ?? 'Guest';
  const userLocation = user?.location ?? 'Ilisan, Ogun State';
  const userEmail = user?.email;
  const iconColor = '#7C3AED';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6 items-center rounded-[24px] border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
        <View className="relative">
          <Image
            source={getProfileImageSource(user)}
            style={styles.avatar}
            contentFit="cover"
          />
          {isAuthenticated ? (
            <View className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-primary-green dark:border-slate-900" />
          ) : null}
        </View>

        <Text className="mt-4 font-poppins-bold text-lg text-text-primary dark:text-slate-50">
          {isAuthenticated ? `${userName}'s Services` : userName}
        </Text>
        <Text className="mt-1 font-poppins text-xs text-text-secondary dark:text-slate-400">
          {isAuthenticated
            ? `Professional Artisan • ${userLocation}`
            : 'Sign in to manage your artisan business profile'}
        </Text>
        {isAuthenticated && userEmail ? (
          <Text className="mt-1 font-poppins text-[11px] text-text-secondary dark:text-slate-500">
            {userEmail}
          </Text>
        ) : null}

        <View className="mt-4 flex-row items-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <View className="items-center">
            <View className="flex-row items-center gap-1">
              <StarIcon size={14} color="#F59E0B" />
              <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
                4.9
              </Text>
            </View>
            <Text className="mt-0.5 font-poppins text-[9px] text-text-secondary dark:text-slate-400">
              Rating
            </Text>
          </View>
          <View className="h-6 w-[1px] bg-slate-100 dark:bg-slate-800" />
          <View className="items-center">
            <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
              24
            </Text>
            <Text className="mt-0.5 font-poppins text-[9px] text-text-secondary dark:text-slate-400">
              Jobs Done
            </Text>
          </View>
        </View>

        {!isAuthenticated ? (
          <TouchableOpacity
            onPress={onLoginPress}
            activeOpacity={0.8}
            className="mt-5 w-full items-center rounded-2xl bg-primary-purple py-3"
          >
            <Text className="font-poppins-semibold text-sm text-white">Sign In or Create Account</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => router.push('/profile/edit')}
            activeOpacity={0.8}
            className="mt-5 w-full items-center rounded-2xl border border-primary-purple/20 bg-primary-purple/10 py-3 dark:border-indigo-500/30 dark:bg-indigo-500/10"
          >
            <Text className="font-poppins-semibold text-sm text-primary-purple dark:text-indigo-400">
              Edit Profile
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text className="mb-3 px-1 font-poppins-semibold text-xs uppercase tracking-wider text-text-secondary dark:text-slate-500">
        Business Operations
      </Text>

      <View className="mb-6 overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        {isAuthenticated ? (
          <ProfileSettingsRow
            icon={<PencilIcon size={18} color={iconColor} />}
            title="Edit Profile"
            subtitle="Update your name, phone, location, and photo"
            onPress={() => router.push('/profile/edit')}
          />
        ) : null}

        <ProfileSettingsRow
          icon={<SwapIcon size={18} color={iconColor} />}
          title="Switch to Client"
          subtitle="Browse and hire other local artisans"
          onPress={onToggleRole}
        />

        <ProfileSettingsRow
          icon={<BriefcaseIcon size={18} color={iconColor} />}
          title="Pricing & Availability"
          subtitle="Set hourly rate and working hours"
        />

        <ProfileSettingsRow
          icon={<RefreshIcon size={18} color={iconColor} />}
          title="Reset Onboarding"
          subtitle="View onboarding screen introduction again"
          onPress={onResetOnboarding}
          showDivider={isAuthenticated}
        />

        {isAuthenticated ? (
          <ProfileSettingsRow
            icon={<LogOutIcon size={18} color="#EF4444" />}
            title="Log Out"
            subtitle="Sign out of your ilihh account"
            onPress={onLogout}
            titleClassName="text-danger"
            showDivider={false}
          />
        ) : null}
      </View>

      <Text className="mb-3 px-1 font-poppins-semibold text-xs uppercase tracking-wider text-text-secondary dark:text-slate-500">
        General Settings
      </Text>

      <View className="mb-8 overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <ProfileSettingsRow
          icon={<InfoIcon size={18} color={iconColor} />}
          title="Help Center & Support"
        />

        <ProfileSettingsRow
          icon={<ShieldIcon size={18} color={iconColor} />}
          title="Legal & Privacy"
          showDivider={false}
        />
      </View>

      <Text className="mb-4 text-center font-poppins text-[10px] text-text-secondary dark:text-slate-600">
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
    paddingBottom: 100,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 32,
  },
});
