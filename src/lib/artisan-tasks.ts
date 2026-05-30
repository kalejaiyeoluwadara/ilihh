import type { BookingRequest } from '@/data/artisans';
import type { ClientBooking } from '@/types/booking';

export const DEFAULT_CLIENT_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';

export interface ArtisanTask {
  id: string;
  clientName: string;
  clientAvatar: string;
  serviceTitle?: string;
  serviceDescription: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  budget: string;
}

export function clientBookingToRequest(booking: ClientBooking): BookingRequest {
  const status =
    booking.status === 'cancelled'
      ? 'declined'
      : booking.status === 'accepted' || booking.status === 'completed'
        ? booking.status
        : 'pending';

  return {
    id: booking.id,
    clientName: booking.clientName ?? 'Client',
    clientAvatar: booking.clientAvatar ?? DEFAULT_CLIENT_AVATAR,
    serviceNeeded: booking.artisanCategory,
    description: booking.serviceDescription,
    price: booking.budget,
    location: booking.location,
    date: booking.preferredDate,
    time: booking.preferredTime,
    status,
  };
}

export function bookingRequestToTask(request: BookingRequest): ArtisanTask {
  return {
    id: request.id,
    clientName: request.clientName,
    clientAvatar: request.clientAvatar,
    serviceTitle: request.serviceNeeded,
    serviceDescription: request.description,
    location: request.location,
    preferredDate: request.date,
    preferredTime: request.time,
    budget: request.price,
  };
}

export function clientBookingToTask(booking: ClientBooking): ArtisanTask {
  return {
    id: booking.id,
    clientName: booking.clientName ?? 'Client',
    clientAvatar: booking.clientAvatar ?? DEFAULT_CLIENT_AVATAR,
    serviceTitle: booking.artisanCategory,
    serviceDescription: booking.serviceDescription,
    location: booking.location,
    preferredDate: booking.preferredDate,
    preferredTime: booking.preferredTime,
    budget: booking.budget,
  };
}

export function buildArtisanTasks(
  mockRequests: BookingRequest[],
  clientBookings: ClientBooking[]
): ArtisanTask[] {
  const acceptedMock = mockRequests
    .filter((request) => request.status === 'accepted')
    .map(bookingRequestToTask);

  const acceptedClient = clientBookings
    .filter((booking) => booking.status === 'accepted')
    .map(clientBookingToTask);

  return [...acceptedClient, ...acceptedMock];
}

export function buildDashboardRequests(
  mockRequests: BookingRequest[],
  clientBookings: ClientBooking[]
): BookingRequest[] {
  const clientPending = clientBookings
    .filter((booking) => booking.status === 'pending')
    .map(clientBookingToRequest);

  return [...mockRequests, ...clientPending];
}
