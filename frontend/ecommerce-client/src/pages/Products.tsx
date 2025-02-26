import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag, Heart } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  colors: string;
  price: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Dummy user for testing (must be a valid MongoDB ObjectId format)
  const dummyUser = {
    _id: "67beb3a1f853270d165d6f87",
    email: "kartik@gmail.com",
    name: "Kartik Aryan",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          throw new Error("Invalid product format received");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  // Add to cart functionality
  const addToCart = async (product: Product) => {
    const payload = {
      userId: dummyUser._id,
      productId: product._id,
      name: product.name,
      image: `http://localhost:5000${product.image}`,
      price: product.price,
      quantity: 1,
    };

    try {
      console.log("🛒 Sending data to backend:", payload);
      const res = await axios.post("http://localhost:5000/api/cart/add", payload, {
        withCredentials: true,
      });

      if (res.status === 200 || res.status === 201) {
        alert("✅ Product added to cart successfully!");
        // Redirect to the Cart page after adding the product
        navigate("/cart");
      } else {
        alert("❌ Failed to add product to cart.");
      }
    } catch (error: any) {
      console.error("❌ Error adding to cart:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add product to cart.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Popular Products</h1>
          <div className="flex gap-4">
            <button onClick={scrollLeft} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button onClick={scrollRight} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : products.length > 0 ? (
            <div ref={carouselRef} className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-4">
              {products.map((product) => (
                <div key={product._id} className="bg-gray-50 rounded-3xl p-6 w-72 flex-shrink-0 transition-transform hover:scale-105 shadow-lg relative">
                  <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all">
                    <Heart className="w-6 h-6" />
                  </button>

                  <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-48 object-contain mb-4" />

                  <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-500 mb-2">{product.colors}</p>
                  <p className="text-[#F97316] font-semibold">£{product.price.toFixed(2)}</p>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 flex items-center justify-center gap-2 bg-[#F97316] text-white py-2 px-4 rounded-full w-full hover:bg-[#e46306] transition-all shadow-md"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
