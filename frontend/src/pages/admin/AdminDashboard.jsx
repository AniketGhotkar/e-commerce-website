import { useState } from "react";
import Sidebar from "../../components/admindashboard/Sidebar";
import UsersPage from "./UserPage";
import OrdersPage from "./ordersPage";
import ProductsPage from "./ProductPage";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "Users":
        return <UsersPage />;
      case "Orders":
        return <OrdersPage />;
      case "Products":
        return <ProductsPage />;
      default:
        return <h2 className="text-3xl font-bold">Welcome to Admin Panel</h2>;
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        {/* <Navbar /> */}
      </div>

      {/* Admin panel container */}
      <div className="flex flex-1 w-full">
        {/* Desktop Sidebar */}
        <div
          className="hidden md:flex md:flex-col w-64 bg-white shadow-lg"
          style={{ position: "sticky", top: 0, height: "100vh" }}
        >
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden fixed left-4 z-50 p-2 bg-indigo-500 text-white rounded-md shadow-lg"
          style={{ top: 64 + 8 }} // only if Navbar is outside
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed left-0 z-50 w-64 bg-white shadow-lg md:hidden"
            style={{ top: 64, height: `calc(100vh - 64px)` }}
          >
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              closeSidebar={closeSidebar}
            />
          </div>
        )}

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 md:p-8">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
