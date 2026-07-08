export interface Program {
  id: string;
  title: string;
  iconName: string;
  description: string;
  duration: string;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  benefits: string[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string[];
  bio: string;
  image: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface MembershipTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'equipment' | 'workouts' | 'transformations' | 'events';
  image: string;
}

export interface Transformation {
  id: string;
  name: string;
  beforeImg: string;
  afterImg: string;
  beforeWeight: string;
  afterWeight: string;
  muscleGained: string;
  fatReduced: string;
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  image: string;
  role: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Tip {
  id: string;
  title: string;
  category: 'nutrition' | 'training' | 'recovery' | 'mindset';
  text: string;
}
