import { createClient } from 'contentful';

// Check if Contentful is properly configured
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

// Initialize Contentful client
const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment
});

// Helper function to extract text from rich text content
const extractTextFromRichText = (richTextData: any): string => {
  if (!richTextData || !richTextData.content) return '';
  
  let text = '';
  const extractText = (node: any) => {
    if (node.nodeType === 'text') {
      text += node.value;
    } else if (node.content) {
      node.content.forEach(extractText);
    }
  };
  
  richTextData.content.forEach(extractText);
  return text.trim();
};

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
  title: string | null;
  subtitle: string | null;
  description: string | null;
  ctaButtonText: string | null;
  secondaryButtonText: string | null;
  backgroundImage?: ContentfulAsset;
}

export interface AboutContent {
  title: string | null;
  subtitle: string | null;
  description: string | null;
  stats: Array<{
    number: string;
    label: string;
  }> | null;
  image?: ContentfulAsset;
}

export interface FacilityContent {
  name: string | null;
  description: string | null;
  icon: string | null;
}

export interface TrainerContent {
  name: string | null;
  specialization: string | null;
  experience: string | null;
  image?: ContentfulAsset;
}

export interface MembershipPlanContent {
  id?: string;
  name: string | null;
  price: number | null;
  yearlyPrice: number | null;
  features: string[] | null;
  popular: boolean | null;
}

export interface TestimonialContent {
  name: string | null;
  comment: string | null;
  rating: number | null;
  plan: string | null;
}

export interface CompanyInfoContent {
  companyName: string | null;
  tagline: string | null;
  description: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
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
      
      // Get entries of tcFitness content type
      const response = await client.getEntries({
        content_type: 'tcFitness',
        limit: 1
      });
      
      console.log('Full Contentful response:', response);
      
      if (response.items && response.items.length > 0) {
        const entry = response.items[0];
        console.log('Entry fields:', entry.fields);
        
        const fields = entry.fields;
        
        return {
          title: fields.title as string || null,
          subtitle: fields.subtitle as string || null,
          description: extractTextFromRichText(fields.description) || null,
          ctaButtonText: fields.ctaButtonText as string || null,
          secondaryButtonText: fields.secondaryButtonText as string || null,
          backgroundImage: fields.backgroundImage as ContentfulAsset
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
      
      const response = await client.getEntries({
        content_type: 'tcFitness',
        limit: 1
      });
      
      if (response.items && response.items.length > 0) {
        const entry = response.items[0];
        const fields = entry.fields;
        
        return {
          title: fields.aboutTitle as string || null,
          subtitle: fields.aboutSubtitle as string || null,
          description: extractTextFromRichText(fields.aboutDescription) || null,
          stats: fields.aboutStats as Array<{number: string, label: string}> || null,
          image: fields.aboutImage as ContentfulAsset || null
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching about content:', error);
      return null;
    }
  },

  // Get facilities
  async getFacilities(): Promise<FacilityContent[]> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return [];
      }
      
      const response = await client.getEntries({
        content_type: 'tcFitness',
        limit: 1
      });
      
      if (response.items && response.items.length > 0) {
        const entry = response.items[0];
        const fields = entry.fields;
        
        if (fields.facilities && Array.isArray(fields.facilities)) {
          const facilitiesData = fields.facilities as any[];
          return facilitiesData.map(facility => ({
            name: facility.fields?.facilityName || facility.name || null,
            description: facility.fields?.facilityDescription || facility.description || null,
            icon: facility.fields?.facilityIcon || facility.icon || null
          }));
        }
      }
      
      // Return empty array if no facilities in CMS, components will use mock data
      return [];
    } catch (error) {
      console.error('Error fetching facilities:', error);
      return [];
    }
  },

  // Get testimonials
  async getTestimonials(): Promise<TestimonialContent[]> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return [];
      }
      
      const response = await client.getEntries({
        content_type: 'tcFitness',
        limit: 1
      });
      
      if (response.items && response.items.length > 0) {
        const entry = response.items[0];
        const fields = entry.fields;
        
        if (fields.testimonials && Array.isArray(fields.testimonials)) {
          const testimonialsData = fields.testimonials as any[];
          return testimonialsData.map(testimonial => ({
            name: testimonial.fields?.testimonialName || testimonial.name || null,
            comment: testimonial.fields?.testimonialComment || testimonial.comment || null,
            rating: testimonial.fields?.testimonialRating || testimonial.rating || null,
            plan: testimonial.fields?.testimonialPlan || testimonial.plan || null
          }));
        }
      }
      
      // Return empty array if no testimonials in CMS, components will use mock data
      return [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  // Get company info
  async getCompanyInfo(): Promise<CompanyInfoContent | null> {
    try {
      if (!client) {
        console.warn('Contentful not configured, using mock data');
        return null;
      }
      
      const response = await client.getEntries({
        content_type: 'tcFitness',
        limit: 1
      });
      
      if (response.items && response.items.length > 0) {
        const entry = response.items[0];
        const fields = entry.fields;
        
        if (fields.companyName || fields.companyInfo) {
          return {
            companyName: fields.companyName as string || null,
            tagline: fields.companyTagline as string || null,
            description: extractTextFromRichText(fields.companyDescription) || null,
            email: fields.companyEmail as string || null,
            phone: fields.companyPhone as string || null,
            address: fields.companyAddress as string || null,
            socialLinks: {
              facebook: fields.facebookLink as string || '',
              instagram: fields.instagramLink as string || '',
              twitter: fields.twitterLink as string || '',
              linkedin: fields.linkedinLink as string || ''
            }
          };
        }
      }
      
      // Return null if no company info in CMS, components will use mock data
      return null;
    } catch (error) {
      console.error('Error fetching company info:', error);
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
      
      const response = await client.getEntries({
        content_type: 'tcFitness',
        limit: 1
      });
      
      if (response.items && response.items.length > 0) {
        const entry = response.items[0];
        const fields = entry.fields;
        
        if (fields.trainers && Array.isArray(fields.trainers)) {
          const trainersData = fields.trainers as any[];
          return trainersData.map(trainer => ({
            name: trainer.fields?.trainerName || trainer.name || null,
            specialization: trainer.fields?.trainerSpecialization || trainer.specialization || null,
            experience: trainer.fields?.trainerExperience || trainer.experience || null,
            image: trainer.fields?.trainerImage || trainer.image
          }));
        }
      }
      
      // Return empty array if no trainers in CMS, components will use mock data
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
      
      const response = await client.getEntries({
        content_type: 'tcFitness',
        limit: 1
      });
      
      if (response.items && response.items.length > 0) {
        const entry = response.items[0];
        const fields = entry.fields;
        
        if (fields.membershipPlans && Array.isArray(fields.membershipPlans)) {
          const plansData = fields.membershipPlans as any[];
          return plansData.map((plan, index) => ({
            id: plan.sys?.id || plan.id || `plan-${index}`,
            name: plan.fields?.membershipPlanName || plan.name || null,
            price: plan.fields?.membershipPlanPrice || plan.price || null,
            yearlyPrice: plan.fields?.membershipPlanYearlyPrice || plan.yearlyPrice || null,
            features: plan.fields?.membershipPlanFeatures || plan.features || null,
            popular: plan.fields?.membershipPlanPopular || plan.popular || null
          }));
        }
      }
      
      // Return empty array if no plans in CMS, components will use mock data
      return [];
    } catch (error) {
      console.error('Error fetching membership plans:', error);
      return [];
    }
  }
};

export default client;
