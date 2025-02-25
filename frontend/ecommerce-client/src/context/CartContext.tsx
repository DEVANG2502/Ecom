// import express from "express";
// import Cart from "../models/Cart.js"; // Import Cart Model

// const router = express.Router();

// // Add product to cart
// router.post("/add", async (req, res) => {
//   try {
//     const { userId, productId, name, image, price, quantity } = req.body;

//     if (!userId || !productId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, products: [] });
//     }

//     const existingProduct = cart.products.find((p) => p.productId === productId);

//     if (existingProduct) {
//       existingProduct.quantity += quantity;
//     } else {
//       cart.products.push({ productId, name, image, price, quantity });
//     }

//     await cart.save();
//     res.status(201).json({ message: "Product added to cart", cart });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Fix: Add this export at the end
// export default router;
