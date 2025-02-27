import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardPayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    try {
      const { data } = await axios.post("http://localhost:5000/api/payment", {
        amount: 5000,
        currency: "usd",
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed.");
      } else {
        navigate("/success");
      }
    } catch (err) {
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="p-4 bg-gray-100 rounded-lg mt-4">
      <CardElement className="p-2 border rounded-lg" />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mt-4 w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CardPayment;
