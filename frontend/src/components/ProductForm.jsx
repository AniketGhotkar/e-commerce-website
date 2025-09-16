import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    images: [],
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        category: product.category || "",
        images: product.images || [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (product._id) {
        // Edit product
        const res = await axios.put(
          `http://localhost:5000/api/products/${product._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onSave(res.data);
      } else {
        // Add product
        const res = await axios.post(
          `http://localhost:5000/api/products`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onSave(res.data);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {product._id ? "Edit Product" : "Add Product"}
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="images"
            value={form.images.join(",")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                images: e.target.value.split(",").map((img) => img.trim()),
              }))
            }
            placeholder="Image URLs (comma separated)"
            className="border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
