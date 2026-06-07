export interface UpdateProfilePayload {
  fullName: string;
  phone: string;
  location: string;
  avatarUri?: string;
}

export interface ProfileValidationErrors {
  fullName?: string;
  phone?: string;
  location?: string;
  avatarUri?: string;
}

export interface ProfileValidationResult {
  isValid: boolean;
  errors: ProfileValidationErrors;
}
