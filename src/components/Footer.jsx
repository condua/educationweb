import React from "react";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import logo from "/logo.png";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="sm:w-1/2 mb-0 md:mb-0 flex flex-col items-center">
            <img className="w-24 h-18 my-2 md:block hidden" src={logo} />
            <p className="text-sm text-gray-400 text-center sm:text-left">
              Copyright © {new Date().getFullYear()} All rights reserved
              <br /> Made by Phan Hoàng Phúc
            </p>
          </div>
          <div className="w-full border-1 border-solid md:hidden my-2" />
          <div className="flex flex-row justify-center gap-x-2 w-full items-center">
            <img className="w-20 h-15 my-2 md:hidden" src={logo} />
            <div className="flex flex-col text-xs md:text-lg gap-y-1.5">
              <p>Liên hệ</p>
              <p className="flex gap-1 items-center">
                <motion.div
                  animate={{ rotate: [-10, 0, 10, 0], x: [-2, 0, 2] }} // Xoay 20 độ sang phải và trở lại, kết hợp lắc nhẹ
                  transition={{
                    repeat: Infinity,
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <FaPhone color="red" />
                </motion.div>
                <a href="tel:0399915548" className="text-white hover:underline">
                  Số điện thoại: 0399915548
                </a>
              </p>
              <p className="flex gap-1 items-center">
                <FaEnvelope color="white" />{" "}
                <a
                  href="mailto:phanhoangphuc0311@gmail.com"
                  className="text-white hover:underline"
                >
                  Email: phanhoangphuc0311@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="w-full border-1 border-solid md:hidden my-2" />

          <div className="flex text-xs md:text-lg space-x-2 md:space-x-6 md:mb-0 mb-4">
            <a
              href="https://web.facebook.com/profile.php?id=61574532009854"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <FaFacebook size={20} /> Facebook
            </a>
            <a
              href="https://www.youtube.com/@tonyphan34"
              className="flex items-center gap-2 hover:text-red-500"
            >
              <FaYoutube size={20} /> Youtube
            </a>
            <a
              href="https://www.linkedin.com/company/50290243"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaLinkedin size={20} /> LinkedIn
            </a>
            <a
              href="https://www.tiktok.com/@mlpaedutech"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <FaTiktok size={20} /> TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
