import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { safeStorage } from '@/lib/storage';

interface AppState {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  userRole: 'client' | 'artisan';
  setUserRole: (role: 'client' | 'artisan') => void;
  toggleUserRole: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false }),
      userRole: 'client',
      setUserRole: (role) => set({ userRole: role }),
      toggleUserRole: () =>
        set((state) => ({
          userRole: state.userRole === 'client' ? 'artisan' : 'client',
        })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
