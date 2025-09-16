import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResults from "./components/SearchResults";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <div >
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Optional: 404 page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </div>
  );
}
