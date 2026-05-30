import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { safeStorage } from '@/lib/storage';
import type { ClientBooking, CreateBookingPayload } from '@/types/booking';

interface BookingState {
  bookings: ClientBooking[];
  createBooking: (payload: CreateBookingPayload) => ClientBooking;
  acceptBooking: (id: string) => void;
  declineBooking: (id: string) => void;
  cancelBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],

      createBooking: (payload) => {
        const booking: ClientBooking = {
          id: `booking-${Date.now()}`,
          clientId: payload.clientId,
          clientName: payload.clientName.trim(),
          clientAvatar: payload.clientAvatar,
          artisanId: payload.artisanId,
          artisanName: payload.artisanName,
          artisanAvatar: payload.artisanAvatar,
          artisanCategory: payload.artisanCategory,
          serviceDescription: payload.serviceDescription.trim(),
          location: payload.location.trim(),
          preferredDate: payload.preferredDate.trim(),
          preferredTime: payload.preferredTime.trim(),
          budget: payload.budget.trim(),
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        set({ bookings: [booking, ...get().bookings] });
        return booking;
      },

      cancelBooking: (id) => {
        set({
          bookings: get().bookings.map((booking) =>
            booking.id === id && booking.status === 'pending'
              ? { ...booking, status: 'cancelled' }
              : booking
          ),
        });
      },

      acceptBooking: (id) => {
        set({
          bookings: get().bookings.map((booking) =>
            booking.id === id && booking.status === 'pending'
              ? { ...booking, status: 'accepted' }
              : booking
          ),
        });
      },

      declineBooking: (id) => {
        set({
          bookings: get().bookings.map((booking) =>
            booking.id === id && booking.status === 'pending'
              ? { ...booking, status: 'declined' }
              : booking
          ),
        });
      },
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);

export function getBookingsForClient(bookings: ClientBooking[], clientId: string) {
  return bookings.filter((booking) => booking.clientId === clientId);
}

export function getBookingById(bookings: ClientBooking[], bookingId: string) {
  return bookings.find((booking) => booking.id === bookingId);
}
