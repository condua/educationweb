import React from "react";
// Ví dụ import icon (nếu cần)
import { AiOutlinePlayCircle } from "react-icons/ai";
// Giả sử bạn có ảnh cô gái cầm sách
import StudentImg from "../assets/student11.png"; // Thay đường dẫn thực tế
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="relative bg-[#E5F3F3] md:pb-80 pb-30 overflow-hidden"
      // Màu nền teal nhạt, bạn có thể đổi sang màu #E7F9FA hoặc #F0FCFC tuỳ ý
    >
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center py-12 px-4 md:px-0">
        {/* Left side: Text & CTA */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Học trực tuyến <br />
            <span className="text-teal-600 md:text-5xl text-2xl">
              dễ dàng hơn với MLPA
            </span>
          </h1>
          <p className="text-gray-600 mb-6 max-w-md">
            MLPA là nền tảng giáo dục và công nghệ trực tuyến, đem đến những bài
            học và giải pháp công nghệ phù hợp cho mọi người
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                navigate("/courses");
              }}
              className="bg-teal-600 text-white px-5 py-3 rounded hover:bg-teal-700 transition cursor-pointer"
            >
              Tham gia ngay
            </button>
            <button
              onClick={() => {
                navigate("/courses");
              }}
              className="flex items-center text-teal-600 hover:text-teal-800 font-medium cursor-pointer"
            >
              <AiOutlinePlayCircle className="text-2xl mr-2" />
              Xem hướng dẫn
            </button>
          </div>
        </div>

        {/* Right side: Image + Floating cards */}
        <div className="md:w-1/2 flex justify-center relative">
          <img
            src={StudentImg}
            alt="Student"
            className="max-w-84 md:max-w-full"
          />

          {/* Floating Card #1 (Ví dụ: 250k Assisted Student) */}
          <div className="absolute top-8 left-0 md:left-[-60px] bg-white/80 shadow-md rounded-xl p-4 md:w-40 text-center">
            <p className="text-gray-600 text-sm">100+</p>
            <p className="text-gray-800 font-semibold text-sm">Học viên</p>
          </div>

          {/* Floating Card #2 (Ví dụ: User Experience Class) */}
          <div className="absolute bottom-16 right-0 md:right-[-60px] bg-white/80 shadow-md rounded-xl p-4 md:w-44 text-center">
            <p className="text-gray-700 font-medium text-sm mb-1">
              Đội ngũ xuất sắc
            </p>
            <p className="text-xs text-gray-500 mb-2">Nhiều năm kinh nghiệm</p>
            <button
              onClick={() => {
                navigate("/courses");
              }}
              className="text-xs bg-teal-600 text-white md:px-3 px-2 md:py-2 py-1 rounded cursor-pointer"
            >
              Xem ngay
            </button>
          </div>

          {/* Floating Card #3 (Ví dụ: Congratulations) */}
          <div className="absolute top-3/4 right-3/4 transform translate-x-1/2 -translate-y-1/2 bg-white/80 shadow-md rounded-xl p-4 w-40 md:w-44 text-center md:block">
            <p className="text-gray-700 font-medium text-sm mb-1">
              Khóa học hấp dẫn
            </p>
            <button
              onClick={() => {
                navigate("/courses");
              }}
              className="text-xs bg-teal-600 text-white md:px-3 px-2 md:py-2 py-1 rounded text-center cursor-pointer"
            >
              Tham gia ngay
            </button>
          </div>
        </div>
      </div>

      {/* Nếu muốn thêm hình nền dạng “wave” phía dưới, bạn có thể dùng SVG hoặc background-image */}
      {/* Ví dụ SVG wave (minh hoạ) */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#fff"
          d="M0,64L80,85.3C160,107,320,149,480,154.7C640,160,800,128,960,122.7C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

export default Hero;
