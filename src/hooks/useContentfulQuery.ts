import { useQuery } from '@tanstack/react-query';
import { contentfulService } from '../services/contentful';
import { 
  heroContent, 
  aboutContent, 
  membershipPlans, 
  trainers, 
  testimonials, 
  facilities,
  companyInfo
} from '../data/mockData';

// Hero content hook
export const useHeroContent = () => {
  return useQuery({
    queryKey: ['hero'],
    queryFn: async () => {
      try {
        const data = await contentfulService.getHeroContent();
        return data || heroContent;
      } catch (error) {
        console.warn('Using fallback hero data:', error);
        return heroContent;
      }
    },
  });
};

// About content hook
export const useAboutContent = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      try {
        const data = await contentfulService.getAboutContent();
        return data || aboutContent;
      } catch (error) {
        console.warn('Using fallback about data:', error);
        return aboutContent;
      }
    },
  });
};

// Facilities hook
export const useFacilities = () => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      try {
        const data = await contentfulService.getFacilities();
        if (!data || data.length === 0) {
          return facilities.map(facility => ({
            name: facility.name,
            description: facility.description,
            icon: facility.icon,
            backgroundImage: facility.backgroundImage // ✅ Include backgroundImage
          }));
        }
        return data;
      } catch (error) {
        console.warn('Using fallback facilities data:', error);
        return facilities.map(facility => ({
          name: facility.name,
          description: facility.description,
          icon: facility.icon,
          backgroundImage: facility.backgroundImage // ✅ Include backgroundImage
        }));
      }
    },
  });
};

// Trainers hook
export const useTrainers = () => {
  return useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      try {
        const data = await contentfulService.getTrainers();
        if (!data || data.length === 0) {
          return trainers.map(trainer => ({
            name: trainer.name,
            specialization: trainer.specialization,
            experience: `${trainer.experience} years`,
            image: { 
              sys: { id: trainer.id },
              fields: { 
                title: trainer.name,
                file: { 
                  url: trainer.image,
                  details: { image: { width: 400, height: 400 } }
                }
              }
            }
          }));
        }
        return data;
      } catch (error) {
        console.warn('Using fallback trainers data:', error);
        return trainers.map(trainer => ({
          name: trainer.name,
          specialization: trainer.specialization,
          experience: `${trainer.experience} years`,
          image: { 
            sys: { id: trainer.id },
            fields: { 
              title: trainer.name,
              file: { 
                url: trainer.image,
                details: { image: { width: 400, height: 400 } }
              }
            }
          }
        }));
      }
    },
  });
};

// Membership plans hook
export const useMembershipPlans = () => {
  return useQuery({
    queryKey: ['membershipPlans'],
    queryFn: async () => {
      try {
        const data = await contentfulService.getMembershipPlans();
        if (!data || data.length === 0) {
          return membershipPlans.map(plan => ({
            id: plan.id,
            name: plan.name,
            price: plan.price,
            yearlyPrice: plan.yearlyPrice,
            features: plan.features,
            popular: plan.popular || false
          }));
        }
        return data;
      } catch (error) {
        console.warn('Using fallback membership plans data:', error);
        return membershipPlans.map(plan => ({
          id: plan.id,
          name: plan.name,
          price: plan.price,
          yearlyPrice: plan.yearlyPrice,
          features: plan.features,
          popular: plan.popular || false
        }));
      }
    },
  });
};

// Testimonials hook
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      try {
        const data = await contentfulService.getTestimonials();
        if (!data || data.length === 0) {
          return testimonials.map(testimonial => ({
            name: testimonial.name,
            comment: testimonial.comment,
            rating: testimonial.rating,
            plan: testimonial.plan
          }));
        }
        return data;
      } catch (error) {
        console.warn('Using fallback testimonials data:', error);
        return testimonials.map(testimonial => ({
          name: testimonial.name,
          comment: testimonial.comment,
          rating: testimonial.rating,
          plan: testimonial.plan
        }));
      }
    },
  });
};

// Company info hook
export const useCompanyInfo = () => {
  return useQuery({
    queryKey: ['companyInfo'],
    queryFn: async () => {
      try {
        const data = await contentfulService.getCompanyInfo();
        return data || companyInfo;
      } catch (error) {
        console.warn('Using fallback company info data:', error);
        return companyInfo;
      }
    },
  });
};
