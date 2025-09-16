export default function UserCard({ user }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col">
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-500 text-sm mt-1">{user.role}</p>
    </div>
  );
}
