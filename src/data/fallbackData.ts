// Fallback data when Contentful is not available or configured
import type { 
  HeroContent, 
  AboutContent, 
  FacilityContent, 
  TrainerContent, 
  MembershipPlanContent, 
  TestimonialContent, 
  CompanyInfoContent 
} from '../services/contentful';

export const fallbackData = {
  hero: {
    title: "Transform Your Body, Transform Your Life",
    subtitle: "Join hundreds of members achieving their fitness goals at FitZone. Where excellence meets dedication.",
    description: "Start your transformation journey today with our expert trainers and state-of-the-art facilities.",
    ctaButtonText: "Start Your Journey",
    secondaryButtonText: "Learn More"
  } as HeroContent,

  about: {
    title: "About FitZone",
    subtitle: "Your Fitness Journey Starts Here",
    description: "At FitZone, we believe fitness is more than just working out—it's about building a lifestyle that empowers you to be your best self. Our state-of-the-art facility, expert trainers, and supportive community create the perfect environment for transformation.",
    stats: [
      { number: "500+", label: "Active Members" },
      { number: "50+", label: "Expert Trainers" },
      { number: "100+", label: "Fitness Programs" },
      { number: "24/7", label: "Access Available" }
    ]
  } as AboutContent,

  facilities: [
    {
      name: "State-of-the-art Equipment",
      description: "Latest fitness machines and equipment from top brands for optimal workout experience",
      icon: "🏋️"
    },
    {
      name: "Group Fitness Classes",
      description: "Dynamic group sessions including yoga, HIIT, spinning, and dance fitness",
      icon: "👥"
    },
    {
      name: "Personal Training",
      description: "One-on-one sessions with certified trainers tailored to your specific goals",
      icon: "🎯"
    },
    {
      name: "Swimming Pool",
      description: "Olympic-size pool for lap swimming, water aerobics, and relaxation",
      icon: "🏊"
    },
    {
      name: "Spa & Recovery",
      description: "Sauna, steam room, and massage therapy for post-workout recovery",
      icon: "🧘"
    },
    {
      name: "Nutrition Counseling",
      description: "Expert nutritionists to help you fuel your body for optimal performance",
      icon: "🥗"
    }
  ] as FacilityContent[],

  trainers: [
    {
      name: "Sarah Johnson",
      specialization: "Strength & Conditioning",
      experience: "8 years experience"
    },
    {
      name: "Mike Chen",
      specialization: "HIIT & Cardio",
      experience: "6 years experience"
    },
    {
      name: "Lisa Rodriguez",
      specialization: "Yoga & Flexibility",
      experience: "10 years experience"
    },
    {
      name: "David Thompson",
      specialization: "Powerlifting",
      experience: "12 years experience"
    }
  ] as TrainerContent[],

  plans: [
    {
      id: "basic",
      name: "Basic",
      price: 999,
      yearlyPrice: 9999,
      features: [
        "Access to gym equipment",
        "Locker room access",
        "Basic fitness assessment",
        "Mobile app access"
      ],
      popular: false
    },
    {
      id: "premium",
      name: "Premium",
      price: 1999,
      yearlyPrice: 19999,
      features: [
        "Everything in Basic",
        "Group fitness classes",
        "Pool access",
        "2 personal training sessions/month",
        "Nutrition consultation",
        "Guest passes (2/month)"
      ],
      popular: true
    },
    {
      id: "elite",
      name: "Elite",
      price: 3999,
      yearlyPrice: 39999,
      features: [
        "Everything in Premium",
        "Unlimited personal training",
        "Spa access",
        "Priority booking",
        "Custom meal plans",
        "24/7 gym access",
        "Unlimited guest passes"
      ],
      popular: false
    }
  ] as MembershipPlanContent[],

  testimonials: [
    {
      name: "Alex Kumar",
      comment: "FitZone transformed my life! The trainers are amazing and the community is so supportive.",
      rating: 5,
      plan: "Premium"
    },
    {
      name: "Priya Sharma",
      comment: "Best decision I ever made. Lost 20kg and gained so much confidence!",
      rating: 5,
      plan: "Elite"
    },
    {
      name: "Rahul Patel",
      comment: "The facilities are top-notch and the staff is incredibly helpful and knowledgeable.",
      rating: 5,
      plan: "Premium"
    },
    {
      name: "Sneha Gupta",
      comment: "Love the group classes! Made so many friends and achieved my fitness goals.",
      rating: 5,
      plan: "Basic"
    }
  ] as TestimonialContent[],

  company: {
    companyName: "FitZone",
    tagline: "Transform Your Life",
    description: "Your premier destination for fitness and wellness",
    email: "info@fitzone.com",
    phone: "+91 98765 43210",
    address: "123 Fitness Street, Wellness City, India 400001",
    socialLinks: {
      facebook: "https://facebook.com/fitzone",
      instagram: "https://instagram.com/fitzone",
      twitter: "https://twitter.com/fitzone",
      linkedin: "https://linkedin.com/company/fitzone"
    }
  } as CompanyInfoContent
};
