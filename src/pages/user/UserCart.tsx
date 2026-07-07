import { useEffect, useState } from "react";
import type { CartItem } from "../../types/Cart";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item,
    );

    updateCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);

    updateCart(updatedCart);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-xl font-semibold text-zinc-600">
          Your cart is empty
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center">Your shopping Items Here !</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart Items */}

        <div className="space-y-3 lg:col-span-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300">
          {" "}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="text-lg font-bold text-xl">{item.name}</h2>

                <p className="text-zinc-500">Rs. {item.price}</p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="rounded-lg border p-2"
                  >
                    <Minus size={10} />
                  </button>

                  <span className="font-semibold text-xl">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="rounded-lg border p-2"
                  >
                    <Plus size={10} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-200"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}

        <div className=" rounded-2xl bg-white p-6 shadow max-h-[calc(100vh-180px)]">
          <h2 className="text-3xl font-bold text-center">ORDER SUMMERY</h2>

          <div className="mt-5 space-y-4">
            {/* Items Count */}
            <div className="flex justify-between text-zinc-600">
              <span>Items</span>

              <span className="font-semibold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>

              <span className="font-semibold">Rs. {total}</span>
            </div>

            {/* Discount */}
            <div className="flex justify-between text-zinc-600">
              <span>Discount</span>

              <span className="font-semibold text-green-600">Rs. 0</span>
            </div>

            {/* Discount */}
            <div className="flex justify-between text-zinc-600">
              <span>Vouchers</span>

              <span className="font-semibold text-green-600">Rs. 0</span>
            </div>

            {/* Delivery */}
            <div className="flex justify-between text-zinc-600">
              <span>Delivery Fee</span>

              <span className="font-semibold">Rs. 500</span>
            </div>

            <hr />

            {/* Final Total */}

            <div className="flex justify-between">
              <span className="text-lg font-bold">Total</span>

              <span className="text-2xl font-bold text-emerald-600">
                Rs. {total + 500}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/checkout")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
