export interface Artisan {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  jobsCompleted: number;
  location: string;
  distance: string;
  rate: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  isAvailable: boolean;
}

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

export const ARTISANS: Artisan[] = [
  {
    id: 'art-1',
    name: 'Babajide Alao',
    category: 'carpentry',
    rating: 4.9,
    reviewsCount: 32,
    jobsCompleted: 45,
    location: 'Ilisan Central',
    distance: '0.6 km',
    rate: '₦5,000/hr',
    bio: 'Master craftsman with over 10 years of experience in furniture making, roof structures, and wood repairs. Known for precision and high-quality local materials.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 'art-2',
    name: 'Chioma Okafor',
    category: 'tailoring',
    rating: 4.95,
    reviewsCount: 48,
    jobsCompleted: 62,
    location: 'Market Square',
    distance: '1.2 km',
    rate: '₦12,000/day',
    bio: 'Specialized in bespoke traditional outfits, corporate wear, and wedding attire. High attention to detail and fast delivery times.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 'art-3',
    name: 'Tunde Falode',
    category: 'plumbing',
    rating: 4.8,
    reviewsCount: 22,
    jobsCompleted: 29,
    location: 'Near Babcock Univ',
    distance: '1.8 km',
    rate: '₦4,000/hr',
    bio: 'Expert in residential plumbing, leak detection, pipe replacement, and water pump repairs. Available for emergency callouts.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 'art-4',
    name: 'Ibrahim Musa',
    category: 'electrical',
    rating: 4.7,
    reviewsCount: 18,
    jobsCompleted: 24,
    location: 'Expressway Junction',
    distance: '2.5 km',
    rate: '₦3,500/hr',
    bio: 'Licensed domestic electrician. Expertise includes house wiring, inverter setups, generator maintenance, and electrical appliance fixes.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    isVerified: false,
    isAvailable: true,
  },
  {
    id: 'art-5',
    name: 'Funmilayo Bello',
    category: 'hairdressing',
    rating: 4.9,
    reviewsCount: 38,
    jobsCompleted: 50,
    location: 'Babcock Gate Road',
    distance: '0.9 km',
    rate: '₦8,000/day',
    bio: 'Professional hair stylist and beautician. Expert in knotless braids, dreadlocks, hair extensions, and bridal styling.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 'art-6',
    name: 'Gbenga Adebayo',
    category: 'masonry',
    rating: 4.6,
    reviewsCount: 12,
    jobsCompleted: 18,
    location: 'Oru Road',
    distance: '3.1 km',
    rate: '₦15,000/day',
    bio: 'Experienced bricklayer and plastering specialist. Quality workmanship on building extensions, tiling, and compound paving.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    isVerified: false,
    isAvailable: false,
  },
];

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
