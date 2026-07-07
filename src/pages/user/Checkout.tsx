import { useEffect, useState } from "react";
import type { CartItem } from "../../types/Cart";
import { placeOrder } from "../../service/OrderService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Checkout = () => {
 const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    try {
      const order = {
        customerName,
        phone,
        email,
        address,

        items: cartItems.map((item) => ({
          item: item._id,
          quantity: item.quantity,
        })),
      };

      const response = await placeOrder(order);

      await Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: response.message,
        timer: 1800,
        showConfirmButton: false,
      });

      // Clear cart
      localStorage.removeItem("cart");
      setCartItems([]);

      // Clear customer form
      setCustomerName("");
      setPhone("");
      setEmail("");
      setAddress("");


      // Redirect
      navigate("/dashboard/myOrders");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Checkout your items here !
      </h1>

      <div className="grid gap-6 lg:grid-cols-3 ">
        {/* Customer Details */}

        <div className="rounded-2xl bg-white p-6 shadow lg:col-span-2 ">
          <h2 className="mb-5 text-2xl font-bold">Customer Information</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Full Name"
              className="rounded-xl border p-3"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="rounded-xl border p-3"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded-xl border p-3 md:col-span-2"
            />

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery Address"
              rows={4}
              className="rounded-xl border p-3 md:col-span-2"
            />
          </div>
        </div>

        {/* Order Summary */}

        <div className="h-fit rounded-2xl bg-white p-6 shadow ">
          <h2 className="text-3xl font-bold text-center">YOUR ORDER</h2>

          <div className="mt-5 space-y-3">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>

                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <hr className="my-5" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>Rs. {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>

              <span>Rs. {deliveryFee}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span className="text-emerald-600">Rs. {total}</span>
            </div>
          </div>

          <button
            className="mt-6 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
