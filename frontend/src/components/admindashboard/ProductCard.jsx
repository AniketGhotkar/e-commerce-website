export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col items-center">
      <img
        src={product.images[0] || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{product.description}</p>
      <p className="font-bold mt-2">${product.price}</p>
    </div>
  );
}
