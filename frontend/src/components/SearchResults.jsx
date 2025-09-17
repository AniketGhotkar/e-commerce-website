import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard"; // import the component

const API = import.meta.env.VITE_API_URL;

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${API}/products`;
        if (query) url = `${API}/products/search?q=${query}`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="p-6">
      {query && (
        <h2 className="text-xl font-bold mb-6">
          Search results for: "{query}"
        </h2>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}
