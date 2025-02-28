import Order from "../models/orderModel.js";
import Cart from "../models/Cart.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { userId, paymentMethod, paymentStatus, totalAmount } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(400).json({ message: "No items in your cart" });
    }
    console.log(cart);
    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const { items } = cart;

    const newOrder = new Order({
      userId,
      cartItems: items,
      totalAmount: totalPrice,
      paymentMethod,
      paymentStatus, // "Paid" or "Pending" (for COD)
      orderStatus: "Processing",
    });

    await newOrder.save();

    await cart.deleteOne({ userId: userId });

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
