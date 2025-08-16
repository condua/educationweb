import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Home,
  BookOpen,
  FileText,
  Briefcase,
  Rss,
  Gamepad2,
  MessageSquare,
} from "lucide-react";
import { logout } from "../redux/authSlice";
import { logoutUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/userSlice";
import logo from "../assets/logo.png"; // Giả sử bạn có một logo

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { isAuthen } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  // Lấy thông tin người dùng
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token, user]);

  // Các mục menu với icon
  const items = [
    { title: "Trang chủ", path: "/", icon: <Home size={20} /> },
    { title: "Khóa học", path: "/courses", icon: <BookOpen size={20} /> },
    { title: "Đề thi", path: "/exams", icon: <FileText size={20} /> },
    { title: "Dự án", path: "/services", icon: <Briefcase size={20} /> },
    { title: "Blog", path: "/blog", icon: <Rss size={20} /> },
    { title: "Trò chơi", path: "/games", icon: <Gamepad2 size={20} /> },
    { title: "Chat", path: "/chat", icon: <MessageSquare size={20} /> },
  ];

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý khi nhấn phím Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutUser());
    setMenuOpen(false);
  };

  const goToProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  return (
    <>
      <header className="w-full bg-white shadow-md sticky z-50 top-0 left-0">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="md:h-20 h-12 w-auto cursor-pointer" // Thay đổi kích thước cho nhất quán
            onClick={() => navigate("/")}
          />

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-gray-600">
            {items.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="font-medium hover:text-teal-600 transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* Nút Login/Profile Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthen ? (
              <div className="flex items-center space-x-4">
                <div
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={goToProfile}
                >
                  <img
                    src={user?.avatar || "https://i.pravatar.cc/150"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-teal-500 transition-all"
                  />
                  <span className="text-gray-700 font-medium group-hover:text-teal-600">
                    {user?.fullName || "User"}
                  </span>
                </div>
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="font-medium text-gray-700 hover:text-teal-600"
                >
                  Đăng nhập
                </button>
                <button
                  className="bg-teal-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-teal-700 transition-colors"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký
                </button>
              </>
            )}
          </div>

          {/* Nút mở menu mobile */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* --- Giao diện Mobile --- */}

      {/* Lớp phủ (Overlay) */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity md:hidden ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Menu Mobile */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Phần Header của Menu */}
        <div className="flex items-center justify-between p-4 border-b">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* Phần Thông tin User */}
        {isAuthen && user && (
          <div className="p-4 border-b cursor-pointer" onClick={goToProfile}>
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar || "https://i.pravatar.cc/150"}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{user.fullName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Phần Điều hướng */}
        <nav className="flex-grow p-4 space-y-1">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors text-left"
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </nav>

        {/* Phần Footer của Menu (Đăng nhập/Đăng xuất) */}
        <div className="p-4 border-t">
          {isAuthen ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Đăng xuất</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => handleNavigate("/login")}
                className="flex-1 py-2 px-4 rounded-md text-center font-medium text-teal-600 bg-teal-50 hover:bg-teal-100"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => handleNavigate("/register")}
                className="flex-1 py-2 px-4 rounded-md text-center font-semibold text-white bg-teal-600 hover:bg-teal-700"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
