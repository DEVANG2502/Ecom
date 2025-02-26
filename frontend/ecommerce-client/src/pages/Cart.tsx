import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = "your-user-id"; // Replace with actual logged-in user ID

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCartItems(response.data);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Remove item from cart
  const handleRemove = async (cartItemId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${cartItemId}`);
      setCartItems(cartItems.filter((item) => item._id !== cartItemId));
    } catch (err) {
      setError("Failed to remove item.");
    }
  };

  // Clear entire cart
  const handleClearCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/clear/${userId}`);
      setCartItems([]);
    } catch (err) {
      setError("Failed to clear cart.");
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center bg-white p-4 shadow rounded-lg">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price} x {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
