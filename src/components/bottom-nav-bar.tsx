import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { GlassView } from 'expo-glass-effect';

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

interface BottomNavBarProps {
  userRole: 'client' | 'artisan';
  activeTab: string;
  onTabChange: (tabId: any) => void;
}

export function BottomNavBar({ userRole, activeTab, onTabChange }: BottomNavBarProps) {
  // Define tabs based on user role
  const clientTabs: TabItem[] = [
    { id: 'home', label: 'Discover', icon: '🔍' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const artisanTabs: TabItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '🛠️' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const tabs = userRole === 'client' ? clientTabs : artisanTabs;

  return (
    <View style={styles.navBarContainer} className="shadow-lg shadow-slate-200/50 dark:shadow-black/70">
      {/* Outer border & rounded clipping container */}
      <View className="overflow-hidden rounded-[32px] border border-slate-200/30 dark:border-slate-800/40">
        
        {/* iOS Native Visual Effect Blur */}
        {Platform.OS === 'ios' && (
          <GlassView 
            style={StyleSheet.absoluteFill} 
            glassEffectStyle="regular" 
          />
        )}

        {/* Semi-translucent overlay for backing tint (cross-platform fallback) */}
        <View className="absolute inset-0 bg-white/70 dark:bg-slate-900/60" />

        {/* Main Tab Rows */}
        <View className="flex-row justify-around items-center py-3 px-4 relative z-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => onTabChange(tab.id)}
                activeOpacity={0.7}
                className="items-center justify-center flex-1 py-1"
              >
                {/* Icon Container with subtle scaling/styling */}
                <View 
                  className={`w-10 h-10 items-center justify-center rounded-2xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-purple/10 dark:bg-indigo-500/20' 
                      : 'bg-transparent'
                  }`}
                >
                  <Text className={`text-[19px] ${isActive ? '' : 'opacity-70'}`}>
                    {tab.icon}
                  </Text>
                </View>

                {/* Label */}
                <Text
                  className={`text-[9px] mt-1 font-poppins ${
                    isActive 
                      ? 'font-poppins-semibold text-primary-purple dark:text-indigo-400' 
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {tab.label}
                </Text>

                {/* Little Active indicator dot */}
                {isActive && (
                  <View className="w-1 h-1 rounded-full bg-primary-purple dark:bg-indigo-400 mt-0.5" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 20,
    left: 20,
    right: 20,
    zIndex: 50,
  },
});
