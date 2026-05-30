import type {
  AuthValidationErrors,
  AuthValidationResult,
  LoginCredentials,
  SignUpPayload,
} from '@/types/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(phone: string): string {
  return phone.replace(/[\s-]/g, '');
}

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required';
  if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address';
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return undefined;
}

export function validateLogin(credentials: LoginCredentials): AuthValidationResult {
  const errors: AuthValidationErrors = {};

  const emailError = validateEmail(credentials.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(credentials.password);
  if (passwordError) errors.password = passwordError;

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateSignUp(payload: SignUpPayload): AuthValidationResult {
  const errors: AuthValidationErrors = {};

  if (!payload.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (payload.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  const emailError = validateEmail(payload.email);
  if (emailError) errors.email = emailError;

  const normalizedPhone = normalizePhone(payload.phone);
  if (!normalizedPhone) {
    errors.phone = 'Phone number is required';
  } else if (normalizedPhone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Enter a valid phone number';
  }

  const passwordError = validatePassword(payload.password);
  if (passwordError) errors.password = passwordError;

  if (!payload.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (payload.confirmPassword !== payload.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!payload.role) {
    errors.role = 'Select a role to continue';
  }

  if (!payload.location.trim()) {
    errors.location = 'Location is required';
  } else if (payload.location.trim().length < 2) {
    errors.location = 'Enter a valid location';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
