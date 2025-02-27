import Order from "../models/orderModel.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { userId, cartItems, totalAmount, paymentMethod, paymentStatus } = req.body;

    if (!userId || !cartItems || cartItems.length === 0 || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      userId,
      cartItems,
      totalAmount,
      paymentMethod,
      paymentStatus, // "Paid" or "Pending" (for COD)
      orderStatus: "Processing",
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Order placement failed", error: error.message });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};
