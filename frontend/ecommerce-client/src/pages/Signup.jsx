import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Signup Successful!");
      navigate("/");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="/images/ogbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left Side Video */}
      <div className="hidden md:flex w-[45%] h-full items-center justify-start pl-10">
        <video autoPlay loop muted className="w-[95%] h-[95%] object-cover rounded-lg shadow-xl">
          <source src="/images/bg3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Signup Form */}
      <motion.div
        className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl w-[500px] text-center relative overflow-hidden backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating Brand Name */}
        <motion.h1 
          className="text-4xl font-extrabold text-gray-900 mb-6 tracking-wide" 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Shoe Factory
          <motion.img
            src="/images/logo.jpg"
            alt="Nike Logo"
            className="w-24 mx-auto mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.h1>
        
        <motion.h2 
          className="text-2xl font-semibold text-gray-900 mb-6 tracking-wide" 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Sign Up
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          />
          <motion.button
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white p-4 rounded-lg text-lg font-bold transition transform hover:scale-105 shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </motion.button>
        </form>
        
        <motion.p 
          className="text-center text-md mt-6 text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Already have an account? <span className="text-blue-500 cursor-pointer font-semibold" onClick={() => navigate("/login")}>Login</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;
