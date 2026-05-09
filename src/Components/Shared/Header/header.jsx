import React, { useState } from "react";
import logo from "../../../assets/hero.png";
import { FaFacebookF, FaSearch, FaCartPlus } from "react-icons/fa";
import { IoIosMenu, IoMdClose } from "react-icons/io";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "Home",
    "About",
    "Contact",
    "Blog",
    "Services",
    "Success Stories",
  ];

  return (
    <header className="shadow-2xl bg-white">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <img className="w-20" src={logo} alt="Logo" />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-12">
            {/* Navigation */}
            <nav className="flex items-center gap-8 text-gray-700 font-medium">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-blue-600 transition duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-8">
              {/* Join Us Button */}
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300">
                <FaFacebookF />
                <span>Join Us</span>
              </button>

              {/* Icons */}
              <div className="flex items-center gap-4 text-xl text-gray-700">
                <button className="hover:text-blue-600 transition duration-300">
                  <FaSearch />
                </button>
                <button className="hover:text-blue-600 transition duration-300">
                  <FaCartPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Right Side */}
          <div className="lg:hidden flex items-center gap-4">
            <button className="text-xl text-gray-700">
              <FaSearch />
            </button>

            <button className="text-xl text-gray-700">
              <FaCartPlus />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl text-gray-700"
            >
              {menuOpen ? <IoMdClose /> : <IoIosMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4 pt-4 text-gray-700 font-medium">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-blue-600 transition duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Join Us Button */}
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300">
              <FaFacebookF />
              <span>Join Us</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;