import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="mb-0 md:mb-0">
            <h3 className="text-xl font-bold">MLPA</h3>
            <p className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} All rights reserved
              <br /> Made by Phan Hoang Phuc
            </p>
          </div>
          <div className="flex space-x-6 md:mb-0 mb-4">
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
