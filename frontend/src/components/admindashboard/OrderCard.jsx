export default function OrderCard({ order }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col">
      <h3 className="font-semibold text-lg">Order #{order._id}</h3>
      <p className="text-gray-600 mt-1">User: {order.user?.name}</p>
      <p className="text-gray-600 mt-1">Total: ${order.total}</p>
      <p className="text-gray-500 text-sm mt-1">Status: {order.status}</p>
    </div>
  );
}
