import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-b from-white to-orange-50 flex flex-col items-center justify-center px-6 py-16"
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Have any questions or feedback? We’d love to hear from you! Fill out
          the form below and we’ll get back to you soon.
        </p>
      </div>

      {/* Contact Form */}
      <form className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-orange-100">
        {/* Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Write your message here..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 active:scale-95 transition-all"
        >
          Send Message
        </button>
      </form>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} CampusFind. All rights reserved.
      </p>
    </section>
  );
};

export default Contact;
