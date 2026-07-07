import { useEffect, useState } from "react";
import { getAllItems } from "../../service/ItemService";
import type { Item } from "../../types/Item";
import UserProductCard from "../../components/user/UserProductCard";

const UserDashboard = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getAllItems();

      // Show only active products
      const activeItems = response.items.filter((item: Item) => item.active);

      setItems(activeItems);
      setFilteredItems(activeItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...items];

    if (search.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    setFilteredItems(result);
  }, [search, categoryFilter, items]);

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
      
      <div className="sticky top-0 z-10 rounded-2xl bg-white p-2 shadow">
        <div className="grid gap-4 md:grid-cols-2 ">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border p-3 outline-none focus:border-emerald-500"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border p-3 outline-none focus:border-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Groceries">Groceries</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filteredItems.map((item) => (
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
