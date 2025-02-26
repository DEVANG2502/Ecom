import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

// ✅ Sample products to insert into MongoDB
const products = [
  { name: "Nike Dunk Low", colors: "1 Colour", price: 109.95, image: "/images/shoe/shoe.jpg" },
  { name: "Air Jordan 1 Low", colors: "1 Colour", price: 69.95, image: "/images/shoe/shoe2.jpg" },
  { name: "Nike Air Max Plus 3", colors: "1 Colour", price: 184.95, image: "/images/shoe/shoe3.jpg" },
  { name: "Nike SB Dunk", colors: "2 Colours", price: 129.95, image: "/images/shoe/bg1.jpg" },
];

const insertData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany(); // Clears existing products
    await Product.insertMany(products);
    console.log("✅ Products added successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error adding products:", error);
    process.exit(1);
  }
};

insertData();
