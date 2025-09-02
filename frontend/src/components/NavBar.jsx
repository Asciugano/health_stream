import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, User, LogOut, Home, LogIn } from "lucide-react";
import NavItem from "./NavItem";

function Navbar({ setToken, setUser_id, token }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser_id(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow px-4 py-2">
      <div className="flex space-x-4">
        <NavItem icon={Home} label={"Home"} to={'/'} />
        <NavItem icon={User} label={"Profile"} to={'/profile'} />
        <NavItem icon={LayoutDashboard} label={"DashBoard"} to={'/dashboard'} />
      </div>
      <div className="flex items-center">
        {!token &&
          <NavItem icon={LogIn} label={"Login"} to={'/login'} />
        }
        {token &&
          <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 transition">
            <NavItem icon={LogOut} label={"Logout"} to={"/login"} />
          </button>
        }
      </div>
    </nav>
  );
}

export default Navbar;
