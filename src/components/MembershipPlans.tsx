import { motion } from 'framer-motion';
import { useMembershipStore } from '../store/membershipStore';
import { membershipPlans } from '../data/mockData';
import { FaCheck } from 'react-icons/fa';

const MembershipPlans = () => {
  const { billingCycle, setBillingCycle, setSelectedPlan } =
    useMembershipStore();

  const handleJoinNow = (plan: typeof membershipPlans[0]) => {
    setSelectedPlan(plan);
    // Payment modal will open automatically when selectedPlan is set
  };

  return (
    <section id="plans" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Membership Plans
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your fitness journey
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span
              className={`${
                billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'
              } font-medium`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')
              }
              className="relative w-16 h-8 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-red-600 rounded-full"
                animate={{
                  x: billingCycle === 'yearly' ? 32 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`${
                billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'
              } font-medium`}
            >
              Yearly
              <span className="ml-2 text-sm text-green-400">(Save 17%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipPlans.map((plan, index) => {
            // const price =
            //   billingCycle === 'monthly' ? plan.price : plan.yearlyPrice;
            const displayPrice =
              billingCycle === 'monthly'
                ? `${plan.price}₹/mo`
                : `${plan.yearlyPrice}₹/yr`;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative bg-gray-800 rounded-lg p-8 shadow-xl ${
                  plan.popular
                    ? 'border-2 border-red-600 transform scale-105'
                    : 'border border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{displayPrice}</span>
                    {billingCycle === 'yearly' && (
                      <span className="text-gray-400 ml-2 line-through">
                        ${plan.price * 12}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <FaCheck className="text-red-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => handleJoinNow(plan)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
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
};

export default MembershipPlans;

