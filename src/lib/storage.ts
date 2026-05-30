import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import type { StateStorage } from 'zustand/middleware';

const memoryStorage = new Map<string, string>();

export const safeStorage: StateStorage = {
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
