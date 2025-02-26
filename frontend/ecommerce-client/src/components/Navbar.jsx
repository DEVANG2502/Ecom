import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext"; // Ensure this is the correct path for your context
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, setIsCartOpen } = useCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch cart items when the user is logged in
    const fetchCartCount = async () => {
      if (user && user._id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/cart/${user._id}`, {
            withCredentials: true, // Send cookies with the request
          });

          setCartCount(res.data.items.length); // Set the number of items in the cart
        } catch (error) {
          console.error("Error fetching cart count:", error);
          setCartCount(0);
        }
      }
    };

    fetchCartCount();
  }, [user]);

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center">
      <div className="text-lg font-bold">The Shoe Factory</div>

      <div className="flex items-center gap-6">
        {/* Other navbar items */}

        <div
          className="relative cursor-pointer"
          onClick={() => setIsCartOpen(true)} // Open the cart when clicked
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </div>

        {/* Link to Cart page */}
        {user && (
          <Link to="/cart" className="text-sm text-gray-600 hover:text-gray-800">
            Go to Cart
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
