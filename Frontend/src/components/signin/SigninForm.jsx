import React from "react";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import InputField from "./InputField";
import RoleDropdown from "./RoleDropdown";

function SigninForm({ role, open, setOpen, handleSelect }) {
  return (
    <div className="md:w-1/2 w-full flex flex-col md:justify-center bg-white p-8 md:p-12">
      {/* Back to Home on top */}
      <div className="flex justify-end mb-6">
        <a
          href="/"
          className="flex items-center gap-2 text-base md:text-lg font-semibold text-orange-500 hover:text-orange-600 hover:underline"
        >
          <FaArrowLeft className="text-orange-500" />
          Back to Home
        </a>
      </div>

      {/* Sign In with line to the right */}
      <div className="mb-8 flex items-center">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-600 mr-4">
          Sign In
        </h3>
        <div className="flex-grow h-1 bg-orange-200"></div>
      </div>

      <form className="space-y-4 md:space-y-6">
        {/* Role Dropdown */}
        <RoleDropdown
          role={role}
          open={open}
          setOpen={setOpen}
          handleSelect={handleSelect}
        />

        {/* Email (hide for Admin) */}
        {role !== "Admin" && (
          <InputField icon={FaEnvelope} type="email" placeholder="Email" />
        )}

        {/* Password */}
        <InputField icon={FaLock} type="password" placeholder="Password" />

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
      <div className="my-4 md:my-6 flex items-center justify-center">
        <span className="h-px flex-1 bg-orange-200"></span>
        <span className="px-2 md:px-3 text-gray-500 text-sm md:text-base">
          or
        </span>
        <span className="h-px flex-1 bg-orange-200"></span>
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
  );
}

export default SigninForm;
