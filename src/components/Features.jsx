import { FaCheckCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import edubackground from "/edubackground.jpg";
import technology from "/technology.jpg";
import whiteboard from "/whiteboard.jpg";
import solution from "/solution.jpg";
import CountUp from "react-countup";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
const fadeInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};
const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15, // Khi phần tử **đến 40% khung nhìn** thì hiện
  });
  const navigate = useNavigate();
  const [startCounting, setStartCounting] = useState(false);

  const logos = [
    {
      id: 1,
      imgUrl: "/images/universities/bk.png",
    },
    {
      id: 2,
      imgUrl: "/images/universities/dhkt.png",
    },
    {
      id: 3,
      imgUrl: "/images/universities/dhqg.png",
    },
    {
      id: 4,
      imgUrl: "/images/universities/iu.png",
    },
    {
      id: 5,
      imgUrl: "/images/universities/khoay.png",
    },
    {
      id: 6,
      imgUrl: "/images/universities/khtn.png",
    },
    {
      id: 7,
      imgUrl: "/images/universities/uel.png",
    },
    {
      id: 8,
      imgUrl: "/images/universities/uit.png",
    },
    {
      id: 9,
      imgUrl: "/images/universities/ussh.png",
    },
  ];
  const data = [
    { value: 1000, suffix: "+", label: "Học sinh" },
    { value: 100, suffix: "%", label: "Hoàn thành xuất sắc" },
    { value: 100, suffix: "%", label: "Giải đáp thắc mắc" },
    { value: 3, suffix: "+", label: "Chuyên gia" },
    { value: 5, suffix: "+", label: "Năm kinh nghiệm" },
  ];

  const logoWidth = 100; // Chiều rộng mỗi logo (px)
  const gap = 20; // Khoảng cách giữa các logo (px)
  const totalWidth = (logoWidth + gap) * logos.length; // Tổng chiều rộng 1 lượt logo

  return (
    <section ref={ref} className="text-center pb-12 px-6 bg-white sm:-mt-20">
      <div className="w-full flex flex-col items-center">
        <motion.img
          className="sm:w-70 sm:h-50 w-45 h-30"
          src="/images/number1.png"
          alt="Number 1"
          // Animate: di chuyển trục Y [0, -20, 0], lặp vô hạn
          animate={{ y: [0, -20, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
        {/* 🎬 Thanh logo cuộn ngang liên tục */}
        <div className="sm:w-4/5 w-full overflow-hidden relative flex items-center py-5">
          <motion.div
            className="flex gap-5"
            animate={{ x: [-totalWidth, 0] }} // Dịch từ phải qua trái
            transition={{
              repeat: Infinity,
              duration: 10, // Tốc độ di chuyển
              ease: "linear",
            }}
          >
            {/* 🔄 Nhân đôi danh sách logo để tạo hiệu ứng liền mạch */}
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={i}
                className="sm:w-[150px] sm:h-[150px] w-[80px] h-[80px] object-contain"
                src={logo.imgUrl}
                alt={`Logo ${logo.id}`}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            ))}
          </motion.div>
        </div>
      </div>
      <motion.h2
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInLeft}
        className="text-2xl font-bold text-gray-800"
      >
        Những điểm nổi bật
      </motion.h2>
      {/* <p className="text-gray-600 max-w-xl mx-auto mt-2">
        Ormanei si forens interdum porttitor nulla turpis elitom. Diam vitae
        sollicitudin ut nec nam et pharetra gravida.
      </p> */}

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInLeft}
        onAnimationComplete={() => setStartCounting(true)} // 🔥 kích hoạt đếm sau khi animation hoàn tất
        className="flex justify-around flex-wrap gap-6 mt-8"
      >
        {data.map((item, index) => (
          <motion.div key={index} variants={fadeInLeft} className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
              {startCounting ? (
                <CountUp end={item.value} duration={3} suffix={item.suffix} />
              ) : (
                "0" + item.suffix // Hiện 0 trước khi đếm
              )}
            </p>
            <p className="text-gray-600">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.h3
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInLeft}
        className="text-xl font-semibold text-gray-800 mt-10"
      >
        Chỉ có tại <span className="text-blue-500">MLAP.</span>
      </motion.h3>
      <motion.p
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInLeft}
        className="text-gray-600 max-w-2xl mx-auto mt-2"
      >
        MLPA là nền tảng tiên phong trong lĩnh vực giáo dục và công nghệ hàng
        đầu tại Việt Nam
      </motion.p>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInLeft}
        className="grid md:grid-cols-3 gap-6 mt-10"
      >
        <div className="p-6 bg-gray-100 rounded-lg text-center">
          <div className="text-blue-500 text-5xl">📄</div>

          <h4 className="text-lg font-semibold mt-4">
            Hóa đơn, Thanh toán & Hợp đồng Trực tuyến{" "}
          </h4>
          <p className="text-gray-600 mt-2">
            Kiểm soát tài chính doanh nghiệp dễ dàng và an toàn hơn bao giờ hết!
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg text-center flex flex-col items-center">
          {/* <div className="text-green-500 text-4xl">📅</div> */}
          <div className="w-13 h-13 bg-white rounded-lg shadow-lg  border-gray-300 text-center">
            {/* Phần tiêu đề màu đỏ */}
            <div className="bg-red-500 text-white text-xs font-bold py-1 rounded-t-lg relative">
              <span>
                {new Date().toLocaleString("vi-VN", { month: "long" })}
              </span>
              <div className="absolute top-0 left-1 w-1 h-1 bg-gray-100 rounded-full border"></div>
              <div className="absolute top-0 right-1 w-1 h-1 bg-gray-100 rounded-full border"></div>
            </div>

            {/* Phần số ngày */}
            <div className="flex items-center justify-center  text-black font-bold text-xm">
              {new Date().toLocaleString("vi-VN", { day: "numeric" })}
            </div>
          </div>
          <h4 className="text-lg font-semibold mt-4">
            Lên lịch & Theo dõi điểm danh dễ dàng{" "}
          </h4>
          <p className="text-gray-600 mt-2">
            Sắp xếp và đặt trước phòng học chỉ trong vài cú nhấp chuột, dù ở một
            hay nhiều cơ sở.
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg text-center">
          <div className="text-blue-500 text-5xl">👥</div>
          <h4 className="text-lg font-semibold mt-4">
            Quản lý khách hàng thông minh
          </h4>
          <p className="text-gray-600 mt-2">
            Tự động hóa và theo dõi email gửi đến từng cá nhân hoặc nhóm một
            cách hiệu quả.
          </p>
        </div>
      </motion.div>
      {/* Additional Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900">
          Những trải nghiệm tại <span className="text-teal-500">MLPA</span>
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto mt-2">
          MLPA là một nền tảng cho phép giảng viên tạo lớp học trực tuyến, lưu
          trữ tài liệu, quản lý bài tập, theo dõi thời hạn nộp bài và nhiều tính
          năng khác.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-8 ">
          <div className="relative rounded-lg group hover:-translate-y-2 duration-400 hover:shadow-2xl hover:shadow-black">
            <img
              src={technology}
              alt="Instructor"
              className="w-full rounded-lg z-20"
            />
            <div className="absolute inset-0 bg-gray-900/50 flex flex-col justify-center items-center rounded-lg">
              <p className="text-white text-lg font-bold">
                Giải pháp công nghệ
              </p>
              <button className="mt-2 px-4 py-2 border border-white text-white rounded-full cursor-pointer hover:bg-white hover:text-black duration-500 hover:shadow-black hover:shadow-2xl">
                Tìm hiểu ngay
              </button>
            </div>
          </div>
          <div className="relative rounded-lg group hover:-translate-y-2 duration-400 hover:shadow-2xl hover:shadow-black">
            <img
              src={edubackground}
              alt="Students"
              className="w-full rounded-lg"
            />
            <div className="absolute inset-0 bg-gray-900/50 flex flex-col justify-center items-center rounded-lg">
              <p className="text-white text-lg font-bold">Dành cho học viên</p>
              <button
                onClick={() => {
                  navigate("/courses");
                }}
                className="mt-2 px-4 py-2 bg-blue-400 text-white rounded-full cursor-pointer hover:bg-blue-500 duration-500"
              >
                Tham gia ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-green-600 py-12">
        Tính năng nổi bật
      </h2>
      {/* <p className="text-gray-600 mt-2">
        This very extraordinary feature can make learning activities more
        efficient
      </p> */}

      {/* Feature Section */}
      <div className="grid sm:grid-cols-2 gap-10 items-center">
        {/* Left Side: Image */}
        <div className="relative w-full hover:shadow-2xl hover:-translate-y-2 duration-300">
          <img
            src={whiteboard}
            alt="Classroom UI"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side: Text Content */}
        <div>
          <h3 className="text-xl font-semibold text-blue-900 md:pr-10 pr-0">
            Một <span className="text-green-500">giao diện người dùng</span>{" "}
            được thiết kế thân thiện với học sinh/sinh viên
          </h3>
          <ul className="mt-4 space-y-3 text-gray-600 text-left">
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 mt-1 mr-2" />
              Giảng viên có trình độ, tốt nghiệp từ các trường đại học danh
              tiếng
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 mt-1 mr-2" />
              Giao diện dễ nhìn, việc học tập theo từng chương rất thuận lợi
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 mt-1 mr-2" />
              Được cung cấp các tài liệu và bài tập điện tử theo từng bài học
            </li>
          </ul>
        </div>
      </div>

      {/* Second Feature Section */}
      <div className="sm:grid flex flex-col-reverse grid-cols-2 gap-10 items-center mt-16">
        {/* Left Side: Text Content */}
        <div>
          <h3 className="text-xl font-semibold text-blue-900">
            <span className="text-green-500">Cung cấp</span> giải pháp công nghệ
            cho mọi người
          </h3>
          <p className="mt-4 text-gray-600">
            Hỗ trợ khách hàng hoàn thiện và xây dựng những giải pháp kinh doanh
            trực tuyển một cách thuận tiện và dễ dàng
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="relative w-full hover:shadow-2xl hover:-translate-y-2 duration-300">
          <img
            src={solution}
            alt="Teacher and Student"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-left flex flex-col items-start">
      <img src={image} alt={title} className="w-full rounded-lg mb-4" />
      <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};
export default Features;
