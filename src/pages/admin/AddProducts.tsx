import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createItem } from "../../service/ItemService";
import axios from "axios";
import ProductForm from "../../components/admin/ProductForm";
import Swal from "sweetalert2";


const AddProducts = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
if (loading) return;

    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.price ||
      !formData.stock ||
      !image
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all required fields.",
      });
      return;
    }

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

    const response = await createItem(form);

    Swal.fire({
      icon: "success",
      title: "Product Added!",
      text: response.message,
      timer: 1800,
      showConfirmButton: false,
    });

    resetForm();
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message ?? "Failed to create product.");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occured.",
      });
    }
  }

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

export default AddProducts;
