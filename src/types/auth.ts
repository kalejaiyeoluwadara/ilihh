import type { UserRole } from '@/types/user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  location: string;
}

export interface AuthValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  location?: string;
}

export interface AuthValidationResult {
  isValid: boolean;
  errors: AuthValidationErrors;
}
