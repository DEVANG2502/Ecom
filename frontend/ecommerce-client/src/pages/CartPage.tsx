import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = "65b5e5a3d2c4b77b9f0e0d3a"; // Replace with actual logged-in user ID
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(res.data.cart.products);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.productId} className="border p-2 m-2">
            <img src={item.image} alt={item.name} className="w-20 h-20" />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
