import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { CreditCard, Truck, CreditCardIcon, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";


import { useCart } from "../context/CartContext";


const cardElementOptions = {
  style: {
    base: {
      color: "#333333",
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#6b7280"
      }
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444"
    }
  },
  hidePostalCode: true
};

const PaymentForm: React.FC = () => {
    const { totalPrice } = useCart(); // Get total price from cart context
//   const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [step, setStep] = useState(1);
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true
  });

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Mock API call - in a real app, replace with your backend endpoint
      // const { data } = await axios.post("http://localhost:5000/api/payment", {
      //   amount: 17498, // $174.98 in cents
      //   currency: "usd",
      //   paymentMethodType: paymentMethod,
      //   upiId: paymentMethod === "upi" ? upiId : undefined,
      // });

      // Simulate successful payment
      setTimeout(() => {
        setLoading(false);
        
        if (Math.random() > 0.1) { // 90% success rate for demo
          toast.success("Payment successful! Your order has been placed.", {
            duration: 5000
          });
          setStep(3); // Move to success step
        } else {
          toast.error("Payment failed. Please try again.", {
            duration: 5000
          });
        }
      }, 2000);
      
    } catch (err) {
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  const renderPaymentMethodContent = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Card Holder Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                placeholder="Name on card"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Card Details</label>
              <div className="p-3 border border-neutral-300 rounded-md focus-within:ring-1 focus-within:ring-neutral-900 focus-within:border-neutral-900">
                <CardElement options={cardElementOptions} />
              </div>
            </div>
            
            <div className="flex items-center mt-6 mb-2">
              <input
                type="checkbox"
                id="sameAsShipping"
                checked={billingAddress.sameAsShipping}
                onChange={() => setBillingAddress({
                  ...billingAddress,
                  sameAsShipping: !billingAddress.sameAsShipping
                })}
                className="h-4 w-4 text-neutral-900 focus:ring-neutral-500 border-neutral-300 rounded"
              />
              <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-neutral-700">
                Billing address same as shipping address
              </label>
            </div>
          </motion.div>
        );
      
      case "cod":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-neutral-50 rounded-md mb-4"
          >
            <p className="text-neutral-600">
              Pay with cash upon delivery. Our delivery person will collect the payment when your order arrives.
            </p>
          </motion.div>
        );
        
      case "upi":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">UPI ID</label>
              <input
                type="text"
                placeholder="username@bank"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              <p className="text-sm text-neutral-500 mt-1">
                Enter your UPI ID in the format username@bank
              </p>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Payment method selection
        return (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`px-4 py-3 rounded-md text-center border transition-all duration-200 flex flex-col items-center justify-center ${
                  paymentMethod === "card"
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-sm font-medium">Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`px-4 py-3 rounded-md text-center border transition-all duration-200 flex flex-col items-center justify-center ${
                  paymentMethod === "upi"
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <CreditCardIcon className="h-5 w-5 mb-1" />
                <span className="text-sm font-medium">UPI</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`px-4 py-3 rounded-md text-center border transition-all duration-200 flex flex-col items-center justify-center ${
                  paymentMethod === "cod"
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <Truck className="h-5 w-5 mb-1" />
                <span className="text-sm font-medium">COD</span>
              </button>
            </div> 
            
            <AnimatePresence mode="wait">
              {renderPaymentMethodContent()}
            </AnimatePresence>
            
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 bg-neutral-900 text-white py-3 rounded-md font-medium hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
              onClick={() => setStep(2)}
            >
              Continue
            </motion.button>
          </div>
        );
        
      case 2: // Review and pay
        return (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-medium text-neutral-900 mb-3">Payment Summary</h3>
              <div className="bg-neutral-50 border border-neutral-200 rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Payment Method</span>
                  <span className="text-neutral-900 font-medium capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Total Amount</span>
                  <span className="text-neutral-900 font-medium">{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 border border-neutral-300 rounded-md font-medium text-neutral-700 hover:bg-neutral-50 transition-colors focus:outline-none"
                onClick={() => setStep(1)}
              >
                Back
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-neutral-900 text-white py-3 rounded-md font-medium hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                 `Pay $${totalPrice.toFixed(2)}`
                )}
              </motion.button>
            </div>
          </div>
        );
        
      case 3: // Success
        return (
          <div className="p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </motion.div>
            
            <h3 className="text-xl font-medium text-neutral-900 mb-2">Payment Successful!</h3>
            <p className="text-neutral-600 mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            
            <div className="bg-neutral-50 border border-neutral-200 rounded-md p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-600">Order Number</span>
                <span className="text-neutral-900 font-medium">#ORD-38291</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Estimated Delivery</span>
                <span className="text-neutral-900 font-medium">March 11-25, 2025</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 border border-neutral-300 rounded-md font-medium text-neutral-700 hover:bg-neutral-50 transition-colors focus:outline-none"
                onClick={() => window.location.href = "/"}
              >
                Continue Shopping
              </motion.button>
{/*               
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-neutral-900 text-white py-3 rounded-md font-medium hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                onClick={() => window.location.href = "/orders"}
              >
                View Order
              </motion.button> */}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Progress indicator
  const renderProgressBar = () => {
    return (
      <div className="border-b border-neutral-200 px-6 py-4 hidden sm:block">
        <div className="relative">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-neutral-200">
            <div 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-neutral-900 transition-all duration-500 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <div className={`text-xs ${step >= 1 ? 'text-neutral-900' : 'text-neutral-400'}`}>Payment Method</div>
            <div className={`text-xs ${step >= 2 ? 'text-neutral-900' : 'text-neutral-400'}`}>Review</div>
            <div className={`text-xs ${step >= 3 ? 'text-neutral-900' : 'text-neutral-400'}`}>Confirmation</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderProgressBar()}
      {renderStepContent()}
    </>
  );
};

export default PaymentForm;