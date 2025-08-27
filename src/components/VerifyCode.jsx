// src/components/VerifyCode.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbPasswordUser } from "react-icons/tb";
import { ImSpinner2 } from "react-icons/im";

import studentImage from "../assets/student11.png";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Nhận email từ trang trước

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Nếu người dùng truy cập trực tiếp trang này mà không có email, chuyển hướng họ về
  useEffect(() => {
    if (!email) {
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const handleVerify = () => {
    if (code.length < 6) {
      alert("Mã xác thực phải đủ 6 ký tự.");
      return;
    }
    setLoading(true);
    // Giả lập gọi API xác thực mã
    setTimeout(() => {
      console.log("Verifying code:", code, "for email:", email);
      setLoading(false);
      // Chuyển sang trang đặt lại mật khẩu và truyền email + code
      navigate("/reset-password", { state: { email: email, code: code } });
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden m-4">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={studentImage}
            alt="Verify Code"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-center text-2xl font-bold text-teal-600 mb-2">
            Xác thực tài khoản
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Vui lòng nhập mã xác thực gồm 6 chữ số đã được gửi đến{" "}
            <strong className="text-gray-700">{email}</strong>.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã xác thực
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <TbPasswordUser size={20} />
              </span>
              <input
                type="text"
                placeholder="Nhập 6 chữ số"
                maxLength="6"
                className="w-full p-3 pl-10 border rounded-lg tracking-[1em] text-center focus:ring-teal-500 focus:border-teal-500"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-teal-500 text-white py-3 rounded-lg mt-6 hover:bg-teal-600 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin mr-2" /> : null}
            {loading ? "Đang xác thực..." : "Xác thực"}
          </button>

          <p className="text-center mt-6 text-sm">
            <a href="#" className="text-teal-500 hover:underline">
              Không nhận được mã? Gửi lại.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
