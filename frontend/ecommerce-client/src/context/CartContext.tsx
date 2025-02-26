// src/context/CartContext.tsx

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Define types for user and context
interface User {
  _id: string;
  email: string;
  // Add other user fields as needed
}

interface CartContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Export useCart hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component to provide context value
export const CartProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the user data on app load, for example, checking session or JWT token
    const checkUserSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        console.log("User not logged in", error);
      }
    };

    checkUserSession();
  }, []);

  return (
    <CartContext.Provider value={{ user, setUser, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};
