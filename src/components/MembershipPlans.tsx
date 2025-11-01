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
    <section id="plans" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-gradient">
            Membership Plans
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8 font-light">
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
                className={`relative glass-dark rounded-2xl p-8 shadow-2xl transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-transparent bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 transform scale-105 shadow-purple-500/20'
                    : 'border border-white/10'
                } hover:scale-105 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold text-gradient">{displayPrice}</span>
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
                      <FaCheck className="text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => handleJoinNow(plan)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 text-white'
                      : 'glass border border-white/20 hover:bg-white/10 text-white'
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

