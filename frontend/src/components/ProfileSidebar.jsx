import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function ProfileSidebar({ isOpen, onClose }) {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl border-l border-gray-200 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">{user.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Role:</span> {user.role || "User"}
          </p>

          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}
