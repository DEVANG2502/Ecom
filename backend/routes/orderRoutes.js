import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { paymentMethod, status, items } = req.body;
    const order = new Order({ paymentMethod, status, items });
    await order.save();
    res.json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error placing order." });
  }
});

export default router;
