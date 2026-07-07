import type { Item } from "../../types/Item";

interface AdminProductCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const AdminProductCard = ({
  item,
  onEdit,
  onDelete,
}: AdminProductCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg">
      <img
        src={item.image}
        alt={item.name}
        className="h-40 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{item.name}</h2>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              item.active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.active ? "Active" : "Inactive"}
          </span>
        </div>

        <p className="text-sm text-zinc-500">{item.category}</p>

        <p className="line-clamp-2 text-sm text-zinc-600">{item.description}</p>

        <div className="flex justify-between text-sm">
          <span>
            <strong>Rs.</strong> {item.price}
          </span>

          <span>
            <strong>Stock:</strong> {item.stock}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span>⭐ {item.averageRating.toFixed(1)}</span>

          <span>{item.reviewCount} Reviews</span>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 rounded-lg bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item._id)}
            className="flex-1 rounded-lg bg-red-500 py-2 font-semibold text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
