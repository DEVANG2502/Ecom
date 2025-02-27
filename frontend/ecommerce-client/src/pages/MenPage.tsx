import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shoes } from "@/data/shoes";
import ProductCard from "@/components/shared/ProductCard";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import HeroBanner from "@/components/shared/HeroBanner";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
const MenPage = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  // Filter men's shoes
  const menShoes = Shoes.filter(
    (shoe) => shoe.category === "men" || shoe.category === "unisex"
  );
  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar />
      <HeroBanner
        title="Men's Collection"
        subtitle="Discover our lineup of performance sneakers engineered for style and comfort"
        image="https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Collection Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Men's Sneakers</h1>
          <p className="text-gray-600 mt-2">
            Discover performance-driven designs for every stride.
          </p>
        </div>
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white px-4 py-2 pr-8 rounded-md shadow-sm hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
        {/* Expandable Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white rounded-lg shadow-sm p-4 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Size Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[7, 8, 9, 10, 11, 12, 13].map((size) => (
                    <button
                      key={size}
                      className="border border-gray-300 rounded-md py-1 hover:border-black transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Color Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {["Black", "White", "Gray", "Blue", "Red"].map((color) => (
                    <button
                      key={color}
                      className="border border-gray-300 rounded-md px-3 py-1 hover:border-black transition-colors"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-black mr-2" />
                    <span>Under $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-black mr-2" />
                    <span>$100 - $150</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-black mr-2" />
                    <span>$150 - $200</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-black mr-2" />
                    <span>Over $200</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menShoes.map((shoe) => (
            <ProductCard key={shoe.id} product={shoe} />
          ))}
        </div>
        {/* Subscribe Section */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Never Miss a Drop
          </h2>
          <p className="text-gray-600 mb-6">
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-2 rounded-l-md border-y border-l border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default MenPage;