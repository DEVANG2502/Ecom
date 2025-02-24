import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col items-center justify-center text-white">
      {/* Animated Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-center"
      >
        Welcome to <span className="text-yellow-300">E-Shop</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl mt-4 text-center"
      >
        The ultimate destination for the best products & deals.
      </motion.p>

      {/* Call-to-Action Buttons */}
      <motion.div
        className="flex gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:scale-110 transition-all duration-300"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:scale-110 transition-all duration-300"
        >
          Login
        </button>
      </motion.div>

      {/* Product Showcase */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Smartphone", img: "https://source.unsplash.com/300x300/?smartphone" },
          { name: "Headphones", img: "https://source.unsplash.com/300x300/?headphones" },
          { name: "Shoes", img: "https://source.unsplash.com/300x300/?shoes" },
        ].map((product, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="bg-white text-black p-6 rounded-xl shadow-lg text-center"
          >
            <img src={product.img} alt={product.name} className="rounded-lg w-full" />
            <h3 className="text-lg font-bold mt-4">{product.name}</h3>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
