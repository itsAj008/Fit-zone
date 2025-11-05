import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { useMembershipStore } from '../store/membershipStore';
import { FaCheck } from 'react-icons/fa';
import { useMembershipPlans } from "../hooks/useContentfulQuery";
import { membershipPlans as mockPlans } from '../data/mockData';

const MembershipPlans = memo(() => {
  const { billingCycle, setBillingCycle, setSelectedPlan } = useMembershipStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Use React Query hook to fetch membership plans when component mounts
  const { data: cmsData } = useMembershipPlans();

  // Use CMS data with fallback to mock data
  const membershipPlans = cmsData && cmsData.length > 0 ? cmsData : mockPlans;

  const handleJoinNow = (plan: any) => {
    setSelectedPlan({
      id: plan.id || plan.name?.toLowerCase() || 'unknown',
      name: plan.name || 'Unknown Plan',
      price: plan.price || 0,
      yearlyPrice: plan.yearlyPrice || 0,
      features: plan.features || [],
      popular: plan.popular || false
    });
    // Payment modal will open automatically when selectedPlan is set
  };

  return (
    <section id="plans" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Membership Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-normal">
            Choose the plan that fits your fitness journey
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mt-8 mb-12">
            <span
              className={`${
                billingCycle === 'monthly' 
                  ? 'text-gray-900 dark:text-white font-semibold' 
                  : 'text-gray-500 dark:text-gray-400'
              } font-medium transition-colors`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')
              }
              className="relative w-16 h-8 bg-gray-200 dark:bg-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition-colors"
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full shadow-md"
                animate={{
                  x: billingCycle === 'yearly' ? 32 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`${
                billingCycle === 'yearly' 
                  ? 'text-gray-900 dark:text-white font-semibold' 
                  : 'text-gray-500 dark:text-gray-400'
              } font-medium transition-colors`}
            >
              Yearly
              <span className="ml-2 text-sm text-green-600 font-medium">(Save 17%)</span>
            </span>
          </div>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map((plan, index) => {
            const displayPrice =
              billingCycle === 'monthly'
                ? `₹${plan?.price || 0}/mo`
                : `₹${plan?.yearlyPrice || 0}/yr`;

            return (
              <motion.div
                key={plan.id || plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-2 transition-all duration-300 ${
                  plan.popular
                    ? 'border-blue-600 dark:border-blue-400 shadow-xl scale-105'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-400 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{plan?.name || 'Unknown Plan'}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{displayPrice}</span>
                    {billingCycle === 'yearly' && (
                      <span className="text-gray-400 dark:text-gray-500 ml-2 line-through text-lg">
                        ₹{(plan?.price || 0) * 12}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {(plan?.features || []).map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05, duration: 0.3 }}
                      className="flex items-start"
                    >
                      <FaCheck className="text-green-500 dark:text-green-400 mr-3 mt-1 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => handleJoinNow(plan)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  Join Now
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

MembershipPlans.displayName = 'MembershipPlans';

export default MembershipPlans;
