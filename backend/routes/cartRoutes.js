import express from "express";
import { addToCart, getCartItems, removeFromCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCartItems);
router.delete("/remove/:cartItemId", removeFromCart);
router.delete("/clear/:userId", clearCart);

export default router; // ✅ Proper ES Module export
