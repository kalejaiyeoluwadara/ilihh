import { ARTISAN_DETAILS } from '@/data/artisan-details';
import type { Artisan } from '@/types/artisan-detail';

export type { Artisan };

export interface BookingRequest {
  id: string;
  clientName: string;
  clientAvatar: string;
  serviceNeeded: string;
  description: string;
  price: string;
  location: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

export const ARTISANS: Artisan[] = ARTISAN_DETAILS.map(
  ({
    id,
    name,
    category,
    rating,
    reviewsCount,
    jobsCompleted,
    location,
    distance,
    rate,
    bio,
    avatar,
    isVerified,
    isAvailable,
  }) => ({
    id,
    name,
    category,
    rating,
    reviewsCount,
    jobsCompleted,
    location,
    distance,
    rate,
    bio,
    avatar,
    isVerified,
    isAvailable,
  })
);

export const MOCK_BOOKING_REQUESTS: BookingRequest[] = [
  {
    id: 'req-1',
    clientName: 'Samuel Adekunle',
    clientAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    serviceNeeded: 'Carpentry Repair',
    description: 'Fixing the broken kitchen cabinet doors and installing new hinges.',
    price: '₦8,000',
    location: 'Babcock Staff Quarters',
    date: 'Today, 30th May',
    time: '2:30 PM',
    status: 'pending',
  },
  {
    id: 'req-2',
    clientName: 'Prof. Florence Cole',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    serviceNeeded: 'Emergency Plumbing',
    description: 'Burst kitchen pipe causing flooding. Needs immediate attention.',
    price: '₦12,000',
    location: 'Oru Road Estate',
    date: 'Tomorrow, 31st May',
    time: '9:00 AM',
    status: 'pending',
  },
  {
    id: 'req-3',
    clientName: 'Wale Banjo',
    clientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    serviceNeeded: 'Sewing Traditional Agbada',
    description: 'Tailoring measurement and sewing of standard 3-piece Agbada for upcoming wedding.',
    price: '₦25,000',
    location: 'Ilisan Central',
    date: 'Wednesday, 3rd June',
    time: '11:00 AM',
    status: 'pending',
  },
];

export const MOCK_STATS = {
  earningsThisWeek: '₦35,000',
  activeJobsCount: 2,
  completedJobsThisMonth: 14,
  rating: '4.9',
};
