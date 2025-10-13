import React, { useState } from "react";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import InputField from "./InputField";
import RoleDropdown from "./RoleDropdown";
import { signin } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SigninForm({ role, open, setOpen, handleSelect }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = { role: role.toLowerCase(), email: email.trim(), password };
      const res = await signin(data);

      // Store token
      localStorage.setItem("token", res.token);

      // Show success toast
      toast.success("Signin successful!");

      // Delay redirect so toast is visible
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-1/2 w-full flex flex-col md:justify-center bg-white p-8 md:p-12 text-lg">
      <div className="flex justify-end mb-6 hover:underline text-xl font-semibold">
        <a href="/" className="flex items-center gap-2 text-orange-500">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      <div className="mb-8 flex items-center">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-600 mr-4">
          Sign In
        </h3>
        <div className="flex-grow h-1 bg-orange-200"></div>
      </div>

      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <RoleDropdown role={role} open={open} setOpen={setOpen} handleSelect={handleSelect} />

        <InputField
          icon={FaEnvelope}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          icon={FaLock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2.5 md:py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-gray-600 text-sm md:text-base mt-6">
        Don’t have an account?{" "}
        <a href="/signup" className="text-orange-600 font-semibold hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}

export default SigninForm;


