import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react"; // Import icons từ lucide-react
import { logout } from "../redux/authSlice";
import { logoutUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/userSlice";
const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref cho menu mobile
  const { isAuthen } = useSelector((state) => state.auth); // Lấy trạng thái đăng nhập từ Redux
  const { user } = useSelector((state) => state.user);

  const token = useSelector((state) => state.auth.token); // Lấy token từ state
  const [profile, setProfile] = useState({
    avatar: "",
    fullName: "",
    email: "",
    birthDate: "",
    phone: "",
    gender: "",
    address: "",
  });
  const goToProfile = () => {
    // Chuyển hướng đến trang Profile
    navigate("/profile");
    setMenuOpen(false);
  };
  // 1. Chỉ gọi fetchUser nếu token có sự thay đổi và người dùng chưa được lấy
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser(token)); // Truyền token vào fetchUser
    }
  }, [dispatch, token, user]);

  // 2. Khi user thay đổi, cập nhật profile
  useEffect(() => {
    if (user) {
      setProfile({
        avatar: user.avatar || "https://i.pravatar.cc/150",
        fullName: user.fullName || "",
        email: user.email || "",
        birthDate: user.birthDate || "",
        phone: user.phone || "",
        gender: user.gender || "",
        address: user.address || "",
      });
    }
  }, [user]);

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
      title: "Dự án",
      path: "/services",
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
        {/* Hiển thị Login/SignUp hoặc Avatar + Tên */}
        <div className="hidden md:flex space-x-4 items-center">
          {isAuthen ? (
            <div className="flex items-center space-x-4">
              {/* Avatar + Name */}
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={goToProfile}
              >
                <img
                  src={
                    profile?.avatar ||
                    "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  }
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-700 font-medium">
                  {profile?.fullName}
                </span>
              </div>
              {/* Logout */}
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                onClick={() => {
                  dispatch(logout());
                  dispatch(logoutUser());
                }}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Nút mở menu mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        ref={menuRef} // Gán ref vào menu
        className={`fixed md:hidden top-15 left-0 w-full md:w-1/2 bg-white shadow-md transition-transform duration-300 ${
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
          {/* Hiển thị Avatar + Tên hoặc Login/SignUp */}
          {isAuthen ? (
            <div className="flex flex-col items-center space-y-3">
              <img
                src={
                  profile?.avatar ||
                  "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                }
                alt="Avatar"
                className="w-12 h-12 rounded-full  object-cover cursor-pointer"
                onClick={goToProfile}
              />
              <span
                className="text-gray-700 font-medium cursor-pointer"
                onClick={goToProfile}
              >
                {profile?.fullName}
              </span>
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                onClick={() => {
                  dispatch(logout());
                  dispatch(logoutUser);
                  setMenuOpen(false);
                }}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
