// src/components/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

import studentImage from "../assets/student11.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {}; // Nhận email và code

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Nếu không có email hoặc code, quay về bước đầu
  useEffect(() => {
    if (!email || !code) {
      navigate("/forget-password");
    }
  }, [email, code, navigate]);

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ mật khẩu.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    // Giả lập gọi API để đặt lại mật khẩu
    setTimeout(() => {
      console.log("Resetting password for:", email, "with new password.");
      setLoading(false);
      alert("Mật khẩu đã được thay đổi thành công!");
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden m-4">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={studentImage}
            alt="Reset Password"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-center text-2xl font-bold text-teal-600 mb-2">
            Tạo mật khẩu mới
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Mật khẩu mới của bạn phải đủ mạnh và khác với mật khẩu trước đây.
          </p>

          {/* New Password */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiLock size={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiLock size={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu mới"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleResetPassword}
            className="w-full bg-teal-500 text-white py-3 rounded-lg mt-6 hover:bg-teal-600 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin mr-2" /> : null}
            {loading ? "Đang lưu..." : "Đặt lại mật khẩu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
