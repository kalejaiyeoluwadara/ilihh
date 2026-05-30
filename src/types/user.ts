export type UserRole = 'client' | 'artisan';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  avatarUri?: string;
  createdAt: string;
}
