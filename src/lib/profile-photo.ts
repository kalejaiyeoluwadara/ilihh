import * as ImagePicker from 'expo-image-picker';

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.85,
};

export async function requestGalleryPermission() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
}

export async function requestCameraPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
}

export async function pickProfilePhotoFromGallery() {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) {
    return { success: false as const, error: 'Photo library access is required' };
  }

  const result = await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);

  if (result.canceled || !result.assets[0]?.uri) {
    return { success: false as const, error: null };
  }

  return { success: true as const, uri: result.assets[0].uri };
}

export async function takeProfilePhoto() {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    return { success: false as const, error: 'Camera access is required' };
  }

  const result = await ImagePicker.launchCameraAsync(PICKER_OPTIONS);

  if (result.canceled || !result.assets[0]?.uri) {
    return { success: false as const, error: null };
  }

  return { success: true as const, uri: result.assets[0].uri };
}
