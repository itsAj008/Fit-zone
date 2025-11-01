import { create } from 'zustand';
import type { MembershipPlan } from '../types';

interface MembershipState {
  selectedPlan: MembershipPlan | null;
  billingCycle: 'monthly' | 'yearly';
  setSelectedPlan: (plan: MembershipPlan | null) => void;
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export const useMembershipStore = create<MembershipState>((set) => ({
  selectedPlan: null,
  billingCycle: 'monthly',
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setBillingCycle: (cycle) => set({ billingCycle: cycle }),
}));

