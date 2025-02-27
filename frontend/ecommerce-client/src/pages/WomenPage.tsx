// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Shoes } from "@/data/shoes";
// import ProductCard from "@/components/shared/ProductCard";
// import NavBar from "@/components/shared/NavBar";
// import Footer from "@/components/shared/Footer";
// import HeroBanner from "@/components/shared/HeroBanner";
// import { ChevronDown, SlidersHorizontal } from "lucide-react";
// const WomenPage = () => {
//   const [sortBy, setSortBy] = useState("featured");
//   const [showFilters, setShowFilters] = useState(false);
//   // Filter women's shoes
//   const womenShoes = Shoes.filter(
//     (shoe) => shoe.category === "women" || shoe.category === "unisex"
//   );
//   return (
//     <div className="min-h-screen bg-neutral-50">
//       <NavBar />
//       <HeroBanner
//         title="Women's Collection"
//         subtitle="Step into comfort and style with our premium women's footwear"
//         image="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80"
//       />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Collection Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Women's Sneakers</h1>
//           <p className="text-gray-600 mt-2">
//             Blend of style, comfort, and performance for the modern woman.
//           </p>
//         </div>
//         {/* Featured Categories */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
//           <div className="relative group overflow-hidden rounded-lg aspect-square">
//             <img
//               src="https://images.unsplash.com/photo-1465453869711-7e174808ace9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1520&q=80"
//               alt="Running"
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//               <span className="text-white font-semibold text-lg">Running</span>
//             </div>
//           </div>
//           <div className="relative group overflow-hidden rounded-lg aspect-square">
//             <img
//               src="https://images.unsplash.com/photo-1584735175315-9d5df23be3c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
//               alt="Training"
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//               <span className="text-white font-semibold text-lg">Training</span>
//             </div>
//           </div>
//           <div className="relative group overflow-hidden rounded-lg aspect-square">
//             <img
//               src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
//               alt="Lifestyle"
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//               <span className="text-white font-semibold text-lg">Lifestyle</span>
//             </div>
//           </div>
//           <div className="relative group overflow-hidden rounded-lg aspect-square">
//             <img
//               src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
//               alt="Hiking"
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//               <span className="text-white font-semibold text-lg">Hiking</span>
//             </div>
//           </div>
//         </div>
//         {/* Filters and Sort */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
//           >
//             <SlidersHorizontal size={20} />
//             <span>Filters</span>
//           </button>
//           <div className="relative">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="appearance-none bg-white px-4 py-2 pr-8 rounded-md shadow-sm hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-black"
//             >
//               <option value="featured">Featured</option>
//               <option value="newest">Newest</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//             </select>
//             <ChevronDown
//               size={16}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
//             />
//           </div>
//         </div>
//         {/* Expandable Filter Panel */}
//         {showFilters && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="bg-white rounded-lg shadow-sm p-4 mb-6 overflow-hidden"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Size Filter */}
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-3">Size</h3>
//                 <div className="grid grid-cols-4 gap-2">
//                   {[5, 6, 7, 8, 9, 10, 11].map((size) => (
//                     <button
//                       key={size}
//                       className="border border-gray-300 rounded-md py-1 hover:border-black transition-colors"
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               {/* Color Filter */}
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-3">Color</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {["Black", "White", "Pink", "Purple", "Blue"].map((color) => (
//                     <button
//                       key={color}
//                       className="border border-gray-300 rounded-md px-3 py-1 hover:border-black transition-colors"
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               {/* Price Filter */}
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-3">Price</h3>
//                 <div className="space-y-2">
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded text-black mr-2" />
//                     <span>Under $100</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded text-black mr-2" />
//                     <span>$100 - $150</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded text-black mr-2" />
//                     <span>$150 - $200</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" className="rounded text-black mr-2" />
//                     <span>Over $200</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {womenShoes.map((shoe) => (
//             <ProductCard key={shoe.id} product={shoe} />
//           ))}
//         </div>
//         {/* Featured Collection */}
//         <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 md:p-12">
//           <div className="md:flex items-center justify-between">
//             <div className="md:w-1/2 mb-8 md:mb-0">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                 Performance Meets Fashion
//               </h2>
//               <p className="text-gray-700 mb-6">
//                 Our new collection combines cutting-edge technology with trendsetting designs.
//                 Perfect for your workout or a day in the city.
//               </p>
//               <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
//                 Explore Collection
//               </button>
//             </div>
//             <div className="md:w-1/2">
//               <img
//                 src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
//                 alt="Women's Collection"
//                 className="rounded-md h-64 md:h-80 w-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };
// export default WomenPage;
