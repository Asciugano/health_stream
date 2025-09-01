import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, User, LogOut } from "lucide-react";

function Navbar({ setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold hover:text-gray-300">
        Health Stream
      </Link>

      {/* Solo icone */}
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="p-2 rounded-full hover:bg-gray-700 transition">
          <LayoutDashboard size={22} />
        </Link>
        <Link to="/profile" className="p-2 rounded-full hover:bg-gray-700 transition">
          <User size={22} />
        </Link>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-red-600 transition"
        >
          <LogOut size={22} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
