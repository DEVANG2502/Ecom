import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Card", "UPI", "COD"], required: true },
    paymentStatus: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
    orderStatus: { type: String, enum: ["Processing", "Shipped", "Delivered"], default: "Processing" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
