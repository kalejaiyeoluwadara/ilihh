export type BookingStatus = 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';

export interface ClientBooking {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  artisanCategory: string;
  serviceDescription: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  budget: string;
  status: BookingStatus;
  createdAt: string;
}

export interface CreateBookingPayload {
  clientId: string;
  clientName: string;
  clientAvatar: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  artisanCategory: string;
  serviceDescription: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  budget: string;
}

export interface BookingFormValues {
  serviceDescription: string;
  location: string;
  preferredDate: Date | null;
  preferredTime: Date | null;
  budget: string;
}

export interface BookingValidationErrors {
  serviceDescription?: string;
  location?: string;
  preferredDate?: string;
  preferredTime?: string;
  budget?: string;
}

export interface BookingValidationResult {
  isValid: boolean;
  errors: BookingValidationErrors;
}
