// src/components/ForgetPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";

import studentImage from "../assets/student11.png"; // Sử dụng lại ảnh cũ

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (!email) {
      alert("Vui lòng nhập email của bạn.");
      return;
    }
    // Giả lập gọi API
    setLoading(true);
    setTimeout(() => {
      console.log("Sending verification code to:", email);
      setLoading(false);
      // Chuyển sang trang xác thực và truyền email qua state
      navigate("/verify-code", { state: { email: email } });
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden m-4">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={studentImage}
            alt="Forgot Password"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-center text-2xl font-bold text-teal-600 mb-2">
            Quên mật khẩu
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Đừng lo lắng! Nhập email của bạn và chúng tôi sẽ gửi mã xác thực để
            đặt lại mật khẩu.
          </p>

          {/* Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MdOutlineEmail size={20} />
              </span>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSendCode}
            className="w-full bg-teal-500 text-white py-3 rounded-lg mt-6 hover:bg-teal-600 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin mr-2" /> : null}
            {loading ? "Đang gửi..." : "Gửi mã xác thực"}
          </button>

          <p className="text-center mt-6 text-sm">
            <a
              href="#"
              onClick={() => navigate("/login")}
              className="text-teal-500 hover:underline"
            >
              Quay lại Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
