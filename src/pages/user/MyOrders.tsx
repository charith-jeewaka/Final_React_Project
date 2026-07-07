import { useEffect, useState } from "react";
import { getMyOrders } from "../../service/OrderService";
import type { Order } from "../../types/Order";

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getMyOrders();
      setOrders(response.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="rounded-2xl bg-white p-6 shadow">
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold">Order #{order._id.slice(-6)}</h2>

              <p className="text-sm text-zinc-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">
              {order.status}
            </span>
          </div>

          <div className="mt-4">
            <p>
              <strong>Total:</strong> Rs. {order.total}
            </p>

            <p>
              <strong>Items:</strong> {order.items.length}
            </p>
          </div>

          <button className="mt-4 rounded-xl bg-emerald-500 px-5 py-2 text-white">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
