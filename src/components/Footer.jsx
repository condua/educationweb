import React from "react";

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
            <a href="#" className="hover:text-teal-500">
              Facebook
            </a>
            <a href="#" className="hover:text-teal-500">
              Youtube
            </a>
            <a href="#" className="hover:text-teal-500">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
