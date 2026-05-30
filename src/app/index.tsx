import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '@/store/use-app-store';
import { ARTISANS, MOCK_BOOKING_REQUESTS, MOCK_STATS } from '@/data/artisans';
import { ClientDashboard } from '@/components/client-dashboard';
import { ArtisanDashboard } from '@/components/artisan-dashboard';
import { HomeHeader } from '@/components/home-header';

import { ClientBookings } from '@/components/client-bookings';
import { ClientMessages } from '@/components/client-messages';
import { ClientProfile } from '@/components/client-profile';
import { ArtisanTasks } from '@/components/artisan-tasks';
import { ArtisanMessages } from '@/components/artisan-messages';
import { ArtisanProfile } from '@/components/artisan-profile';
import { BottomNavBar } from '@/components/bottom-nav-bar';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Zustand Store
  const { userRole, toggleUserRole, resetOnboarding } = useAppStore();

  // Separate tab states to avoid calling setState in useEffect (fixes lint error)
  const [activeClientTab, setActiveClientTab] = useState<'home' | 'bookings' | 'messages' | 'profile'>('home');
  const [activeArtisanTab, setActiveArtisanTab] = useState<'dashboard' | 'tasks' | 'messages' | 'profile'>('dashboard');

  const activeTab = userRole === 'client' ? activeClientTab : activeArtisanTab;
  const setActiveTab = (tabId: any) => {
    if (userRole === 'client') {
      setActiveClientTab(tabId);
    } else {
      setActiveArtisanTab(tabId);
    }
  };

  // Local State for Client view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Local State for Artisan view
  const [isOnline, setIsOnline] = useState(true);
  const [bookingRequests, setBookingRequests] = useState(MOCK_BOOKING_REQUESTS);
  const [activeJobsCount, setActiveJobsCount] = useState(MOCK_STATS.activeJobsCount);
  const [earnings, setEarnings] = useState(35000);

  // Filter artisans based on category and search query
  const filteredArtisans = ARTISANS.filter((artisan) => {
    const matchesCategory = selectedCategory ? artisan.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Handle booking actions in Artisan mode
  const handleAcceptBooking = (id: string, priceStr: string) => {
    setBookingRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'accepted' } : req)));
    setActiveJobsCount((prev) => prev + 1);

    // Parse price (e.g. ₦8,000) and add to mock earnings
    const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numericPrice)) {
      setEarnings((prev) => prev + numericPrice);
    }
  };

  const handleDeclineBooking = (id: string) => {
    setBookingRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'declined' } : req)));
  };

  // Determine if header should be visible on the active tab
  const showHeader = activeTab === 'home' || activeTab === 'dashboard';

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <SafeAreaView style={styles.safeArea}>
        {/* Navigation / Header Bar (only visible on Home/Dashboard tabs) */}
        {showHeader && <HomeHeader />}

        {/* Render View Based on Active Role and Tab */}
        {userRole === 'client' ? (
          activeTab === 'home' ? (
            <ClientDashboard
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filteredArtisans={filteredArtisans}
              isDark={isDark}
            />
          ) : activeTab === 'bookings' ? (
            <ClientBookings onBrowsePress={() => setActiveTab('home')} />
          ) : activeTab === 'messages' ? (
            <ClientMessages />
          ) : (
            <ClientProfile
              userRole={userRole}
              onToggleRole={toggleUserRole}
              onResetOnboarding={resetOnboarding}
            />
          )
        ) : (
          activeTab === 'dashboard' ? (
            <ArtisanDashboard
              isOnline={isOnline}
              setIsOnline={setIsOnline}
              bookingRequests={bookingRequests}
              earnings={earnings}
              activeJobsCount={activeJobsCount}
              completedJobsThisMonth={MOCK_STATS.completedJobsThisMonth}
              rating={MOCK_STATS.rating}
              onAcceptBooking={handleAcceptBooking}
              onDeclineBooking={handleDeclineBooking}
            />
          ) : activeTab === 'tasks' ? (
            <ArtisanTasks />
          ) : activeTab === 'messages' ? (
            <ArtisanMessages />
          ) : (
            <ArtisanProfile
              userRole={userRole}
              onToggleRole={toggleUserRole}
              onResetOnboarding={resetOnboarding}
            />
          )
        )}

        {/* Custom floating bottom navigation bar */}
        <BottomNavBar
          userRole={userRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
