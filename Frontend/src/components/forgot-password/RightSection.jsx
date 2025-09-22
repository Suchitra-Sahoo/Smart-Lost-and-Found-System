import React, { useState } from "react";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { forgotPassword } from "../../api/auth"; 
function RightSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success("Check your email for the reset link!");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      console.error("Forgot password error:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:justify-center bg-white p-8 md:p-12 text-lg">
      {/* Back to Home */}
      <div className="flex justify-end mb-6 hover:underline text-xl font-semibold">
        <a href="/" className="flex items-center gap-2 text-orange-500">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      {/* Heading */}
      <div className="mb-8 flex items-center">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-600 mr-4">
          Reset Password
        </h3>
        <div className="flex-grow h-1 bg-orange-200"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Icon */}
        <div className="mb-4 p-4 border rounded-full border-gray-300">
          <FaEnvelope className="text-gray-700 text-xl" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Forgot Password?</h1>

        {/* Subtext */}
        <p className="mb-6 text-gray-600 text-center">
          Don’t worry, we will send you reset instructions.
        </p>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <label className="text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default RightSection;
