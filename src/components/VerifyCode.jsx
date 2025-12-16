// src/components/VerifyCode.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";

// Giả sử bạn vẫn dùng ảnh cũ, hoặc bạn có thể thay bằng ảnh vector/illustration
import studentImage from "../assets/student11.png";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // State cho 6 ô input
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]); // Ref để điều khiển focus các ô input
  const [loading, setLoading] = useState(false);

  // State cho bộ đếm ngược gửi lại mã
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Redirect nếu không có email
  useEffect(() => {
    if (!email) {
      navigate("/forget-password");
    }
  }, [email, navigate]);

  // Logic bộ đếm ngược
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Xử lý khi nhập liệu vào các ô OTP
  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return; // Chỉ cho phép nhập số

    const newOtp = [...otp];
    // Lấy ký tự cuối cùng (trường hợp người dùng gõ nhanh đè lên số cũ)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Tự động focus sang ô tiếp theo nếu có giá trị
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Xử lý nút Backspace để lùi ô
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Nếu ô hiện tại rỗng và nhấn Backspace, lùi về ô trước
      inputRefs.current[index - 1].focus();
    }
  };

  // Xử lý Paste (dán mã)
  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(data)) return; // Chỉ chấp nhận chuỗi 6 số

    const newOtp = data.split("");
    setOtp(newOtp);
    inputRefs.current[5].focus(); // Focus vào ô cuối cùng
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) {
      alert("Vui lòng nhập đủ 6 số xác thực.");
      return;
    }
    setLoading(true);

    // Giả lập API
    setTimeout(() => {
      console.log("Verifying code:", code, "for email:", email);
      setLoading(false);
      navigate("/reset-password", { state: { email: email, code: code } });
    }, 1500);
  };

  const handleResend = (e) => {
    e.preventDefault();
    if (!canResend) return;

    // Logic gửi lại mã ở đây
    alert(`Đã gửi lại mã mới đến ${email}`);
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-3xl flex w-full max-w-4xl overflow-hidden relative">
        {/* Nút Back Mobile Only */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 md:hidden z-10"
        >
          <IoIosArrowBack size={24} />
        </button>

        {/* Left Side - Image (Decor) */}

        <div className="w-1/2 hidden md:block relative">
          <img
            src={studentImage}
            alt="Verify Code"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                Nhập mã xác thực
              </h2>
              <p className="text-gray-500 text-sm">
                Mã 6 số đã được gửi đến email: <br />
                <span className="font-semibold text-teal-600 text-base">
                  {email}
                </span>
              </p>
            </div>

            {/* OTP Inputs Grid */}
            <div
              className="flex justify-between gap-2 mb-8"
              onPaste={handlePaste}
            >
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-10 h-12 sm:w-12 sm:h-14 border border-gray-300 rounded-xl text-center text-xl sm:text-2xl font-bold text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all shadow-sm bg-gray-50 focus:bg-white focus:-translate-y-1"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otp.join("").length < 6}
              className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center
                ${
                  loading || otp.join("").length < 6
                    ? "bg-gray-300 cursor-not-allowed shadow-none"
                    : "bg-teal-500 hover:bg-teal-600 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0"
                }
              `}
            >
              {loading && <ImSpinner2 className="animate-spin mr-2" />}
              {loading ? "Đang xác thực..." : "Xác nhận"}
            </button>

            <div className="text-center mt-8 space-y-2">
              <p className="text-gray-500 text-sm">Không nhận được mã?</p>

              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors"
                >
                  Gửi lại mã mới
                </button>
              ) : (
                <span className="text-gray-400 font-medium cursor-not-allowed">
                  Gửi lại sau {timer}s
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
