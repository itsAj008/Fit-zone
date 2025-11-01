import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMembershipStore } from '../store/membershipStore';
import { FaCreditCard, FaLock } from 'react-icons/fa';

// Payment integration placeholder
// You can integrate Stripe or Razorpay here
const Payment = () => {
  const { selectedPlan, billingCycle, setSelectedPlan } = useMembershipStore();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedPlan) {
    return null;
  }

  const price =
    billingCycle === 'monthly' ? selectedPlan.price : selectedPlan.yearlyPrice;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // TODO: Integrate with Stripe or Razorpay
    // Example for Stripe:
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     planId: selectedPlan.id,
    //     amount: price,
    //     billingCycle,
    //   }),
    // });
    // const session = await response.json();
    // window.location.href = session.url;

    // For now, simulate payment processing
    setTimeout(() => {
      alert(
        `Payment integration needed!\n\nPlan: ${selectedPlan.name}\nAmount: $${price}\nBilling: ${billingCycle}`
      );
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedPlan(null);
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
          <button
            onClick={() => setSelectedPlan(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Plan</p>
            <p className="font-semibold text-gray-900">{selectedPlan.name}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Billing Cycle</p>
            <p className="font-semibold text-gray-900 capitalize">
              {billingCycle}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-red-600">${price}</p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Payment integration needs to be configured.
            For production, integrate with Stripe or Razorpay.
          </p>
        </div>

        <motion.button
          onClick={handlePayment}
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.02 }}
          whileTap={{ scale: isProcessing ? 1 : 0.98 }}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FaLock />
              <span>Proceed to Payment</span>
            </>
          )}
        </motion.button>

        <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center">
          <FaCreditCard className="mr-2" />
          Secure payment powered by Stripe/Razorpay
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Payment;

