import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import ProfileSidebar from "./ProfileSidebar";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white hover:scale-105 transition-transform flex-shrink-0"
        >
          Aniket Shopee
        </Link>

        {/* Desktop search */}
        <div className="hidden md:flex flex-1 mx-6">
          <form onSubmit={handleSearch} className="flex w-full max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 md:py-3 rounded-l-2xl border-none outline-none text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="px-5 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-r-2xl hover:bg-blue-700 shadow-md transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-white font-medium flex-shrink-0">
          <li>
            <Link to="/" className="hover:underline transition">
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="font-semibold hover:text-blue-300 transition"
                >
                  {user.name}
                </button>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="hover:underline transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline transition">
                  Register
                </Link>
              </li>
            </>
          )}
          {user?.isAdmin && (
            <li>
              <Link to="/admin" className="hover:underline transition">
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-3xl font-bold p-2 rounded-md hover:bg-white/20 transition flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-indigo-500/90 px-4 py-4 space-y-3 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Mobile search */}
        <form onSubmit={handleSearch} className="flex w-full mb-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-2xl border-none outline-none text-gray-800"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-2xl hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Mobile links */}
        <ul className="flex flex-col gap-2 text-white font-medium">
          <li>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:underline transition"
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <button
                  onClick={() => {
                    setIsSidebarOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="font-semibold hover:text-blue-300 transition"
                >
                  {user.name}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="hover:underline transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:underline transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:underline transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {user?.isAdmin && (
            <li>
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:underline transition"
              >
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </nav>
  );
}
