import Cart from "../models/Cart.js"; // Import the Cart model

// Add item to cart
export const addToCart = async (req, res) => {
  const { userId, productId, name, image, price, quantity } = req.body;

  try {
    // Find the user's cart, or create one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      // If the product exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // Otherwise, add the new product to the cart
      cart.items.push({ productId, name, image, price, quantity });
    }

    // Save the updated cart
    await cart.save();

    return res.status(201).json({ message: "Product added to cart successfully!" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Failed to add product to cart." });
  }
};

// Get all items in the user's cart
export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Failed to fetch cart items." });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { "items._id": cartItemId },
      { $pull: { items: { _id: cartItemId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    return res.status(200).json({ message: "Item removed from cart." });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Failed to remove item from cart." });
  }
};

// Clear all items from the cart
export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    return res.status(200).json({ message: "Cart cleared." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.status(500).json({ message: "Failed to clear the cart." });
  }
};
