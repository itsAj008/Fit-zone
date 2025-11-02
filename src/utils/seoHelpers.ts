// SEO helper utilities
export const seoConfig = {
  siteName: 'FitZone - Premium Fitness Center',
  siteDescription: 'Transform your body and life at FitZone. Premium gym facilities, expert trainers, and personalized fitness programs. Join 500+ satisfied members today.',
  siteUrl: 'https://fitzone-gym.com', // Replace with actual domain
  social: {
    facebook: 'https://facebook.com/fitzone',
    instagram: 'https://instagram.com/fitzone',
    twitter: 'https://twitter.com/fitzone',
  },
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'info@fitzone-gym.com',
    address: '123 Fitness Street, Gym City, GC 12345',
  }
};

export const generateJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "name": seoConfig.siteName,
    "description": seoConfig.siteDescription,
    "url": seoConfig.siteUrl,
    "telephone": seoConfig.contact.phone,
    "email": seoConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Fitness Street",
      "addressLocality": "Gym City",
      "addressRegion": "GC",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "openingHours": [
      "Mo-Fr 05:00-22:00",
      "Sa 06:00-20:00",
      "Su 07:00-19:00"
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Personal Training"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Group Classes"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Cardio Equipment"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Strength Training"
      }
    ],
    "priceRange": "$600-$5000 per month",
    "sameAs": [
      seoConfig.social.facebook,
      seoConfig.social.instagram,
      seoConfig.social.twitter
    ]
  };
};

export const getPageTitle = (page?: string) => {
  const baseTitle = seoConfig.siteName;
  if (!page) return baseTitle;
  return `${page} | ${baseTitle}`;
};

export const getPageDescription = (page?: string) => {
  const descriptions: Record<string, string> = {
    home: seoConfig.siteDescription,
    about: 'Learn about FitZone\'s mission, values, and commitment to helping you achieve your fitness goals with our expert team.',
    facilities: 'Explore our state-of-the-art gym facilities, equipment, and amenities designed for your optimal workout experience.',
    trainers: 'Meet our certified personal trainers and fitness experts dedicated to helping you reach your health and fitness goals.',
    plans: 'Choose from our flexible membership plans designed to fit your lifestyle and budget. Start your fitness journey today.',
    contact: 'Get in touch with FitZone. Find our location, hours, and contact information. Start your fitness journey with us today.'
  };
  
  return descriptions[page || 'home'] || seoConfig.siteDescription;
};
