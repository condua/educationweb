import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; // Import icon xoay tròn

import student from "../assets/student11.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái tải

  const navigate = useNavigate();

  // Cập nhật dữ liệu form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kiểm tra hợp lệ form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Họ và tên không được để trống";
    if (!formData.email.trim()) newErrors.email = "Email không được để trống";
    if (formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); // Reset lỗi server trước khi gửi yêu cầu

    if (!validateForm()) {
      setIsLoading(false); // Nếu có lỗi, tắt xoay tròn ngay
      return;
    }

    setIsLoading(true); // Bắt đầu xoay tròn khi form hợp lệ

    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      if (response) {
        navigate("/"); // Chuyển hướng sau khi đăng ký thành công
      }
    } catch (error) {
      setServerError(error.message || "Đăng ký thất bại, vui lòng thử lại!");
    } finally {
      setIsLoading(false); // Dừng xoay tròn sau khi xử lý xong
    }
  };

  return (
    <div className="flex justify-center items-center sm:h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden h-screen w-full">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden sm:block">
          <img
            src={student}
            alt="Classroom"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="sm:w-1/2 w-full p-10 flex flex-col">
          <h2 className="text-center text-xl font-semibold mb-4">
            <span className="text-teal-600">MLPA</span> Xin chào
          </h2>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-gray-300 rounded-l-full"
            >
              Đăng nhập
            </button>
            <button className="px-6 py-2 bg-teal-400 text-white rounded-r-full">
              Đăng ký
            </button>
          </div>

          {/* Hiển thị lỗi từ server */}
          {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Lỗi!</strong> {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="w-full p-3 border rounded-lg mb-2"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}

            <label className="block mb-2 text-sm font-medium">
              Địa chỉ email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập địa chỉ email"
              className="w-full p-3 border rounded-lg mb-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <label className="block mb-2 text-sm font-medium">Mật khẩu</label>
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                className="w-full p-3 border rounded-lg appearance-none"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <label className="block mb-2 text-sm font-medium">
              Nhập lại mật khẩu
            </label>
            <div className="relative mb-2">
              <input
                type={showRetypePassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                className="w-full p-3 border rounded-lg appearance-none"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              >
                {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}

            <button
              type="submit"
              className="w-full bg-teal-400 text-white p-3 rounded-lg cursor-pointer flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading && !errors.email ? (
                <ImSpinner2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
