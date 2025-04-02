import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";
import logo from "/logo.png";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="mb-0 md:mb-0 flex flex-col items-center">
            <img className="w-24 h-18 my-2" src={logo} />
            <p className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} All rights reserved
              <br /> Made by Phan Hoang Phuc
            </p>
          </div>
          <div className="w-full border-1 border-solid md:hidden my-2" />
          <div className="flex flex-col text-sm md:text-lg">
            <p>Liên hệ</p>
            <p className="">📞 Số điện thoại: 0399915548</p>
            <p>✉️ Email: phanhoangphuc0311@gmail.com</p>
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
