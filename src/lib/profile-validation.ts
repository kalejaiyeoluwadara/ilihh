import type {
  ProfileValidationErrors,
  ProfileValidationResult,
  UpdateProfilePayload,
} from '@/types/profile';

function normalizePhone(phone: string): string {
  return phone.replace(/[\s-]/g, '');
}

export function validateProfileUpdate(payload: UpdateProfilePayload): ProfileValidationResult {
  const errors: ProfileValidationErrors = {};

  if (!payload.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (payload.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  const normalizedPhone = normalizePhone(payload.phone);
  if (!normalizedPhone) {
    errors.phone = 'Phone number is required';
  } else if (normalizedPhone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Enter a valid phone number';
  }

  if (!payload.location.trim()) {
    errors.location = 'Location is required';
  } else if (payload.location.trim().length < 2) {
    errors.location = 'Enter a valid location';
  }

  const avatarUri = payload.avatarUri?.trim();
  if (avatarUri && !avatarUri.startsWith('http')) {
    errors.avatarUri = 'Enter a valid image URL starting with http';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
