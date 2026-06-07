import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BookingRequest } from '@/data/artisans';
import { AcceptJobSuccessModal } from '@/components/accept-job-success-modal';
import { BookingRequestCard } from './booking-request-card';

interface ArtisanDashboardProps {
  isOnline: boolean;
  setIsOnline: (val: boolean) => void;
  bookingRequests: BookingRequest[];
  earnings: number;
  activeJobsCount: number;
  completedJobsThisMonth: number;
  rating: string;
  onAcceptBooking: (id: string, price: string) => void;
  onDeclineBooking: (id: string) => void;
  onMessageClient: (request: BookingRequest) => void;
  onGoToTasks: () => void;
}

export function ArtisanDashboard({
  isOnline,
  setIsOnline,
  bookingRequests,
  earnings,
  activeJobsCount,
  completedJobsThisMonth,
  rating,
  onAcceptBooking,
  onDeclineBooking,
  onMessageClient,
  onGoToTasks,
}: ArtisanDashboardProps) {
  const pendingRequests = bookingRequests.filter((req) => req.status === 'pending');
  const [acceptedRequest, setAcceptedRequest] = useState<BookingRequest | null>(null);

  const handleAcceptBooking = (id: string, price: string) => {
    const request = pendingRequests.find((req) => req.id === id);
    if (request) {
      setAcceptedRequest(request);
    }
    onAcceptBooking(id, price);
  };

  const performanceMessage =
    activeJobsCount > 0
      ? `${activeJobsCount} active ${activeJobsCount === 1 ? 'job' : 'jobs'} — you're in demand!`
      : pendingRequests.length > 0
        ? `${pendingRequests.length} new ${pendingRequests.length === 1 ? 'request' : 'requests'} waiting`
        : 'All caught up — stay online for new bookings';

  return (
    <>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* Status indicator Card */}
      <View className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 mb-6">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <View>
              <Text className="font-poppins-bold text-sm text-text-primary dark:text-slate-50">
                Status: {isOnline ? 'Online' : 'Offline'}
              </Text>
              <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400">
                {isOnline ? 'Accepting new bookings' : 'Not visible to clients'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setIsOnline(!isOnline)}
            activeOpacity={0.8}
            className={`w-14 h-8 rounded-full p-1 justify-center ${
              isOnline ? 'bg-primary-green items-end' : 'bg-slate-300 dark:bg-slate-700 items-start'
            }`}
          >
            <View className="w-6 h-6 bg-white rounded-full shadow-sm" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Performance stats */}
      <View className="mb-6">
        <View className="mb-4">
          <Text className="font-poppins-semibold text-base text-text-primary dark:text-slate-100">
            Your Week at a Glance
          </Text>
          <Text className="mt-1 font-poppins text-xs text-text-secondary dark:text-slate-400">
            {performanceMessage}
          </Text>
        </View>

        <View className="mb-3 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
          <Text className="font-poppins text-[9px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
            Total earnings
          </Text>
          <Text className="mt-1.5 font-poppins-bold text-3xl text-text-primary dark:text-slate-50">
            ₦{earnings.toLocaleString()}
          </Text>
          <View className="mt-3 self-start rounded-full bg-emerald-50 px-2.5 py-1 dark:bg-emerald-950/40">
            <Text className="font-poppins-semibold text-[10px] text-primary-green dark:text-emerald-400">
              +12% from last week
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-3">
          <View className="min-w-[47%] flex-1 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
            <View className="mb-3 h-1 w-7 rounded-full bg-primary-purple" />
            <Text className="font-poppins text-[9px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
              Active jobs
            </Text>
            <Text className="mt-1.5 font-poppins-bold text-2xl text-primary-purple dark:text-indigo-400">
              {activeJobsCount}
            </Text>
          </View>

          <View className="min-w-[47%] flex-1 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
            <View className="mb-3 h-1 w-7 rounded-full bg-primary-green" />
            <Text className="font-poppins text-[9px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
              Completed
            </Text>
            <Text className="mt-1.5 font-poppins-bold text-2xl text-primary-green dark:text-emerald-400">
              {completedJobsThisMonth}
            </Text>
          </View>

          <View className="min-w-[47%] flex-1 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/60 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
            <View className="mb-3 h-1 w-7 rounded-full bg-warning" />
            <Text className="font-poppins text-[9px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
              Avg. rating
            </Text>
            <Text className="mt-1.5 font-poppins-bold text-2xl text-warning">
              {rating}
            </Text>
          </View>
        </View>
      </View>

      {/* Booking Requests */}
      <View className="mb-6">
        <Text className="font-poppins-semibold text-base text-text-primary dark:text-slate-100 mb-3">
          Service Requests ({pendingRequests.length})
        </Text>

        {pendingRequests.length === 0 ? (
          <View className="items-center justify-center py-10 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800">
            <Text className="text-3xl mb-2">📭</Text>
            <Text className="font-poppins-semibold text-sm text-text-primary dark:text-slate-200">
              All caught up!
            </Text>
            <Text className="font-poppins text-xs text-text-secondary dark:text-slate-500 text-center px-6 mt-1">
              New job requests from clients will show up here.
            </Text>
          </View>
        ) : (
          pendingRequests.map((req) => (
            <BookingRequestCard
              key={req.id}
              request={req}
              onAccept={handleAcceptBooking}
              onDecline={onDeclineBooking}
              onMessagePress={onMessageClient}
            />
          ))
        )}
      </View>

      {/* Tracker Progression Preview */}
      <View className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 mb-8">
        <Text className="font-poppins-semibold text-xs text-text-secondary dark:text-slate-500 uppercase tracking-widest mb-4">
          Job Management System
        </Text>
        <View className="flex-row justify-between items-center relative">
          {/* Background line */}
          <View className="absolute left-6 right-6 top-4 h-0.5 bg-slate-100 dark:bg-slate-800 z-0" />

          <View className="items-center z-10">
            <View className="w-8 h-8 rounded-full bg-primary-purple items-center justify-center mb-1">
              <Text className="text-white text-xs font-poppins-semibold">1</Text>
            </View>
            <Text className="font-poppins-medium text-[10px] text-text-primary dark:text-slate-300">Request</Text>
          </View>

          <View className="items-center z-10">
            <View className="w-8 h-8 rounded-full bg-primary-purple items-center justify-center mb-1">
              <Text className="text-white text-xs font-poppins-semibold">2</Text>
            </View>
            <Text className="font-poppins-medium text-[10px] text-text-primary dark:text-slate-300">Accept</Text>
          </View>

          <View className="items-center z-10">
            <View className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 items-center justify-center mb-1 border border-slate-300 dark:border-slate-700">
              <Text className="text-text-secondary dark:text-slate-400 text-xs font-poppins-semibold">3</Text>
            </View>
            <Text className="font-poppins-medium text-[10px] text-text-secondary dark:text-slate-500">Execute</Text>
          </View>

          <View className="items-center z-10">
            <View className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 items-center justify-center mb-1 border border-slate-300 dark:border-slate-700">
              <Text className="text-text-secondary dark:text-slate-400 text-xs font-poppins-semibold">4</Text>
            </View>
            <Text className="font-poppins-medium text-[10px] text-text-secondary dark:text-slate-500">Paid</Text>
          </View>
        </View>
      </View>
    </ScrollView>

    <AcceptJobSuccessModal
      visible={acceptedRequest !== null}
      request={acceptedRequest}
      onDismiss={() => setAcceptedRequest(null)}
      onGoToTasks={() => {
        setAcceptedRequest(null);
        onGoToTasks();
      }}
    />
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
    paddingBottom: Platform.OS === 'web' ? 80 : 40,
  },
});
