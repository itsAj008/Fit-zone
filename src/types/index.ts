export type Trainer = {
  id: string;
  name: string;
  specialization: string;
  image: string;
  experience: number;
};

export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  image?: string;
  plan: string;
};

export type Facility = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type MembershipPlan = {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
};
