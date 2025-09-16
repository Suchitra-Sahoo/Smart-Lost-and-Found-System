import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import signinImg from "../assets/signin/signin.png";
import signinImg1 from "../assets/signin/signin1.png";
import signinImg2 from "../assets/signin/signin2.png";

function Signin() {
  const images = [signinImg, signinImg1, signinImg2];
  const [currentImage, setCurrentImage] = useState(0);

  // Dropdown states
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (value) => {
    setRole(value);
    setOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Illustration */}
      <div
        className="hidden md:flex md:w-1/2 flex-col items-center justify-center 
  bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-800 p-8 md:p-12 -3xl shadow-xl relative"
      >
        {/* Illustration wrapper with light background */}
        <div className="w-96 md:w-[28rem] h-96 md:h-[28rem] relative  backdrop-blur-md rounded-2xl  flex items-center justify-center">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Signin Illustration ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <h2
          className="text-4xl md:text-5xl font-extrabold mt-8 md:mt-10 
               tracking-tight text-center text-orange-600 drop-shadow-lg"
        >
          Welcome Back
        </h2>

        <p className="mt-4 text-center max-w-sm leading-relaxed text-base md:text-lg text-gray-700">
          Sign in to your{" "}
          <span className="font-semibold text-orange-600">
            Smart Lost & Found
          </span>{" "}
          account and continue your journey with us.
        </p>
      </div>

      {/* Right Side - Form */}
      {/* Right Side - Form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center bg-white p-8 md:p-12 shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-600 mb-6 md:mb-8 text-center">
          Sign In
        </h3>

        <form className="space-y-4 md:space-y-6">
          {/* Role Dropdown */}
          <div className="relative">
            <FaUser className="absolute top-3 md:top-4 left-3 md:left-4 text-orange-500" />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-orange-300 
                   focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 shadow-sm 
                   text-sm md:text-base bg-orange-50 hover:bg-orange-100 flex items-center"
            >
              <span className="flex-1 text-left">
                {role ? role : "Select Role"}
              </span>
            </button>
            {open && (
              <ul className="absolute z-10 w-full text-gray-700 pt-1 bg-white rounded-xl shadow-md border border-orange-200 mt-1">
                {["Student", "Staff", "Admin"].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="w-full text-left px-4 py-2 hover:bg-orange-100"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Email - hide if Admin */}
          {role !== "Admin" && (
            <div className="relative">
              <FaEnvelope className="absolute top-3 md:top-4 left-3 md:left-4 text-orange-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-orange-300 
                     focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 shadow-sm 
                     text-sm md:text-base bg-orange-50 hover:bg-orange-100"
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 md:top-4 left-3 md:left-4 text-orange-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-orange-300 
                   focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 shadow-sm 
                   text-sm md:text-base bg-orange-50 hover:bg-orange-100"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-orange-600 text-sm md:text-base font-medium hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "http://localhost:5173/dashboard";
            }}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 
                 text-white py-2.5 md:py-3 rounded-xl font-semibold shadow-lg 
                 hover:scale-105 transition-transform duration-300 text-sm md:text-base"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 md:my-6 hidden md:flex items-center justify-center">
          <span className="h-px w-1/4 bg-orange-200"></span>
          <span className="px-2 md:px-3 text-gray-500 text-sm md:text-base">
            or
          </span>
          <span className="h-px w-1/4 bg-orange-200"></span>
        </div>

        {/* Redirect to Signup */}
        <p className="text-center text-gray-600 text-sm md:text-base">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-orange-600 font-semibold hover:underline"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
