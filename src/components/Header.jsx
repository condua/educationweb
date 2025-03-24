import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons từ lucide-react

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref cho menu mobile
  const items = [
    {
      title: "Trang chủ",
      path: "/",
    },
    {
      title: "Khóa học",
      path: "/courses",
    },
    {
      title: "Tư vấn",
      path: "/consult",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];
  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="w-full bg-white shadow sticky z-50 top-0 left-0">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          className="text-xl font-bold text-teal-600 cursor-pointer"
        >
          MLPA
        </div>

        {/* Menu chính */}
        <nav className="hidden md:flex space-x-8 text-gray-600">
          {items.map((item, index) => (
            <a key={index} href={item.path} className="hover:text-teal-600">
              {item.title}
            </a>
          ))}
        </nav>

        {/* Nút Login / Sign Up */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-teal-600 cursor-pointer"
          >
            Login
          </button>
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>

        {/* Nút mở menu mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        ref={menuRef} // Gán ref vào menu
        className={`fixed sm:hidden top-15 left-0 w-full sm:w-1/2 bg-white shadow-md transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Nút đóng menu */}
        {/* <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
        </div> */}

        <nav className="flex flex-col items-center py-6 space-y-6 text-gray-600">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="hover:text-teal-600"
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </a>
          ))}
          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="text-gray-700 hover:text-teal-600 cursor-pointer"
          >
            Login
          </button>
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer"
            onClick={() => {
              navigate("/register");
              setMenuOpen(false);
            }}
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
