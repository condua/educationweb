import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import student from "../assets/student11.png";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center sm:h-screen bg-gray-100">
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
          <h2 className="text-center text-xl font-semibold">Welcome to MLPA</h2>

          {/* Tab Buttons */}
          <div className="flex justify-center my-5">
            <button className="px-6 py-2 bg-teal-400 text-white rounded-l-full">
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="px-6 py-2 bg-gray-200 rounded-r-full"
            >
              Register
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
              type="text"
              placeholder="Enter your Email"
              className="w-full p-3 border rounded-lg mt-1"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="w-full p-3 border rounded-lg mt-1 pr-10 appearance-none"
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
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <a href="#" className="text-teal-500">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-teal-400 text-white py-2 rounded-lg mt-5">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
