// // src/context/CartContext.tsx
// import React, { createContext, useContext, useState } from 'react';

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addItemToCart: (item: CartItem) => void;
//   removeItemFromCart: (id: string) => void;
//   increaseQuantity: (id: string) => void;
//   decreaseQuantity: (id: string) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export const CartProvider: React.FC = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const addItemToCart = (item: CartItem) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i._id === item._id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prevItems, { ...item, quantity: 1 }];
//     });
//   };

//   const removeItemFromCart = (id: string) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
//   };

//   const increaseQuantity = (id: string) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item._id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (id: string) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item._id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addItemToCart,
//         removeItemFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);

    console.log("Cart Items Updated:", cartItems);
    console.log("Total Price Updated:", total);
  }, [cartItems]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItemFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
