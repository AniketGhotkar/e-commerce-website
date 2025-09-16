export default function ProductCard({ product }) {
  return (
    <div
      className="group rounded-2xl shadow-lg hover:shadow-2xl p-5 
                 bg-slate-50 border border-gray-200 
                 transition-transform transform hover:-translate-y-2 
                 flex flex-col"
    >
      {/* Product Image */}
        <div className="relative overflow-hidden rounded-md">
            <img
                src={product.images?.length ? product.images[0] : "https://via.placeholder.com/300"}
                alt={product.title || product.name}
                className="w-full h-60 object-cover transition duration-300 group-hover:opacity-0"
            />
            <img
                src={product.images?.length > 1 ? product.images[1] : product.images?.[0] || "https://via.placeholder.com/300"}
                alt={product.title || product.name}
                className="absolute top-0 left-0 w-full h-60 object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
        </div>


      {/* Product Details */}
      <div className="flex-1 mt-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-blue-600 font-bold mt-3 text-lg">
          ₹ {product.price}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
