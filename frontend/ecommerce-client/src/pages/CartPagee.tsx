import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MinusIcon, PlusIcon, X, ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
// Product type definition
interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
}
const Cart = () => {
  // State for cart items
  const [cartItems, setCartItems] = useState<Product[]>([
    {
      id: "1",
      name: "SHADOWTECH ECLIPSE SNEAKERS",
      price: 120.53,
      color: "BLACK",
      size: "US 8",
      image: "/lovable-uploads/5fe275a1-87dc-4678-b2e4-94eb8f9fe4de.png",
      quantity: 1,
    },
    {
      id: "2",
      name: "NEONOIR VANGUARD BOOTS",
      price: 210.14,
      color: "BLACK",
      size: "US 8",
      image: "/lovable-uploads/5fe275a1-87dc-4678-b2e4-94eb8f9fe4de.png",
      quantity: 1,
    },
    {
      id: "3",
      name: "CYBERGOTH STEALTH KICKS",
      price: 154.32,
      color: "BLACK",
      size: "US 8",
      image: "/lovable-uploads/5fe275a1-87dc-4678-b2e4-94eb8f9fe4de.png",
      quantity: 1,
    },
  ]);
  // Calculate totals
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  // Update totals when cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newTax = parseFloat((newSubtotal * 0.025).toFixed(2));
    const newTotal = newSubtotal + newTax;
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems]);
  // Handle quantity changes
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      if (updatedItems.length < prev.length) {
        toast.success("Item removed from cart");
      }
      return updatedItems;
    });
  };
  // Move to favorites
  const moveToFavorites = (id: string) => {
    toast.success("Item moved to favorites");
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center p-4 border-b border-gray-200"
      >
        {/* <div className="flex space-x-8">
          <Link to="/" className="font-medium hover:text-gray-600 transition-colors">MEN</Link>
          <Link to="/" className="font-medium hover:text-gray-600 transition-colors">WOMAN</Link>
          <Link to="/" className="font-medium hover:text-gray-600 transition-colors">KIDS</Link>
          <Link to="/" className="font-medium hover:text-gray-600 transition-colors">ACCESSORIES</Link>
        </div> */}
        <div className="text-center">
          <Link to="/" className="font-bold text-xl">NEXSHOES</Link>
        </div>
       
      </motion.header>
      {/* Cart Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-8 border-b border-gray-200"
      >
        <h1 className="text-3xl font-bold tracking-wider">SHOPPING CART</h1>
      </motion.div>
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row">
        {/* Cart Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 md:pr-8"
        >
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                exit="exit"
                layout
                className="mb-8 pb-8 border-b border-gray-200"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Checkbox */}
                  <div className="flex items-start pt-4 pr-4">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-0"
                    />
                  </div>
                  
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-full sm:w-40 h-40 border border-gray-200 overflow-hidden mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 sm:ml-6 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-3">
                      {/* Color selector */}
                      <div className="w-full sm:w-auto">
                        <div className="relative border border-gray-300 rounded">
                          <div className="flex items-center pl-3 pr-8 py-2">
                            <div className="w-5 h-5 bg-black rounded-full mr-2"></div>
                            <span>{item.color}</span>
                          </div>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Size selector */}
                      <div className="w-full sm:w-auto">
                        <div className="relative border border-gray-300 rounded">
                          <div className="flex items-center px-3 py-2">
                            <span>{item.size}</span>
                          </div>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quantity selector */}
                      <div className="w-full sm:w-auto ml-auto">
                        <div className="flex border border-gray-300 rounded h-10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 border-r border-gray-300 flex items-center justify-center"
                          >
                            <MinusIcon size={16} />
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="w-10 text-center focus:outline-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 border-l border-gray-300 flex items-center justify-center"
                          >
                            <PlusIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-end">
                      <button
                        onClick={() => moveToFavorites(item.id)}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors flex items-center"
                      >
                        <Heart size={16} className="mr-1" />
                        MOVE TO FAVORITES
                      </button>
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-medium text-lg"
                      >
                        ${item.price.toFixed(2)}
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {cartItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <Link
                to="/"
                className="mt-4 inline-block px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded"
              >
                Continue Shopping
              </Link>
            </motion.div>
          )}
        </motion.div>
        {/* Order Summary */}
        {cartItems.length > 0 && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="w-full md:w-80 mt-8 md:mt-0"
          >
            <div className="border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">ORDER SUMMARY</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">SUBTOTAL</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">TAX</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200 flex justify-between">
                  <span className="text-gray-600">TOTAL</span>
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="font-bold"
                  >
                    ${total.toFixed(2)}
                  </motion.span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                onClick={() => toast.success("Checkout successful!")}
              >
                CHECKOUT
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      {/* Recommended Products Section */}
      
    </div>
  );
};
export default Cart;