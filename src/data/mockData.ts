import type { MembershipPlan, Trainer, Testimonial, Facility } from '../types/index';

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 600,
    yearlyPrice: 5000,
    features: [
      'Access to gym facilities',
      'Locker access',
      'Nutrition consultation',
      'Free fitness assessment',
    ],
  },
  {
    id: 'crossfit',
    name: 'crossfit',
    price: 800,
    yearlyPrice: 7000,
    features: [
      'Everything in Basic',
      'All group crossfit classes',
      'Nutrition consultation',
    ],
    popular: true,
  },
  {
    id: 'personal-training',
    name: 'personal-training',
    price: 5000,
    yearlyPrice: 40000,
    features: [
      'Everything in Premium',
      'Unlimited personal training',
      'Nutrition consultation',
    ],
  },
];

export const trainers: Trainer[] = [
  {
    id: '1',
    name: 'John Smith',
    specialization: 'Strength Training',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    experience: 7,
  },
  {
    id: '2',
    name: 'Emma Wilson',
    specialization: 'CrossFit & HIIT',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    experience: 10,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'David Chen',
    rating: 5,
    comment: 'Best gym experience I\'ve ever had! The trainers are amazing and the facilities are top-notch.',
    plan: 'Premium',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    rating: 5,
    comment: 'I\'ve been a member for 2 years and have seen incredible results. Highly recommended!',
    plan: 'Pro',
  },
  {
    id: '3',
    name: 'James Brown',
    rating: 5,
    comment: 'Great atmosphere and friendly staff. The membership plans are very reasonable.',
    plan: 'Basic',
  },
  {
    id: '4',
    name: 'Lisa Anderson',
    rating: 5,
    comment: 'The group classes are fantastic and the equipment is always well-maintained.',
    plan: 'Premium',
  },
];

export const facilities: Facility[] = [
  {
    id: '1',
    name: 'State-of-the-art Equipment',
    icon: '💪',
    description: 'Latest cardio and strength training equipment',
  },
  {
    id: '2',
    name: 'Group Classes',
    icon: '🏋️',
    description: 'crossfit, HIIT, and more group sessions',
  },
  {
    id: '3',
    name: 'Personal Training',
    icon: '👨‍🏫',
    description: 'Certified trainers for personalized guidance',
  },
  {
    id: '4',
    name: 'Locker Rooms',
    icon: '🚿',
    description: 'Clean and spacious locker rooms with showers',
  },
  {
    id: '5',
    name: 'morning 5-9 am and evening 5-9 pm',
    icon: '⏰',
    description: 'Available for all members',
  },
];

