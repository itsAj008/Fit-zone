import { createClient } from 'contentful';

// Check if Contentful is properly configured
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

const isContentfulConfigured = spaceId && accessToken && spaceId !== 'your_space_id_here' && accessToken !== 'your_access_token_here';

// Initialize Contentful client only if properly configured
const client = isContentfulConfigured ? createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment
}) : null;

// Type definitions for Contentful entries
export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaButtonText: string;
  secondaryButtonText: string;
  backgroundImage?: ContentfulAsset;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  stats: Array<{
    number: string;
    label: string;
  }>;
  image?: ContentfulAsset;
}

export interface FacilityContent {
  name: string;
  description: string;
  icon: string;
}

export interface TrainerContent {
  name: string;
  specialization: string;
  experience: string;
  image?: ContentfulAsset;
}

export interface MembershipPlanContent {
  id?: string;
  name: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  popular: boolean;
}

export interface TestimonialContent {
  name: string;
  comment: string;
  rating: number;
  plan: string;
}

export interface CompanyInfoContent {
  companyName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// Contentful service functions
export const contentfulService = {
  // Get hero section content using specific entry ID
  async getHeroContent(): Promise<HeroContent | null> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return null;
      }
      
      // Get the specific entry by ID
      const entry = await client.getEntry('1jXYCTqMvQX8P92BwZnPYY');
      
      if (entry && entry.fields) {
        console.log('Contentful entry received:', entry.fields);
        return {
          title: entry.fields.title as string || 'Transform Your Body, Transform Your Life',
          subtitle: entry.fields.subtitle as string || 'Join TC Fitness',
          description: entry.fields.description as string || 'Professional fitness training',
          ctaButtonText: entry.fields.ctaButtonText as string || 'Start Your Journey',
          secondaryButtonText: entry.fields.secondaryButtonText as string || 'Learn More',
          backgroundImage: entry.fields.backgroundImage as ContentfulAsset
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching hero content:', error);
      return null;
    }
  },

  // Get about section content from the same entry
  async getAboutContent(): Promise<AboutContent | null> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return null;
      }
      
      const entry = await client.getEntry('1jXYCTqMvQX8P92BwZnPYY');
      
      if (entry && entry.fields) {
        return {
          title: entry.fields.aboutTitle as string || 'About TC Fitness',
          subtitle: entry.fields.aboutSubtitle as string || 'Your Premier Fitness Destination',
          description: entry.fields.aboutDescription as string || 'Professional fitness training',
          stats: entry.fields.aboutStats as Array<{number: string, label: string}> || [],
          image: entry.fields.aboutImage as ContentfulAsset
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching about content:', error);
      return null;
    }
  },

    // Get facilities (Note: Add facility fields to tcFitness content type if needed)
  async getFacilities(): Promise<FacilityContent[]> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return [];
      }
      
      // Since facilities are not in your current content type, return empty array
      // You can add facility fields to tcFitness content type later
      console.log('Facilities not configured in tcFitness content type, using mock data');
      return [];
    } catch (error) {
      console.error('Error fetching facilities:', error);
      return [];
    }
  },

  // Get testimonials (Note: Add testimonial fields to tcFitness content type if needed)
  async getTestimonials(): Promise<TestimonialContent[]> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return [];
      }
      
      // Since testimonials are not in your current content type, return empty array
      // You can add testimonial fields to tcFitness content type later
      console.log('Testimonials not configured in tcFitness content type, using mock data');
      return [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  // Get company info (Note: Add company fields to tcFitness content type if needed)
  async getCompanyInfo(): Promise<CompanyInfoContent | null> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return null;
      }
      
      // Since company info is not in your current content type, return null
      // You can add company info fields to tcFitness content type later
      console.log('Company info not configured in tcFitness content type, using mock data');
      return null;
    } catch (error) {
      console.error('Error fetching about content:', error);
      return null;
    }
  },

  // Get trainers from the same entry
  async getTrainers(): Promise<TrainerContent[]> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return [];
      }
      
      const entry = await client.getEntry('1jXYCTqMvQX8P92BwZnPYY');
      
      if (entry && entry.fields && entry.fields.trainers) {
        const trainersData = entry.fields.trainers as any[];
        return trainersData.map(trainer => ({
          name: trainer.fields?.trainerName || trainer.name,
          specialization: trainer.fields?.trainerSpecialization || trainer.specialization,
          experience: trainer.fields?.trainerExperience || trainer.experience,
          image: trainer.fields?.trainerImage || trainer.image
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching trainers:', error);
      return [];
    }
  },

  // Get membership plans from the same entry
  async getMembershipPlans(): Promise<MembershipPlanContent[]> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return [];
      }
      
      const entry = await client.getEntry('1jXYCTqMvQX8P92BwZnPYY');
      
      if (entry && entry.fields && entry.fields.membershipPlans) {
        const plansData = entry.fields.membershipPlans as any[];
        return plansData.map((plan, index) => ({
          id: plan.sys?.id || plan.id || `plan-${index}`,
          name: plan.fields?.membershipPlanName || plan.name,
          price: plan.fields?.membershipPlanPrice || plan.price,
          yearlyPrice: plan.fields?.membershipPlanYearlyPrice || plan.yearlyPrice,
          features: plan.fields?.membershipPlanFeatures || plan.features || [],
          popular: plan.fields?.membershipPlanPopular || plan.popular || false
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching membership plans:', error);
      return [];
    }
  }
};

export default client;
