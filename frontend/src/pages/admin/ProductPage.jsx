import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import ProductForm from "../../components/ProductForm";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = (product) => setEditingProduct(product);
  const handleAddProduct = () => setEditingProduct({});

  const handleSaveProduct = (savedProduct) => {
    const exists = products.find((p) => p._id === savedProduct._id);
    if (exists) {
      setProducts(products.map((p) => (p._id === savedProduct._id ? savedProduct : p)));
    } else {
      setProducts([savedProduct, ...products]);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="relative">
            <ProductCard product={product} />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
    </>
  );
}
