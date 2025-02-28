import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route to create payment intent
router.post("/payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Amount and currency are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route for COD orders
router.post("/cod-order", async (req, res) => {
  try {
    const { paymentMethod, status, items } = req.body;
    
    if (paymentMethod === "COD") {
      // Save the COD order to the database
      const order = {
        paymentMethod,
        status,
        items,
      };

      // Simulate order placement
      res.status(200).json({ message: "COD order placed successfully", order });
    } else {
      res.status(400).json({ error: "Invalid payment method" });
    }
  } catch (error) {
    console.error("Error placing COD order:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
