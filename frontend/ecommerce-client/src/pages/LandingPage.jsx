import { motion } from "framer-motion";
import Navbar from "./Navbar";

import NewArrivals from "./NewArrivals";
import Products from "./Products";
const LandingPage = () => {

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="relative min-h-[80vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-50 opacity-50" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Express
                  <br />
                  Yourself
                  <br />
                  Through
                  <motion.span
                    className="text-yellow-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {" "}Style.
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 text-lg max-w-md"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors"
                >
                  Shop Now
                </motion.button>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative"
              >
                <motion.img
                  src="/images/nike1.jpg"
                  alt="Yellow Nike Sneaker"
                  className="w-full h-auto object-contain"
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.div
                  className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity
                  }}
                >
                  <motion.div
                    className="w-16 h-16 bg-orange-500 rounded-full"
                    animate={{
                      scale: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
      <div>
      <>
            <Products />
            <NewArrivals />
            <Navbar/>
          </>
      </div>
    </div>
    
     
  );
};

export default LandingPage;
