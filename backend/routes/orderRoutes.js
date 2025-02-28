import express from "express";
import Order from "../models/orderModel.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);

router.get("/", async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

export default router;
