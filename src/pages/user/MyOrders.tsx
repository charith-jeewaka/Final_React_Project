import { useEffect, useState } from "react";
import { getMyOrders } from "../../service/OrderService";
import type { Order } from "../../types/Order";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-zinc-100 text-zinc-700";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-zinc-800">
        My Orders
      </h1>

      {orders.map((order) => (
        <div key={order._id} className="rounded-2xl bg-white p-4 shadow">
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold">Order #{order._id.slice(-6)}</h2>

              <p className="text-sm text-zinc-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(order.status)}`}
            >
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

          <button
            onClick={() => navigate(`/dashboard/myOrders/${order._id}`)}
            className="mt-4 rounded-xl bg-emerald-500 px-5 py-2 text-white hover:bg-emerald-600"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
