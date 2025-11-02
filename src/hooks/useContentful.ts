import { useState, useEffect } from 'react';
import { contentfulService } from '../services/contentful';
import type { 
  HeroContent, 
  AboutContent, 
  FacilityContent, 
  TrainerContent, 
  MembershipPlanContent, 
  TestimonialContent, 
  CompanyInfoContent 
} from '../services/contentful';
import { 
  heroContent, 
  aboutContent, 
  membershipPlans, 
  trainers, 
  testimonials, 
  facilities,
  companyInfo
} from '../data/mockData';

// Hook for hero content
export const useHeroContent = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await contentfulService.getHeroContent();
        
        if (!data) {
          console.log('Using mock hero data');
          setContent(heroContent);
        } else {
          setContent(data);
        }
        setError(null);
      } catch (err) {
        console.warn('Contentful Hero content fetch failed, using mock data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch hero content');
        setContent(heroContent);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
};

// Hook for about content
export const useAboutContent = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await contentfulService.getAboutContent();
        
        if (!data) {
          console.log('Using mock about data');
          setContent(aboutContent);
        } else {
          setContent(data);
        }
        setError(null);
      } catch (err) {
        console.warn('Contentful About content fetch failed, using mock data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch about content');
        setContent(aboutContent);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
};

// Hook for facilities
export const useFacilities = () => {
  const [facilityList, setFacilityList] = useState<FacilityContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const data = await contentfulService.getFacilities();
        
        if (!data || data.length === 0) {
          console.log('Using mock facilities data');
          const mockFacilitiesData: FacilityContent[] = facilities.map(facility => ({
            name: facility.name,
            description: facility.description,
            icon: facility.icon
          }));
          setFacilityList(mockFacilitiesData);
        } else {
          setFacilityList(data);
        }
        setError(null);
      } catch (err) {
        console.warn('Contentful facilities fetch failed, using mock data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch facilities');
        const mockFacilitiesData: FacilityContent[] = facilities.map(facility => ({
          name: facility.name,
          description: facility.description,
          icon: facility.icon
        }));
        setFacilityList(mockFacilitiesData);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  return { facilities: facilityList, loading, error };
};

// Hook for trainers
export const useTrainers = () => {
  const [trainerList, setTrainerList] = useState<TrainerContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const data = await contentfulService.getTrainers();
        
        if (!data || data.length === 0) {
          console.log('Using mock trainers data');
          const mockTrainersData: TrainerContent[] = trainers.map(trainer => ({
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
          setTrainerList(mockTrainersData);
        } else {
          setTrainerList(data);
        }
        setError(null);
      } catch (err) {
        console.warn('Contentful trainers fetch failed, using mock data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch trainers');
        const mockTrainersData: TrainerContent[] = trainers.map(trainer => ({
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
        setTrainerList(mockTrainersData);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return { trainers: trainerList, loading, error };
};

// Hook for membership plans
export const useMembershipPlans = () => {
  const [plans, setPlans] = useState<MembershipPlanContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await contentfulService.getMembershipPlans();
        
        // If no data from Contentful, use mock data
        if (!data || data.length === 0) {
          console.log('Using mock membership plans data');
          const mockPlansData: MembershipPlanContent[] = membershipPlans.map(plan => ({
            id: plan.id,
            name: plan.name,
            price: plan.price,
            yearlyPrice: plan.yearlyPrice,
            features: plan.features,
            popular: plan.popular || false
          }));
          setPlans(mockPlansData);
        } else {
          setPlans(data);
        }
      } catch (err) {
        console.warn('Contentful membership plans fetch failed, using mock data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch membership plans');
        // Use mock data as fallback
        const mockPlansData: MembershipPlanContent[] = membershipPlans.map(plan => ({
          id: plan.id,
          name: plan.name,
          price: plan.price,
          yearlyPrice: plan.yearlyPrice,
          features: plan.features,
          popular: plan.popular || false
        }));
        setPlans(mockPlansData);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
};

// Hook for testimonials
export const useTestimonials = () => {
  const [testimonialList, setTestimonialList] = useState<TestimonialContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await contentfulService.getTestimonials();
        
        if (!data || data.length === 0) {
          console.log('Using mock testimonials data');
          const mockTestimonialsData: TestimonialContent[] = testimonials.map(testimonial => ({
            name: testimonial.name,
            comment: testimonial.comment,
            rating: testimonial.rating,
            plan: testimonial.plan
          }));
          setTestimonialList(mockTestimonialsData);
        } else {
          setTestimonialList(data);
        }
        setError(null);
      } catch (err) {
        console.warn('Contentful testimonials fetch failed, using mock data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
        const mockTestimonialsData: TestimonialContent[] = testimonials.map(testimonial => ({
          name: testimonial.name,
          comment: testimonial.comment,
          rating: testimonial.rating,
          plan: testimonial.plan
        }));
        setTestimonialList(mockTestimonialsData);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials: testimonialList, loading, error };
};

// Hook for company info
export const useCompanyInfo = () => {
  const [info, setInfo] = useState<CompanyInfoContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const data = await contentfulService.getCompanyInfo();
        
        if (!data) {
          console.log('Using mock company info data');
          setInfo(companyInfo);
        } else {
          setInfo(data);
        }
        setError(null);
      } catch (err) {
        console.warn('Contentful company info fetch failed, using mock data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch company info');
        setInfo(companyInfo);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  return { info, loading, error };
};

// Combined hook for all content (useful for initial page load)
export const useAllContent = () => {
  const hero = useHeroContent();
  const about = useAboutContent();
  const facilities = useFacilities();
  const trainers = useTrainers();
  const plans = useMembershipPlans();
  const testimonials = useTestimonials();
  const company = useCompanyInfo();

  const loading = hero.loading || about.loading || facilities.loading || 
                 trainers.loading || plans.loading || testimonials.loading || company.loading;

  const error = hero.error || about.error || facilities.error || 
               trainers.error || plans.error || testimonials.error || company.error;

  return {
    hero: hero.content,
    about: about.content,
    facilities: facilities.facilities,
    trainers: trainers.trainers,
    plans: plans.plans,
    testimonials: testimonials.testimonials,
    company: company.info,
    loading,
    error
  };
};
