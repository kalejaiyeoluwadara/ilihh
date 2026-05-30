import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface AppState {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  userRole: 'client' | 'artisan';
  setUserRole: (role: 'client' | 'artisan') => void;
  toggleUserRole: () => void;
}

// Backup in-memory storage fallback if both native AsyncStorage and browser localStorage fail/are unavailable
const memoryStorage = new Map<string, string>();

// Safe storage wrapper to prevent crashes on Web or unlinked dev clients
const safeStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem(name)
        : memoryStorage.get(name) || null;
    }
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.warn('AsyncStorage native module is null or failed, falling back to memory/local storage.', error);
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(name);
      }
      return memoryStorage.get(name) || null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(name, value);
      } else {
        memoryStorage.set(name, value);
      }
      return;
    }
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.warn('AsyncStorage setItem failed, falling back to memory/local storage.', error);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(name, value);
      } else {
        memoryStorage.set(name, value);
      }
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(name);
      } else {
        memoryStorage.delete(name);
      }
      return;
    }
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.warn('AsyncStorage removeItem failed, falling back to memory/local storage.', error);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(name);
      } else {
        memoryStorage.delete(name);
      }
    }
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false }),
      userRole: 'client',
      setUserRole: (role) => set({ userRole: role }),
      toggleUserRole: () => set((state) => ({ userRole: state.userRole === 'client' ? 'artisan' : 'client' })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
