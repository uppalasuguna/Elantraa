import { useEffect, useState } from "react";
import { getOrders } from "../services/db";
import { auth } from "../services/firebase";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      getOrders(auth.currentUser.uid).then(setOrders);
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.map((order, i) => (
        <div key={i} className="border p-4 mb-2 rounded">
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Items:</strong></p>
          <ul className="ml-4 list-disc">
            {order.cartItems.map((item, idx) => (
              <li key={idx}>{item.name} — ₹{item.price}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
