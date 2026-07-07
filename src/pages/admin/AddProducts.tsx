import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const AddProducts = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    active: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    alert("clicked")

    e.preventDefault();

    const form = new FormData();

    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("stock", formData.stock);
    form.append("active", String(formData.active));

    if (image) {
      form.append("image", image);
    }

    console.log(form);
  };

  const resetForm = () => {
    setImage(null);
    setPreview("");

    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      active: true,
    });
  };

  return (
    <div className="w-full">
      {/* Header */}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 xl:grid-cols-3">
          {/* LEFT */}

          <div className="xl:col-span-2 space-y-8">
            {/* Product Information */}

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h2 className="mb-6 text-xl font-semibold">
                Product Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">Product Name</label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 p-3 outline-none transition focus:border-emerald-500"
                    placeholder="Wireless Mouse"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 p-3 outline-none focus:border-emerald-500"
                  >
                    <option value="">Select Category</option>
                    <option>Electronics</option>
                    <option>Groceries</option>
                    <option>Food</option>
                    <option>Fashion</option>
                    <option>Home</option>
                    <option>Sports</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Price</label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 p-3 outline-none focus:border-emerald-500"
                    placeholder="2500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Stock</label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-300 p-3 outline-none focus:border-emerald-500"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Status</label>

                  <select
                    name="active"
                    value={formData.active ? "true" : "false"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        active: e.target.value === "true",
                      }))
                    }
                    className="w-full rounded-xl border border-zinc-300 p-3 outline-none focus:border-emerald-500"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block font-medium">Description</label>

                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-300 p-4 outline-none focus:border-emerald-500"
                  placeholder="Enter product description..."
                />
              </div>
            </div>
          </div>


          {/* RIGHT */}

          <div className="flex flex-col gap-6">
            {/* Product Image */}

            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h2 className="mb-6 text-xl font-semibold">Product Image</h2>

              <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 transition hover:border-emerald-500">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <>
                    <div className="text-6xl">📷</div>

                    <p className="mt-4 text-lg font-semibold text-zinc-600">
                      Upload Product Image
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">JPG, PNG, WEBP</p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />
              </label>
            </div>

            {/* Actions */}

            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="mb-5 text-xl font-semibold">Actions</h2>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-xl border border-zinc-300 py-3 font-semibold transition hover:bg-zinc-100"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-500 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-600"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AddProducts;
