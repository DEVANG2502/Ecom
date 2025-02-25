import React, { useRef } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag, Heart } from "lucide-react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  colors: string;
  price: number;
  image: string;
} 


const products: Product[] = [
  { id: 1, name: "Nike Dunk Low", colors: "1 Colour", price: 109.95, image: "/images/shoe/shoe.jpg" },
  { id: 2, name: "Air Jordan 1 Low", colors: "1 Colour", price: 69.95, image: "/images/shoe/shoe2.jpg" },
  { id: 3, name: "Nike Air Max Plus 3", colors: "1 Colour", price: 184.95, image: "/images/shoe/shoe3.jpg" },
  { id: 4, name: "Nike SB Dunk", colors: "2 Colours", price: 129.95, image: "/images/shoe/bg1.jpg" },
  { id: 1, name: "Nike Dunk Low", colors: "1 Colour", price: 109.95, image: "/images/shoe/shoe.jpg" },
  { id: 2, name: "Air Jordan 1 Low", colors: "1 Colour", price: 69.95, image: "/images/shoe/shoe2.jpg" },
  { id: 3, name: "Nike Air Max Plus 3", colors: "1 Colour", price: 184.95, image: "/images/shoe/shoe3.jpg" },
  { id: 4, name: "Nike SB Dunk", colors: "2 Colours", price: 129.95, image: "/images/shoe/bg1.jpg" },
];

const Products = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };


  //Add to cart function
  const addToCart = async (product) => {
    try {
      const userId = "65b5e5a3d2c4b77b9f0e0d3a"; // Replace with actual logged-in user ID
      const payload = {
        userId,
        productId: product._id, // ✅ Ensure _id is used
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      };
  
      console.log("Sending data:", payload); // ✅ Debugging
  
      const res = await axios.post("http://localhost:5000/api/cart/add", payload);
      
      alert("Product added to cart successfully!"); // ✅ Show success message
  
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      alert("Failed to add product to cart.");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Popular Products</h1>
          <div className="flex gap-4">
            <button
              onClick={scrollLeft}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-4"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 rounded-3xl p-6 w-72 flex-shrink-0 transition-transform hover:scale-105 shadow-lg relative"
              >
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all">
                  <Heart className="w-6 h-6" />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-500 mb-2">{product.colors}</p>
                <p className="text-[#F97316] font-semibold">£{product.price.toFixed(2)}</p>

                <button onClick={() => addToCart(product)}
           
              className="mt-4 flex items-center justify-center gap-2 bg-[#F97316] text-white py-2 px-4 rounded-full w-full hover:bg-[#e46306] transition-all shadow-md"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
              </div>
            ))}
          </div>
        </div>

        {/* Find Perfect Shoes Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <h2 className="text-5xl font-bold mb-6">
              Find the Perfect Shoes <span className="text-[#FFB800]">98%</span> Essentials.
            </h2>
            <p className="text-gray-600 mb-8">
              Your ultimate destination for timeless, versatile, and high-quality
              pieces that elevate your style.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full text-lg font-bold">
                  +
                </div>
                <div>
                  <h4 className="font-semibold">Care Instructions</h4>
                  <p className="text-gray-500 text-sm">Machine wash at 30°C</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full text-lg font-bold">
                  +
                </div>
                <div>
                  <h4 className="font-semibold">Fabric Material</h4>
                  <p className="text-gray-500 text-sm">84% Cotton, 16% Polyester</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#1c1a19] rounded-xl w-full aspect-square"></div>
            <img
              src="/images/shoe/nb.jpg"
              alt="Shoes"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
