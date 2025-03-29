import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { ImSpinner2 } from "react-icons/im"; // Import icon xoay tròn
import { fetchUser } from "../redux/userSlice";
import student from "../assets/student11.png";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Lấy trạng thái từ Redux

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(fetchUser("me")); // Fetch lại thông tin user ngay lập tức
        navigate("/"); // Chuyển hướng sau khi đăng nhập
      })
      .catch(() => {
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl flex h-screen w-full overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden sm:block">
          <img
            src={student} // Cập nhật đường dẫn ảnh
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="sm:w-1/2 w-full p-10 flex flex-col">
          <h2 className="text-center text-xl font-semibold">
            <span className="text-teal-600">MLPA</span> Xin chào
          </h2>

          {/* Tab Buttons */}
          <div className="flex justify-center my-5">
            <button className="px-6 py-2 bg-teal-400 text-white rounded-l-full">
              Đăng nhập
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="px-6 py-2 bg-gray-200 rounded-r-full"
            >
              Đăng ký
            </button>
          </div>
          {/* 
          <p className="text-center text-gray-500 mb-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p> */}

          {/* Input Fields */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-3 border rounded-lg mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="w-full p-3 border rounded-lg mt-1 pr-10 appearance-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>{" "}
            </div>
          </div>

          {/* Options */}
          <div className="flex justify-between items-center mt-3 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" /> Nhớ tài khoản
            </label>
            <a href="#" className="text-teal-500">
              Quên mật khẩu ?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-teal-400 text-white py-2 rounded-lg mt-5 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin mr-2" /> : null}
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
