import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Topheader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-800">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile: only social icons */}
        {/* Desktop (md and above): social icons + navigation links */}
        <div className="flex justify-center md:justify-between items-center">
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-lg">
            <a href="#" className="hover:text-blue-700 transition duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-red-600 transition duration-300">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-pink-600 transition duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-600 transition duration-300">
              <FaTwitter />
            </a>
          </div>

          {/* Navigation Links - Hidden on mobile, shown from md and above */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="hover:text-blue-700 transition duration-300">
              About Us
            </a>
            <a href="#" className="hover:text-blue-700 transition duration-300">
              Contact Us
            </a>
            <a href="#" className="hover:text-blue-700 transition duration-300">
              Success Stories
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topheader;