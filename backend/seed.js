import mongoose from "mongoose";
import Product from "./models/Product.js"; 

const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce"; 

const products = [
  {
    name: "Nike Dunk Low",
    colors: "White/Black",
    price: 109.95,
    image: "/images/shoe/shoe3.jpg",
  },
  {
    name: "Air Jordan 1 Low",
    colors: "Blue/White",
    price: 69.95,
    image: "/images/shoe/shoe2.jpg",
  },
  {
    name: "Adidas Ultraboost",
    colors: "Black/White",
    price: 129.99,
    image: "/images/shoe/shoe3.jpg",
  },
  {
    name: "Nike Dunk Low",
    colors: "White/Black",
    price: 109.95,
    image: "/images/shoe/nb.jpg",
  },
  {
    name: "Air Jordan 1 Low",
    colors: "Blue/White",
    price: 69.95,
    image: "/images/shoe/shoe2.jpg",
  },
  {
    name: "Adidas Yezzyy",
    colors: "Black/White",
    price: 12329.99,
    image: "/images/shoe/shoe3.jpg",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Product.deleteMany(); // Clears existing products
    await Product.insertMany(products);
    console.log("Database seeded successfully! ✅");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
  }
};

seedDB();
