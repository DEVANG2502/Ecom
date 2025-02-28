import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  userId: string;
  cartItems: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Total Amount</th>
              <th className="p-2 border">Payment Method</th>
              <th className="p-2 border">Payment Status</th>
              <th className="p-2 border">Order Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center border">
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">${order.totalAmount.toFixed(2)}</td>
                <td className="p-2 border">{order.paymentMethod}</td>
                <td className={`p-2 border ${order.paymentStatus === "Paid" ? "text-green-500" : "text-yellow-500"}`}>
                  {order.paymentStatus}
                </td>
                <td className={`p-2 border ${order.orderStatus === "Delivered" ? "text-green-500" : "text-blue-500"}`}>
                  {order.orderStatus}
                </td>
                <td className="p-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
