export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  completedAt: string;
}

export interface ArtisanReview {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export interface ArtisanContact {
  phone: string;
  email: string;
  address: string;
  serviceArea: string;
}

export interface ArtisanBilling {
  summary: string;
  paymentMethods: string[];
  notes: string[];
}

export interface ArtisanDetail {
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
  yearsExperience: number;
  responseTime: string;
  contact: ArtisanContact;
  billing?: ArtisanBilling;
  portfolio: PortfolioItem[];
  reviews: ArtisanReview[];
}

export type ArtisanSummary = Pick<
  ArtisanDetail,
  | 'id'
  | 'name'
  | 'category'
  | 'rating'
  | 'reviewsCount'
  | 'jobsCompleted'
  | 'location'
  | 'distance'
  | 'rate'
  | 'bio'
  | 'avatar'
  | 'isVerified'
  | 'isAvailable'
>;

export type Artisan = ArtisanSummary;
