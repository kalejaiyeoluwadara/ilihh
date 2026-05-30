import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '@/store/use-app-store';
import { ARTISANS, MOCK_BOOKING_REQUESTS, MOCK_STATS } from '@/data/artisans';
import { ClientDashboard } from '@/components/client-dashboard';
import { ArtisanDashboard } from '@/components/artisan-dashboard';
import { HomeHeader } from '@/components/home-header';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Zustand Store
  const { userRole, toggleUserRole, resetOnboarding } = useAppStore();

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

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <SafeAreaView style={styles.safeArea}>
        {/* Navigation / Header Bar */}
        <HomeHeader userRole={userRole} onToggleRole={toggleUserRole} />

        {/* Render View Based on Active Role */}
        {userRole === 'client' ? (
          <ClientDashboard
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredArtisans={filteredArtisans}
            isDark={isDark}
          />
        ) : (
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
        )}

        {/* Testing Footer bar with Reset Onboarding helper */}
        <View className="px-6 py-3 border-t border-slate-100 dark:border-slate-900 flex-row justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
          <Text className="font-poppins text-[10px] text-text-secondary dark:text-slate-500">
            Teaching Mode • Dual Layout
          </Text>
          <TouchableOpacity onPress={resetOnboarding}>
            <Text className="font-poppins-medium text-[10px] text-primary-purple dark:text-indigo-400 underline">
              Reset Onboarding
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
