import type { MembershipPlan, Trainer, Testimonial, Facility } from '../types/index';
import { FaUsers, FaTrophy, FaHeart, FaStar } from 'react-icons/fa';
import { crossfit, gym, lockerShower, personalTraining, strengthTraining } from '../assets';


export const heroContent = {
  title: "Transform Your Body, Transform Your Life",
  subtitle: "Join hundreds of members achieving their fitness goals at TC Fitness. Where excellence meets dedication.",
  description: "Professional fitness training with state-of-the-art equipment",
  ctaButtonText: "Start Your Journey",
  secondaryButtonText: "Learn More"
};

export const aboutContent = {
  title: "About TC Fitness",
  subtitle: "Your Premier Fitness Destination",
  description: "At TC Fitness, we believe that fitness is not just about working out – it's about creating a lifestyle that empowers you to be the best version of yourself. Our state-of-the-art facility, experienced trainers, and supportive community create the perfect environment for achieving your fitness goals.",
  stats: [
    { icon: FaUsers, value: '500+', label: 'Active Members' },
    { icon: FaTrophy, value: '10+', label: 'Years Experience' },
    { icon: FaHeart, value: '98%', label: 'Satisfaction Rate' },
    { icon: FaStar, value: '4.7', label: 'Google Rating' },
  ]
};


// Company info for fallback
export const companyInfo = {
  companyName: "TC Fitness",
  tagline: "Transform Your Body, Transform Your Life",
  description: "TC Fitness is your premier destination for achieving your fitness goals. With state-of-the-art equipment, expert trainers, and a supportive community, we're here to help you on your fitness journey.",
  email: "info@tcfitness.com",
  phone: "+1 (555) 123-4567",
  address: "123 Fitness Street, Wellness City, WC 12345",
  socialLinks: {
    facebook: "https://facebook.com/tcfitness",
    instagram: "https://instagram.com/tcfitness",
    twitter: "https://twitter.com/tcfitness",
    linkedin: "https://linkedin.com/company/tcfitness"
  }
};

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
    name: 'Chandhan',
    specialization: 'CrossFit & HIIT',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    experience: 7,
  },
  {
    id: '2',
    name: 'Emma Wilson',
    specialization: 'Strength Training',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    experience: 5,
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
    name: 'Strength Training',
    backgroundImage: strengthTraining,
    description: 'Latest cardio and strength training equipment',
  },
  {
    id: '2',
    name: 'Group Classes',
    backgroundImage: crossfit,
    description: 'crossfit, HIIT, and more group sessions',
  },
  {
    id: '3',
    name: 'Personal Training',
    backgroundImage: personalTraining,
    description: 'Certified trainers for personalized guidance',
  },
  {
    id: '4',
    name: 'Locker Rooms',
    backgroundImage: lockerShower,
    description: 'Clean and spacious locker rooms with showers',
  },
  {
    id: '5',
    name: '5-9am and 5-9pm',
    backgroundImage: gym,
    description: 'Available for all members',
  },
];

