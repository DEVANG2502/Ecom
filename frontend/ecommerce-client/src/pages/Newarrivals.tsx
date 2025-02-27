import React from "react";
import { useState } from "react";
interface Product {
  id: number;
  name: string;
  colors: string;
  price: number;
  image: string;
}
const newArrivals: Product[] = [
  {
    id: 1,
    name: "Jordan 1 Mid Kids",
    colors: "1 Colour",
    price: 64.95,
    image: "/images/AJ/aj1.jpg",
  },
  {
    id: 2,
    name: "Nike Dunk Low Retro",
    colors: "1 Colour",
    price: 109.95,
    image: "/images/AJ/aj2.jpg",
  },
  {
    id: 3,
    name: "Jordan 1 Mid SE Kids",
    colors: "1 Colour",
    price: 64.95,
    image: "/images/AJ/aj3.jpg",
  },
  {
    id: 4,
    name: "Nike Air Max 1 SC",
    colors: "1 Colour",
    price: 89.95,
    image: "/images/AJ/aj4.jpg",
  },
  {
    id: 5,
    name: "Nike Air Max",
    colors: "1 Colour",
    price: 139.95,
    image: "/images/AJ/aj5.jpg",
  },
  {
    id: 6,
    name: "Nike InfinityRN 4",
    colors: "7 Colours",
    price: 109.95,
    image: "/images/AJ/aj6.jpg",
  },
  {
    id: 7,
    name: "Sabrina 1 'Ionic'",
    colors: "1 Colour",
    price: 119.95,
    image: "/images/AJ/aj7.jpg",
  },
  {
    id: 8,
    name: "Nike Dunk Low",
    colors: "1 Colour",
    price: 109.95,
    image: "/images/AJ/aj8.jpg",
  },
  {
    id: 9,
    name: "Nike Metcon 9 AMP",
    colors: "1 Colour",
    price: 139.95,
    image: "/images/AJ/aj9.jpg",
  },
];


const NewArrivals = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">Step into Style</h1>
          <p className="text-6xl font-bold text-[#F97316]">with New Arrivals!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="bg-gray-50 rounded-3xl p-6 transition-transform duration-300 group-hover:scale-105">
                <div className="relative aspect-square mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-3xl">
                      <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        Quick Add
                      </button>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-500 mb-2">{product.colors}</p>
                <p className="text-[#F97316] font-semibold">
                  £{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NewArrivals;