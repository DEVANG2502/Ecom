import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMethod === "card") {
      axios.post("http://localhost:5000/api/payment-intent", {
        amount: 5000, // Example amount in cents ($50.00)
        currency: "usd",
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((error) => console.error("Payment Intent Error:", error));
    }
  }, [paymentMethod]);

  const handleCODPayment = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders", {
        paymentMethod: "COD",
        status: "Success",
        items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
      });
      localStorage.removeItem("cartItems"); 
      navigate("/success");
    } catch (error) {
      console.error("Error placing COD order:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
      
      <div className="flex gap-4 mb-6">
        {["card", "upi", "cod"].map((method) => (
          <button
            key={method}
            onClick={() => setPaymentMethod(method)}
            className={`px-4 py-2 rounded-lg ${paymentMethod === method ? "bg-[#F97316] text-white" : "bg-gray-200"}`}
          >
            {method.toUpperCase()}
          </button>
        ))}
      </div>

      {paymentMethod === "card" && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CardPaymentForm clientSecret={clientSecret} />
        </Elements>
      )}

      {paymentMethod === "upi" && (
        <div>
          <p>UPI Payment is currently under development.</p>
        </div>
      )}

      {paymentMethod === "cod" && (
        <button
          onClick={handleCODPayment}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Confirm COD Order
        </button>
      )}
    </div>
  );
};

const CardPaymentForm = ({ clientSecret }: { clientSecret: string }) => {
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
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed.");
      } else {
        await axios.post("http://localhost:5000/api/orders", {
          paymentMethod: "card",
          status: "Success",
          items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
        });
        localStorage.removeItem("cartItems");
        navigate("/success");
      }
    } catch (err) {
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="mt-4">
      <CardElement className="p-2 border rounded-lg mb-4" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-[#F97316] text-white py-2 px-4 rounded-lg hover:bg-[#e46306] disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentPage;
