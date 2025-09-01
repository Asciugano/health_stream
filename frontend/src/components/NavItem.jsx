import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavItem({ icon: Icon, label, to }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname == to;

  return (
    <div
      className={`flex flex-col items-center group cursor-pointer px-4 py-2 transition-all duration-200 ${isActive ? "text-blue-600" : "text-gray-700"}`}
      onClick={() => navigate(to)}
    >
      <Icon className="transition-transform duration-200 group-hover:scale-90" size={28} />
      <div className="relative mt-1">
        <span>{label}</span>
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
      </div>
    </div>
  )
}

export default NavItem;
