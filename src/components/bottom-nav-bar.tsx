import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, useColorScheme } from 'react-native';
import { GlassView } from 'expo-glass-effect';

import {
  CalendarIcon,
  DashboardIcon,
  MessageIcon,
  ProfileIcon,
  SearchIcon,
  TasksIcon,
} from '@/components/icons';

type TabIcon = React.ComponentType<{ size?: number; color: string }>;

interface TabItem {
  id: string;
  label: string;
  Icon: TabIcon;
}

interface BottomNavBarProps {
  userRole: 'client' | 'artisan';
  activeTab: string;
  onTabChange: (tabId: any) => void;
}

export function BottomNavBar({ userRole, activeTab, onTabChange }: BottomNavBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const clientTabs: TabItem[] = [
    { id: 'home', label: 'Discover', Icon: SearchIcon },
    { id: 'bookings', label: 'Bookings', Icon: CalendarIcon },
    { id: 'messages', label: 'Messages', Icon: MessageIcon },
    { id: 'profile', label: 'Profile', Icon: ProfileIcon },
  ];

  const artisanTabs: TabItem[] = [
    { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { id: 'tasks', label: 'Tasks', Icon: TasksIcon },
    { id: 'messages', label: 'Messages', Icon: MessageIcon },
    { id: 'profile', label: 'Profile', Icon: ProfileIcon },
  ];

  const tabs = userRole === 'client' ? clientTabs : artisanTabs;

  return (
    <View style={styles.navBarContainer}>
      <View style={styles.pillShadow}>
        <View style={[styles.pillSurface, isDark ? styles.pillSurfaceDark : styles.pillSurfaceLight]}>
          {Platform.OS === 'ios' && (
            <GlassView style={styles.glassFill} glassEffectStyle="regular" />
          )}

          <View
            style={[styles.glassFill, isDark ? styles.pillOverlayDark : styles.pillOverlayLight]}
          />

          <View className="relative z-10 flex-row items-center justify-around px-2 py-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const iconColor = isActive
                ? isDark
                  ? '#818CF8'
                  : '#6C4EF5'
                : isDark
                  ? '#64748B'
                  : '#94A3B8';
              const { Icon } = tab;

              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => onTabChange(tab.id)}
                  activeOpacity={0.7}
                  className="flex-1 items-center justify-center"
                >
                  <View
                    className={`h-8 w-8 items-center justify-center rounded-xl ${
                      isActive ? 'bg-primary-purple/10 dark:bg-indigo-500/20' : 'bg-transparent'
                    }`}
                  >
                    <Icon size={18} color={iconColor} />
                  </View>

                  <Text
                    className={`mt-0.5 font-poppins text-[9px] ${
                      isActive
                        ? 'font-poppins-semibold text-primary-purple dark:text-indigo-400'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {tab.label}
                  </Text>

                  {isActive && (
                    <View className="mt-0.5 h-1 w-1 rounded-full bg-primary-purple dark:bg-indigo-400" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const PILL_RADIUS = 9999;

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 20,
    left: 16,
    right: 16,
    zIndex: 50,
  },
  pillShadow: {
    borderRadius: PILL_RADIUS,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 10,
      },
      default: {},
    }),
  },
  pillSurface: {
    overflow: 'hidden',
    borderRadius: PILL_RADIUS,
    borderWidth: StyleSheet.hairlineWidth,
  },
  pillSurfaceLight: {
    borderColor: 'rgba(226, 232, 240, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
  },
  pillSurfaceDark: {
    borderColor: 'rgba(30, 41, 59, 0.8)',
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
  },
  glassFill: {
    ...StyleSheet.absoluteFill,
    borderRadius: PILL_RADIUS,
  },
  pillOverlayLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  pillOverlayDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
});
