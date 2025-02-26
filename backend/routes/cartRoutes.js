import express from "express";
import { addToCart, getCartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "../controllers/cartController.js"; 

const router = express.Router();

// Add product to cart
router.post("/add", addToCart);

// Get all items in the user's cart
router.get("/:userId", getCartItems);

// Remove item from cart
router.delete("/remove/:cartItemId", removeFromCart);

// Clear all items from the cart
router.delete("/clear/:userId", clearCart);

// Increase item quantity
router.put("/increase/:cartItemId", increaseQuantity);

// Decrease item quantity
router.put("/decrease/:cartItemId", decreaseQuantity);

export default router;
