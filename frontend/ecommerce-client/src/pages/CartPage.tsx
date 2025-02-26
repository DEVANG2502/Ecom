import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Replace 'yourUserId' with the actual user ID
        const res = await axios.get("http://localhost:5000/api/cart/yourUserId", {
          withCredentials: true,
        });
        setCartItems(res.data.items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
        withCredentials: true,
      });
      setCartItems(cartItems.filter((item) => item._id !== itemId)); // Remove item from state
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Redirect to checkout page (replace with your actual checkout route)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">Your Cart</h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading cart...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty!</div>
        ) : (
          <div>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white shadow-md rounded-lg p-6"
                >
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:5000/images/${item.image}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold text-[#F97316]">
                      £{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="ml-4 text-red-500 hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="text-xl font-semibold">
                Total: £
                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </div>
              <button
                onClick={handleCheckout}
                className="bg-[#F97316] text-white py-2 px-6 rounded-full hover:bg-[#e46306] transition-all"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
