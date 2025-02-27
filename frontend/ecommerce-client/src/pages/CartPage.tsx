import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dummyUserId = "67beb3a1f853270d165d6f87"; // Replace with the actual user ID

  // Fetch cart items when the component loads
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${dummyUserId}`);
        setCartItems(res.data.items);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Update cart state after adding an item to the cart
  const addToCart = async (productId: string, name: string, image: string, price: number, quantity: number) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId: dummyUserId,
        productId,
        name,
        image,
        price,
        quantity,
      });

      // Directly update the state after adding the item to the cart
      setCartItems(prevItems => [
        ...prevItems,
        { productId, name, image, price, quantity }
      ]);
    } catch (err) {
      console.error("Error adding item to cart:", err);
      setError("Failed to add item to cart.");
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${cartItemId}`);

      // Remove the item from state directly after deleting
      setCartItems(prevItems => prevItems.filter(item => item._id !== cartItemId));
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item.");
    }
  };

  // Increase item quantity
  const increaseQuantity = async (cartItemId: string) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/increase/${cartItemId}`);

      // Update quantity in state without fetching the whole cart again
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (err) {
      console.error("Error increasing quantity:", err);
      setError("Failed to increase quantity.");
    }
  };

  // Decrease item quantity
  const decreaseQuantity = async (cartItemId: string) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/decrease/${cartItemId}`);

      // Update quantity in state without fetching the whole cart again
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } catch (err) {
      console.error("Error decreasing quantity:", err);
      setError("Failed to decrease quantity.");
    }
  };

  // Checkout - Navigate to Payment Page
  const checkout = () => {
    navigate("/paymentt");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        
        {loading ? (
          <p>Loading cart...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item: any) => (
              <div key={item._id} className="flex justify-between items-center py-4 border-b">
                <div className="flex items-center">
                <img
  src={`http://localhost:5000/images${item.image}`}
  alt={item.name}
  className="w-24 h-24 object-cover mr-4"
/>

                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-500">£{item.price.toFixed(2)}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        className="bg-green-500 text-white py-1 px-4 rounded-full hover:bg-green-400"
                        onClick={() => increaseQuantity(item._id)}
                      >
                        Increase
                      </button>
                      <button
                        className="bg-yellow-500 text-white py-1 px-4 rounded-full hover:bg-yellow-400"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        Decrease
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-4 rounded-full hover:bg-red-400"
                        onClick={() => removeItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <h2 className="text-2xl font-semibold">
                Total Price: £{totalPrice.toFixed(2)}
              </h2>
              <button className="bg-[#F97316] text-white py-2 px-4 rounded-full hover:bg-[#e46306]" onClick={checkout}>
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
