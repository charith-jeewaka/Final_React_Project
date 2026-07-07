import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

import ProductForm from "../../components/admin/ProductForm";
import { getItemById, updateItem } from "../../service/ItemService";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

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

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      if (!id) return;

      const response = await getItemById(id);

      const item = response.item;

      setFormData({
        name: item.name,
        category: item.category,
        description: item.description ?? "",
        price: item.price.toString(),
        stock: item.stock.toString(),
        active: item.active,
      });

      setPreview(item.image);
    } catch (error) {
      alert("Failed to load product.");
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

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

    try {
      setLoading(true);

      const response = await updateItem(id, form);

      alert(response.message);

      navigate("/admin/inventory");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message ?? "Update failed.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    loadItem();
    setImage(null);
  };

  if (pageLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <h2 className="text-xl font-semibold">Loading Product...</h2>
      </div>
    );
  }

  return (
    <ProductForm
      formData={formData}
      preview={preview}
      loading={loading}
      handleChange={handleChange}
      handleImage={handleImage}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
    />
  );
};

export default EditProduct;
