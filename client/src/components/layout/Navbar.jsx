import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const linkStyles = ({ isActive }) => 
    `hover:underline cursor-pointer font-medium transition-colors ${
      isActive ? "underline" : "text-black"
    }`;
  
  return (
    // justify-between pushes the three divs to the left, center, and right
    <div className="flex justify-between items-center relative gap-6 pt-4 pb-3 px-4">
      {/* Left: Logo */}
      <div className="shrink-0" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="logo" className="h-8" />
      </div>

      {/* Center: Navigation Links */}
      <nav>
        <ul className="flex items-center gap-6">
          <li><NavLink to="/" className={linkStyles}>Home</NavLink></li>
          <li><NavLink to="/services" className={linkStyles}>Services</NavLink></li>
          <li><NavLink to="/products" className={linkStyles}>Products</NavLink></li>
          <li><NavLink to="/about_us" className={linkStyles}>About Us</NavLink></li>
        </ul>
      </nav>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <button
          className="border rounded-2xl px-5 py-1 bg-black text-white font-bold cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="border rounded-2xl px-3 py-1 font-bold cursor-pointer hover:bg-gray-100"
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
