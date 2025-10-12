import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "/logo.png";

function Footer() {
  return (
    <footer className="bg-white/20 backdrop-blur-md text-gray-800  mt-16 border-t border-white/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and About */}
        <div className="text-left">
          <Link
            to="/"
            className="flex items-center space-x-2 mb-3 group transition duration-300"
          >
            <img
              src={Logo}
              alt="CampusFind Logo"
              className="h-10 w-auto group-hover:brightness-110 transition"
            />
            <span className="text-xl font-bold text-orange-500 transition duration-300">
              CampusFind
            </span>
          </Link>
          <p className="text-gray-700 text-sm leading-relaxed">
            CampusFind is a smart lost and found system to recover lost belongings efficiently within
            the campus.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/home" className="hover:text-orange-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/report-lost" className="hover:text-orange-600 transition">
                Report Lost Item
              </Link>
            </li>
            <li>
              <Link to="/report-found" className="hover:text-orange-600 transition">
                Report Found Item
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-orange-500" />
              <span>support@campusfind.in</span>
            </li>
            <li className="flex items-start space-x-2">
              <FaMapMarkerAlt className="text-orange-500 mt-1" />
              <span>
                GTBIT Campus, Rajouri Garden,
                <br /> New Delhi, India
              </span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">
            Connect With Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              <FaLinkedin />
            </a>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            Stay updated with our latest features and campus alerts.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white/10 border-t border-white/20 py-4 text-center text-sm text-gray-700">
        © 2025{" "}
        <span className="font-semibold text-orange-500">CampusFind</span>. All
        Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
