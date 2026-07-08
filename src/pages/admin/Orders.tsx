import { useEffect, useState } from "react";
import { getAllOrders } from "../../service/OrderService";
import type { Order } from "../../types/Order";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [search, statusFilter, orders]);

  const loadOrders = async () => {
    try {
      const response = await getAllOrders();

      setOrders(response.orders);
      setFilteredOrders(response.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let result = [...orders];

    if (search.trim()) {
      result = result.filter(
        (order) =>
          order.customerName.toLowerCase().includes(search.toLowerCase()) ||
          order._id.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(result);
  };

  if (loading) {
    return <h1>Loading Orders...</h1>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Orders Management</h1>

      {/* Search */}
      <div className="rounded-2xl bg-white p-5 shadow">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Search customer or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border p-3 outline-none focus:border-emerald-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border p-3 outline-none focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders */}

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">#{order._id.slice(-8)}</h2>

                <p className="text-zinc-500">{order.customerName}</p>

                <p className="text-sm text-zinc-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
                {order.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-zinc-500">Items</p>
                <h3 className="font-bold">{order.items.length}</h3>
              </div>

              <div>
                <p className="text-zinc-500">Total</p>
                <h3 className="font-bold text-emerald-600">
                  Rs. {order.total}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500">Phone</p>
                <h3 className="font-bold">{order.phone}</h3>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button className="rounded-xl bg-blue-500 px-5 py-2 text-white hover:bg-blue-600">
                View
              </button>

              <button className="rounded-xl bg-emerald-500 px-5 py-2 text-white hover:bg-emerald-600">
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
