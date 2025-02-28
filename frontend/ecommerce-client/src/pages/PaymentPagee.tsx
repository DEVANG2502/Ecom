import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";

// ✅ Hardcoded Stripe Public Key (Replace with your actual key)
const stripePromise = loadStripe("pk_test_51QwzlcH6C6Q7aJUgD7B6dugTd3PWDEbVWKMho2bWCJn3OSipUfLR8INaZw2UCCWCYUhl4b3CnckgfuAVWxK9IRPK00BMBeoAoW");

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("http://localhost:5000/api/payment/payment-intent", {
          amount: 5000, // Example amount in cents ($50.00)
          currency: "usd",
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError("Failed to create payment intent.");
        console.error("Payment Intent Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (paymentMethod === "card") fetchPaymentIntent();
  }, [paymentMethod]);

  const handleCODPayment = async () => {
    try {
      setLoading(true);
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

      const response = await axios.post("http://localhost:5000/api/orders", {
        userId: "67beb3a1f853270d165d6f87",
          paymentMethod: "Card",
          paymentStatus: "Paid",
      });

      if (response.status === 201) {
        localStorage.removeItem("cartItems");
        setSuccess(true);
        alert('sucessfully order placed by COD') 
        navigate("/orders");
      } else {
        setError(response.data.error || "Failed to place COD order.");
      }
    } catch (error) {
      setError("Failed to place COD order.");
      console.error("Error placing COD order:", error);
    } finally {
      setLoading(false);
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

      {loading && <p className="text-gray-500">Processing...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Payment Success! <span className="text-xl">&#10004;</span></p>}

      {paymentMethod === "card" && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CardPaymentForm clientSecret={clientSecret} setSuccess={setSuccess} />
        </Elements>
      )}

      {paymentMethod === "upi" && (
        <UPIPaymentForm />
      )}

      {paymentMethod === "cod" && (
        <button
          onClick={handleCODPayment}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm COD Order"}
        </button>
      )}
    </div>
  );
};

const CardPaymentForm = ({ clientSecret, setSuccess }: { clientSecret: string, setSuccess: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { totalPrice, cartItems } = useCart();
  const navigate = useNavigate();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });
      console.log("paymen sucess", result)
      if (result.error) {
        setError(result.error.message || "Payment failed.");
      } else {
        console.log("paymen done")
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        console.log("cartItems", totalPrice)
        const orderResponse = await axios.post("http://localhost:5000/api/orders", {
          userId: "67beb3a1f853270d165d6f87",
          totalAmount: totalPrice,
          paymentMethod: "Card",
          paymentStatus: "Paid",
        });

        console.log("fetching order", orderResponse.status)
        if (orderResponse.status === 201) {
          localStorage.removeItem("cartItems");
          setSuccess(true);
          navigate("/orders");
          alert('sucess')
        } else {
          setError(orderResponse.data.error || "Failed to place order.");
        }
       
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

const UPIPaymentForm = () => {
  return (
    <div>
      <p>UPI Payment is currently under development.</p>
    </div>
  );
};

export default PaymentPage;
