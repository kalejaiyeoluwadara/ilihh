import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import {
  InfoIcon,
  LogOutIcon,
  PencilIcon,
  RefreshIcon,
  ShieldIcon,
  SwapIcon,
} from '@/components/icons';
import { ProfileSettingsRow } from '@/components/profile-settings-row';
import { getProfileImageSource } from '@/lib/profile';
import type { User } from '@/types/user';

interface ClientProfileProps {
  isAuthenticated: boolean;
  user?: User | null;
  onToggleRole: () => void;
  onResetOnboarding: () => void;
  onLogout?: () => void;
  onLoginPress?: () => void;
}

export function ClientProfile({
  isAuthenticated,
  user,
  onToggleRole,
  onResetOnboarding,
  onLogout,
  onLoginPress,
}: ClientProfileProps) {
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
          {userName}
        </Text>
        <Text className="mt-1 font-poppins text-xs text-text-secondary dark:text-slate-400">
          {isAuthenticated
            ? `Client Account • ${userLocation}`
            : 'Sign in to save your profile and bookings'}
        </Text>
        {isAuthenticated && userEmail ? (
          <Text className="mt-1 font-poppins text-[11px] text-text-secondary dark:text-slate-500">
            {userEmail}
          </Text>
        ) : null}

        <View className="mt-3 rounded-full bg-indigo-50 px-3 py-1 dark:bg-indigo-950/40">
          <Text className="font-poppins-semibold text-[10px] text-primary-purple dark:text-indigo-400">
            CLIENT
          </Text>
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
        Account Settings
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
          title="Switch to Artisan"
          subtitle="Offer your own services on ilihh"
          onPress={onToggleRole}
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
        General
      </Text>

      <View className="mb-8 overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <ProfileSettingsRow
          icon={<InfoIcon size={18} color={iconColor} />}
          title="Help & Support"
        />

        <ProfileSettingsRow
          icon={<ShieldIcon size={18} color={iconColor} />}
          title="Privacy Policy & Terms"
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
