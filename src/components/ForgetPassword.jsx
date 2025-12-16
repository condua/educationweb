// src/components/ForgetPassword.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // 🟢 Import Redux hooks
import { MdOutlineEmail } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io"; // Icon nút back cho mobile

import { forgotPassword, clearError } from "../redux/authSlice"; // 🟢 Import Action
import studentImage from "../assets/student11.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  // 🟢 Lấy state từ Redux
  const { status, error, message } = useSelector((state) => state.auth);
  const loading = status === "loading";

  // Xóa lỗi cũ khi component mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSendCode = () => {
    if (!email) {
      alert("Vui lòng nhập email của bạn.");
      return;
    }

    // 🟢 Gọi API qua Redux Thunk
    dispatch(forgotPassword(email))
      .unwrap() // Giúp xử lý Promise dễ dàng hơn (then/catch)
      .then((res) => {
        // Thành công
        // alert(res.message); // Có thể hiện alert hoặc không tùy UX

        // Chuyển sang trang xác thực và truyền email qua state
        navigate("/verify-code", { state: { email: email } });
      })
      .catch((err) => {
        // Thất bại: Redux đã tự cập nhật 'error' vào state,
        // nhưng ta có thể alert ngay tại đây nếu muốn
        console.error("Gửi mã thất bại:", err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-3xl flex w-full max-w-4xl overflow-hidden relative">
        {/* Nút Back cho Mobile */}
        <button
          onClick={() => navigate("/login")}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 md:hidden z-10"
        >
          <IoIosArrowBack size={24} />
        </button>

        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block relative">
          <img
            src={studentImage}
            alt="Forgot Password"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Khôi phục tài khoản
            </h2>
            <p className="text-gray-500 text-sm">
              Nhập email đã đăng ký để nhận mã xác thực OTP.
            </p>
          </div>

          {/* Hiển thị lỗi từ Redux nếu có */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
              {error.message || error}
            </div>
          )}

          {/* Input Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email đăng ký
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <MdOutlineEmail size={22} />
              </span>
              <input
                type="email"
                placeholder="vidu@gmail.com"
                className="w-full p-3.5 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSendCode}
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            {loading && <ImSpinner2 className="animate-spin mr-2" />}
            {loading ? "Đang gửi..." : "Gửi mã xác thực"}
          </button>

          <p className="text-center mt-8 text-sm text-gray-600">
            Nhớ mật khẩu?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="text-teal-600 font-bold hover:underline hover:text-teal-700"
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
