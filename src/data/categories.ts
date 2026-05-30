export interface Category {
  id: string;
  name: string;
  icon: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  dotColor: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'carpentry',
    name: 'Carpentry',
    icon: '🔨',
    bgClass: 'bg-amber-50 dark:bg-amber-950/20',
    textClass: 'text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-100 dark:border-amber-900/30',
    dotColor: '#D97706',
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '🪠',
    bgClass: 'bg-blue-50 dark:bg-blue-950/20',
    textClass: 'text-primary-blue dark:text-blue-400',
    borderClass: 'border-blue-100 dark:border-blue-900/30',
    dotColor: '#4D8BFF',
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    bgClass: 'bg-yellow-50 dark:bg-yellow-950/20',
    textClass: 'text-warning dark:text-yellow-400',
    borderClass: 'border-yellow-100 dark:border-yellow-900/30',
    dotColor: '#FFC800',
  },
  {
    id: 'tailoring',
    name: 'Tailoring',
    icon: '🪡',
    bgClass: 'bg-purple-50 dark:bg-purple-950/20',
    textClass: 'text-primary-purple dark:text-purple-400',
    borderClass: 'border-purple-105 dark:border-purple-900/30',
    dotColor: '#6C4EF5',
  },
  {
    id: 'masonry',
    name: 'Masonry',
    icon: '🧱',
    bgClass: 'bg-orange-50 dark:bg-orange-950/20',
    textClass: 'text-orange-600 dark:text-orange-400',
    borderClass: 'border-orange-100 dark:border-orange-900/30',
    dotColor: '#EA580C',
  },
  {
    id: 'hairdressing',
    name: 'Saloon',
    icon: '💇',
    bgClass: 'bg-rose-50 dark:bg-rose-950/20',
    textClass: 'text-rose-600 dark:text-rose-400',
    borderClass: 'border-rose-100 dark:border-rose-900/30',
    dotColor: '#E11D48',
  },
];
