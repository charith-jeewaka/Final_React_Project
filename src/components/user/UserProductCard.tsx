import type { Item } from "../../types/Item";

interface UserProductCardProps {
  item: Item;
  onAddToCart: (item: Item) => void;
}

const UserProductCard = ({ item, onAddToCart }: UserProductCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
      <img
        src={item.image}
        alt={item.name}
        className="h-56 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{item.name}</h2>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
            {item.category}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-zinc-600">{item.description}</p>

        <div className="flex justify-between">
          <span className="font-bold text-emerald-600">Rs. {item.price}</span>

          <span>Stock: {item.stock}</span>
        </div>

        <button
          onClick={() => onAddToCart(item)}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default UserProductCard;
