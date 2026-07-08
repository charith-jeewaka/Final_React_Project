import { useEffect, useState } from "react";
import { getAllOrders } from "../../service/OrderService";
import type { Order } from "../../types/Order";
import Swal from "sweetalert2";
import { updateOrderStatus ,getOrderById } from "../../service/OrderService";

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

const handleStatusUpdate = async (order: Order) => {
  let inputOptions: Record<string, string> = {};

  switch (order.status) {
    case "Pending":
      inputOptions = {
        Processing: "Processing",
        Cancelled: "Cancelled",
      };
      break;

    case "Processing":
      inputOptions = {
        Delivered: "Delivered",
      };
      break;

    case "Delivered":
    case "Cancelled":
      await Swal.fire({
        icon: "info",
        title: "Status Locked",
        text: `This order has already been ${order.status.toLowerCase()} and cannot be changed.`,
      });
      return;

    default:
      return;
  }

  const { value: status } = await Swal.fire({
    title: "Update Order Status",
    input: "select",
    inputOptions,
    inputPlaceholder: "Select new status",
    showCancelButton: true,
  });

  if (!status) return;

  try {
    const response = await updateOrderStatus(order._id, status);

    await Swal.fire({
      icon: "success",
      title: "Updated",
      text: response.message,
      timer: 1500,
      showConfirmButton: false,
    });

    loadOrders();
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error.response?.data?.message || "Something went wrong.",
    });
  }
};

const handleViewOrder = async (id: string) => {
  try {
    const response = await getOrderById(id);

    const order = response.order;

    const itemsHtml = order.items
      .map(
        (item: any) => `
          <div style="
            display:flex;
            align-items:center;
            gap:15px;
            margin-bottom:15px;
            border-bottom:1px solid #eee;
            padding-bottom:10px;
          ">
            <img
              src="${item.image}"
              style="
                width:70px;
                height:70px;
                object-fit:cover;
                border-radius:10px;
              "
            />

            <div style="text-align:left;">
              <h4 style="margin:0">${item.name}</h4>
              <p style="margin:4px 0;">Qty: ${item.quantity}</p>
              <p style="margin:4px 0;">Rs. ${item.price}</p>
            </div>
          </div>
        `,
      )
      .join("");

    Swal.fire({
      title: `Order #${order._id.slice(-8)}`,
      width: 800,
      html: `
        <div style="text-align:left">

          <h3>Customer Information</h3>

          <p><strong>Name:</strong> ${order.customerName}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Address:</strong> ${order.address}</p>

          <hr>

          <h3>Ordered Items</h3>

          ${itemsHtml}

          <hr>

          <p><strong>Subtotal:</strong> Rs. ${order.subtotal}</p>
          <p><strong>Delivery Fee:</strong> Rs. ${order.deliveryFee}</p>

          <h2 style="color:#16a34a">
            Total: Rs. ${order.total}
          </h2>

          <p><strong>Status:</strong> ${order.status}</p>

        </div>
      `,
    });
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Unable to load order.",
    });
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
      {/* Search */}
      <div className="sticky top-0 z-10 rounded-2xl bg-white p-3 shadow">
        {" "}
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

      <div className="space-y-2">
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

              <span
                className={`rounded-full px-4 py-2 font-semibold ${getStatusColor(order.status)}`}
              >
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
              <button
                onClick={() => handleViewOrder(order._id)}
                className="rounded-xl bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
              >
                View
              </button>

              <button
                onClick={() => handleStatusUpdate(order)}
                className="rounded-xl bg-emerald-500 px-5 py-2 text-white hover:bg-emerald-600"
              >
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
