import { useEffect, useState } from "react";
import { getAllItems } from "../../service/ItemService";
import type { Item } from "../../types/Item";
import UserProductCard from "../../components/user/UserProductCard";

const UserDashboard = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getAllItems();

      // Show only active products
      const activeItems = response.items.filter((item: Item) => item.active);

      setItems(activeItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: Item) => {
    console.log("Add to cart:", item);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-xl font-semibold">Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <UserProductCard
            key={item._id}
            item={item}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
