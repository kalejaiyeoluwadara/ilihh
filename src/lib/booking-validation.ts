import type {
  BookingFormValues,
  BookingValidationErrors,
  BookingValidationResult,
} from '@/types/booking';

export function validateBookingForm(values: BookingFormValues): BookingValidationResult {
  const errors: BookingValidationErrors = {};

  const description = values.serviceDescription.trim();
  if (!description) {
    errors.serviceDescription = 'Describe what you need done';
  } else if (description.length < 10) {
    errors.serviceDescription = 'Add a bit more detail (at least 10 characters)';
  }

  const location = values.location.trim();
  if (!location) {
    errors.location = 'Service location is required';
  } else if (location.length < 3) {
    errors.location = 'Enter a valid location';
  }

  if (!values.preferredDate) {
    errors.preferredDate = 'Preferred date is required';
  }

  if (!values.preferredTime) {
    errors.preferredTime = 'Preferred time is required';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
