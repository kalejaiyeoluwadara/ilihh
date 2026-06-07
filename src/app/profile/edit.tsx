import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';

import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { AuthTextInput } from '@/components/auth-text-input';
import { BackIcon } from '@/components/icons';
import { PrimaryButton } from '@/components/primary-button';
import { ProfilePhotoPicker } from '@/components/profile-photo-picker';
import { getProfileImageSource } from '@/lib/profile';
import { validateProfileUpdate } from '@/lib/profile-validation';
import { useAuthStore } from '@/store/use-auth-store';
import type { ProfileValidationErrors } from '@/types/profile';
import type { User } from '@/types/user';

function EditProfileForm({ user }: { user: User }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location);
  const [avatarUri, setAvatarUri] = useState<string | undefined>(user.avatarUri);
  const [errors, setErrors] = useState<ProfileValidationErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const iconColor = isDark ? '#94A3B8' : '#64748B';

  const handleSave = () => {
    const payload = {
      fullName,
      phone,
      location,
      avatarUri,
    };

    const validation = validateProfileUpdate(payload);
    setErrors(validation.errors);

    if (!validation.isValid) {
      setFormError(null);
      return;
    }

    setIsSaving(true);
    const result = updateProfile(payload);
    setIsSaving(false);

    if (!result.success) {
      setFormError(result.error ?? 'Unable to update profile');
      return;
    }

    router.back();
  };

  return (
    <AuthScreenLayout
      header={
        <View className="pt-2">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="mb-6 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
          >
            <BackIcon size={18} color={iconColor} />
          </TouchableOpacity>

          <View className="mb-2 items-center">
            <Text className="font-poppins-bold text-2xl text-text-primary dark:text-slate-50">
              Edit Profile
            </Text>
            <Text className="mt-2 px-2 text-center font-poppins text-sm text-text-secondary dark:text-slate-400">
              Update your photo and personal details. Your email cannot be changed here.
            </Text>
          </View>
        </View>
      }
    >
      <ProfilePhotoPicker
        value={avatarUri}
        fallbackSource={getProfileImageSource(user)}
        onChange={setAvatarUri}
        error={errors.avatarUri}
      />

      <AuthTextInput
        label="Full name"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Your full name"
        autoCapitalize="words"
        error={errors.fullName}
      />

      <AuthTextInput
        label="Email"
        value={user.email}
        onChangeText={() => {}}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        editable={false}
      />

      <Text className="-mt-2 mb-4 font-poppins text-[10px] text-text-secondary dark:text-slate-500">
        Email is linked to your account and cannot be edited.
      </Text>

      <AuthTextInput
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholder="+234 801 234 5678"
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <AuthTextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        placeholder="Ilisan, Ogun State"
        error={errors.location}
      />

      {formError ? (
        <Text className="mb-2 font-poppins text-xs text-danger">{formError}</Text>
      ) : null}

      <PrimaryButton
        label={isSaving ? 'Saving...' : 'Save Changes'}
        onPress={handleSave}
        disabled={isSaving}
      />
    </AuthScreenLayout>
  );
}

export default function EditProfileScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace('/login?redirect=%2Fprofile%2Fedit');
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return <EditProfileForm key={user.id} user={user} />;
}
