import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaBuilding, FaIdCard } from "react-icons/fa";
import InputField from "./InputField";
import RoleDropdown from "./RoleDropdown";
import { signup } from "../../api/auth"; // Later: replace with login API

function SigninForm({ role, open, setOpen, handleSelect }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { email, password, role: role.toLowerCase() };
      const res = await signup(payload); // TODO: replace with login API
      alert("Signin successful!");
      window.location.href = "/";
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-1/2 w-full flex flex-col md:justify-center bg-white p-8 md:p-12 text-lg">
      {/* Heading */}
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
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2.5 md:py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
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


