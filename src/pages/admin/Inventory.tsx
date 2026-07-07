import { useEffect, useState } from "react";
import { getAllItems, deleteItem } from "../../service/ItemService";
import type { Item } from "../../types/Item";
import AdminProductCard from "../../components/admin/AdminProductCard";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [search, categoryFilter, statusFilter]);

  const loadItems = async () => {
    try {
      const response = await getAllItems();
      setItems(response.items);
      setFilteredItems(response.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleFilter = () => {
    let result = [...items];

    // Search filter
    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((item) =>
        statusFilter === "active" ? item.active : !item.active,
      );
    }

    setFilteredItems(result);
  };


  const navigate = useNavigate();

  const handleEdit = (item: Item) => {
    navigate(`/admin/inventory/edit/${item._id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      const response = await deleteItem(id);

      alert(response.message);

      // Remove from local state
      setItems((prev) => prev.filter((item) => item._id !== id));
      setFilteredItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-xl font-semibold">Loading products...</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="rounded-2xl bg-white p-5 shadow">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border p-3 outline-none focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <AdminProductCard
            key={item._id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
