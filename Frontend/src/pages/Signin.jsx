import React from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

function Signin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300">
      {/* Main Card */}
      <div className="flex w-11/12 max-w-6xl bg-white/80 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Left Illustration */}
        <div className="w-1/2 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-white/80 to-sky-50/80 relative">
          <img
            src="/signinimg.jpg"
            alt="Login Illustration"
            className="w-96 drop-shadow-2xl"
          />
          <h2 className="text-5xl font-extrabold text-gray-800 mt-10 tracking-tight">
            Welcome Back ✨
          </h2>
          <p className="text-gray-600 mt-4 text-center max-w-sm leading-relaxed text-lg">
            Sign in to your{" "}
            <span className="font-semibold text-sky-600">
              Smart Lost & Found
            </span>{" "}
            account and continue your journey with us.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 p-12 bg-gradient-to-br from-sky-50 to-sky-100">
          <h3 className="text-3xl font-bold text-sky-700 mb-8 text-center">
            Sign In
          </h3>
          <form className="space-y-6">
            
            {/* Username */}
            <div className="relative">
              <FaUser className="absolute top-4 left-4 text-sky-500" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none text-gray-700 shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-4 text-sky-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none text-gray-700 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-4 left-4 text-sky-500" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none text-gray-700 shadow-sm"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              onClick={() => (window.location.href = "http://localhost:5173/signout")}
              className="w-full bg-gradient-to-r from-sky-400 to-sky-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center justify-center">
            <span className="h-px w-1/4 bg-sky-300"></span>
            <span className="px-3 text-gray-500">or</span>
            <span className="h-px w-1/4 bg-sky-300"></span>
          </div>

          {/* Already have account */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/signout"
              className="text-sky-600 font-semibold hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;






