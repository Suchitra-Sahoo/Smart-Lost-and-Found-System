import { useState } from "react";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signin Data:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-lg p-8 shadow-2xl border border-gray-200">
        {/* Title */}
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="mb-6 text-center text-gray-500">
          Sign in to continue to{" "}
          <span className="font-semibold text-gray-700">Smart Lost & Found</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-gray-700 focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-sm text-gray-700 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-800 py-3 text-white font-semibold shadow-md hover:bg-black transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="font-semibold text-gray-800 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;

