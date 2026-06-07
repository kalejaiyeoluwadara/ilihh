import { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';

import { CameraIcon, PhotoLibraryIcon, UserIcon } from '@/components/icons';
import { pickProfilePhotoFromGallery, takeProfilePhoto } from '@/lib/profile-photo';

interface ProfilePhotoPickerProps {
  value?: string;
  fallbackSource: ImageSource;
  onChange: (uri: string | undefined) => void;
  error?: string;
}

export function ProfilePhotoPicker({
  value,
  fallbackSource,
  onChange,
  error,
}: ProfilePhotoPickerProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [pickerError, setPickerError] = useState<string | null>(null);

  const previewSource = value ? { uri: value } : fallbackSource;
  const hasCustomPhoto = Boolean(value);
  const displayError = error ?? pickerError;

  const handlePick = async (source: 'gallery' | 'camera') => {
    setPickerError(null);
    setIsLoading(true);

    const result =
      source === 'gallery' ? await pickProfilePhotoFromGallery() : await takeProfilePhoto();

    setIsLoading(false);

    if (result.success) {
      onChange(result.uri);
      return;
    }

    if (result.error) {
      setPickerError(result.error);
    }
  };

  return (
    <View className="mb-6">
      <Text className="mb-3 font-poppins-medium text-xs text-text-primary dark:text-slate-200">
        Profile photo
      </Text>

      <View
        className={`items-center rounded-3xl border px-5 py-6 ${
          displayError
            ? 'border-danger bg-red-50/40 dark:bg-red-950/20'
            : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
        }`}
      >
        <View className="relative mb-5">
          <View
            style={styles.avatarRing}
            className="items-center justify-center rounded-[32px] border-2 border-primary-purple/20 bg-white p-1 dark:border-indigo-500/30 dark:bg-slate-950"
          >
            <Image source={previewSource} style={styles.avatar} contentFit="cover" />
            {isLoading ? (
              <View
                style={styles.loadingOverlay}
                className="items-center justify-center rounded-[28px] bg-white/70 dark:bg-slate-950/70"
              >
                <ActivityIndicator color={isDark ? '#818CF8' : '#6C4EF5'} />
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={() => handlePick('gallery')}
            disabled={isLoading}
            activeOpacity={0.85}
            className="absolute -bottom-1 -right-1 h-10 w-10 items-center justify-center rounded-2xl border-2 border-white bg-primary-purple shadow-sm shadow-primary-purple/30 dark:border-slate-900 dark:bg-indigo-600"
          >
            <CameraIcon size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text className="mb-1 text-center font-poppins-semibold text-sm text-text-primary dark:text-slate-50">
          {hasCustomPhoto ? 'Looking good!' : 'Add a profile photo'}
        </Text>
        <Text className="mb-5 max-w-[240px] text-center font-poppins text-[11px] leading-[16px] text-text-secondary dark:text-slate-400">
          {hasCustomPhoto
            ? 'Tap the camera badge or use the buttons below to change your photo.'
            : 'Help clients and artisans recognize you with a clear profile picture.'}
        </Text>

        <View className="w-full flex-row gap-3">
          <TouchableOpacity
            onPress={() => handlePick('gallery')}
            disabled={isLoading}
            activeOpacity={0.85}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-primary-purple py-3.5 dark:bg-indigo-600"
          >
            <PhotoLibraryIcon size={16} color="#FFFFFF" />
            <Text className="font-poppins-semibold text-xs text-white">Gallery</Text>
          </TouchableOpacity>

          {Platform.OS !== 'web' ? (
            <TouchableOpacity
              onPress={() => handlePick('camera')}
              disabled={isLoading}
              activeOpacity={0.85}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 dark:border-slate-700 dark:bg-slate-950"
            >
              <CameraIcon size={16} color={isDark ? '#818CF8' : '#6C4EF5'} />
              <Text className="font-poppins-semibold text-xs text-primary-purple dark:text-indigo-400">
                Camera
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {hasCustomPhoto ? (
          <TouchableOpacity
            onPress={() => {
              setPickerError(null);
              onChange(undefined);
            }}
            disabled={isLoading}
            activeOpacity={0.7}
            className="mt-4"
          >
            <Text className="font-poppins-semibold text-xs text-danger">Remove photo</Text>
          </TouchableOpacity>
        ) : (
          <View className="mt-4 flex-row items-center gap-2 rounded-full bg-white px-3 py-1.5 dark:bg-slate-950">
            <UserIcon size={12} color={isDark ? '#64748B' : '#94A3B8'} />
            <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-500">
              JPG or PNG recommended
            </Text>
          </View>
        )}
      </View>

      {displayError ? (
        <Text className="mt-1.5 font-poppins text-[11px] text-danger">{displayError}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarRing: {
    width: 112,
    height: 112,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 28,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
