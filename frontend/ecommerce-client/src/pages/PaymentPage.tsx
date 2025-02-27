import React from "react";
import { useState,useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { motion } from "framer-motion";

import { useCart } from "../context/CartContext";

// Replace with your actual Stripe public key
const stripePromise = loadStripe("pk_test_51LvwKGLkpqQPw0uRHxz7jYPaL5Z4D7fDFfvSQemgjZhV5jJI5KOFZOdAjqjpfZ13Xrl7KnGGi5RjqOL2MM8HDNZQ00I9mNosjI");

const PaymentPage: React.FC = () => {
  const { totalPrice, cartItems } = useCart();

  useEffect(() => {
    console.log("🔥 Payment Page Loaded!");
    console.log("🛒 Cart Items in Payment Page:", cartItems);
    console.log("💰 Total Price in Payment Page:", totalPrice);
  }, [totalPrice, cartItems]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-neutral-200 rounded-lg overflow-hidden"
    >
      <div className="border-b border-neutral-200 p-6">
        <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Secure Checkout</span>
        <h2 className="text-xl font-medium mt-1 text-neutral-900">Payment Method</h2>
      </div>
      
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
      
      <div className="p-6 bg-neutral-50 border-t border-neutral-200">
        <div className="flex items-center justify-center space-x-4">
          <img src="https://cdn-icons-png.flaticon.com/512/179/179431.png" alt="Visa" className="h-8 opacity-60" />
          <img src="https://cdn-icons-png.flaticon.com/512/179/179457.png" alt="Mastercard" className="h-8 opacity-60" />
          <img src="https://cdn-icons-png.flaticon.com/512/179/179436.png" alt="American Express" className="h-8 opacity-60" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8 opacity-60" />
        </div>
        <p className="text-center text-neutral-500 text-sm mt-4">
          All transactions are secure and encrypted. By proceeding, you agree to our Terms of Service and Privacy Policy.
        </p>
        <h1>Payment Page</h1>
        <p>Total Amount: £{totalPrice.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
