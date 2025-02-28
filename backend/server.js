// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url";

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import productRoutes from "./routes/productRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ Fix __dirname issue for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cookieParser());

// // ✅ Serve Static Files (Ensure "public/images" exists)
// app.use("/images", express.static(path.join(__dirname, "public", "images")));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/products", productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // ✅ Payment Routes
import orderRoutes from "./routes/orderRoutes.js"; // ✅ Order Routes


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Fix __dirname issue for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies
app.use(
  
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow frontend access
    credentials: true,
  })
);
// Serve Static Files (Ensure "public/images" exists)
app.use("/images", express.static(path.join(__dirname, "public", "images")));


// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // Make sure this route is correctly imported
app.use("/api/payment", paymentRoutes); // Make sure this route is correctly imported

// ✅ Test API Endpoint
app.get("/", (req, res) => {
  res.send("The Shoe Factory Backend is Running 🚀");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
