import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import student from "../assets/student11.png";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const navigate = useNavigate();
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
            Welcome to MLPA
          </h2>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="px-6 py-2 bg-gray-300 rounded-l-full"
            >
              Login
            </button>
            <button className="px-6 py-2 bg-teal-400 text-white rounded-r-full">
              Register
            </button>
          </div>
          {/* <p className="text-gray-500 text-sm text-center mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p> */}
          <form>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="w-full p-3 border rounded-lg mb-4"
            />

            <label className="block mb-2 text-sm font-medium">Password</label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="w-full p-3 border rounded-lg appearance-none"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label className="block mb-2 text-sm font-medium">
              Retype Password
            </label>
            <div className="relative mb-4">
              <input
                type={showRetypePassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="w-full p-3 border rounded-lg appearance-none"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              >
                {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="w-full bg-teal-400 text-white p-3 rounded-lg">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
