import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { validateLogin, validateSignUp } from '@/lib/auth-validation';
import { safeStorage } from '@/lib/storage';
import { useAppStore } from '@/store/use-app-store';
import type { LoginCredentials, SignUpPayload } from '@/types/auth';
import type { User, UserRole } from '@/types/user';

interface StoredAccount {
  user: User;
  // Mock-only password storage for demo login. Never do this in production.
  password: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  registeredUsers: StoredAccount[];
  login: (credentials: LoginCredentials) => AuthResult;
  signUp: (payload: SignUpPayload) => AuthResult;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
}

const DEMO_ACCOUNT: StoredAccount = {
  user: {
    id: 'demo-user-1',
    fullName: 'Dara',
    email: 'dara@ilihh.demo',
    phone: '+2348012345678',
    location: 'Ilisan, Ogun State',
    role: 'client',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  password: 'demo123',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      registeredUsers: [DEMO_ACCOUNT],

      login: (credentials) => {
        const validation = validateLogin(credentials);
        if (!validation.isValid) {
          const firstError = Object.values(validation.errors).find(Boolean);
          return { success: false, error: firstError ?? 'Invalid credentials' };
        }

        const email = credentials.email.trim().toLowerCase();
        const account = get().registeredUsers.find(
          (entry) => entry.user.email.toLowerCase() === email
        );

        if (!account || account.password !== credentials.password) {
          return { success: false, error: 'Invalid email or password' };
        }

        set({ isAuthenticated: true, user: account.user });
        useAppStore.getState().setUserRole(account.user.role);

        return { success: true };
      },

      signUp: (payload) => {
        const validation = validateSignUp(payload);
        if (!validation.isValid) {
          const firstError = Object.values(validation.errors).find(Boolean);
          return { success: false, error: firstError ?? 'Please fix the form errors' };
        }

        const email = payload.email.trim().toLowerCase();
        const duplicate = get().registeredUsers.some(
          (entry) => entry.user.email.toLowerCase() === email
        );

        if (duplicate) {
          return { success: false, error: 'Email already registered' };
        }

        const user: User = {
          id: `user-${Date.now()}`,
          fullName: payload.fullName.trim(),
          email,
          phone: payload.phone.trim(),
          location: payload.location.trim(),
          role: payload.role,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          registeredUsers: [...state.registeredUsers, { user, password: payload.password }],
          isAuthenticated: true,
          user,
        }));

        useAppStore.getState().setUserRole(user.role);

        return { success: true };
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      updateUserRole: (role) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser = { ...currentUser, role };

        set((state) => ({
          user: updatedUser,
          registeredUsers: state.registeredUsers.map((entry) =>
            entry.user.id === updatedUser.id
              ? { ...entry, user: updatedUser }
              : entry
          ),
        }));

        useAppStore.getState().setUserRole(role);
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        registeredUsers: state.registeredUsers,
      }),
    }
  )
);
