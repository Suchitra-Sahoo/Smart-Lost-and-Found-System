import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "./About.css";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-6">
        <div className="max-w-5xl w-full text-center">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6">
            About <span className="text-gray-800">CampusFind</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            <strong>CampusFind</strong> is a smart Lost & Found system built to
            make your campus life easier and more connected. Whether you’ve
            misplaced your belongings or discovered something lost, our platform
            bridges the gap — helping items find their way back to their
            rightful owners quickly and securely.
          </p>

          {/* Mission Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">
              Our Mission 🎯
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To create a reliable and easy-to-use digital platform that
              encourages honesty, responsibility, and a sense of community
              across campuses — making lost items a thing of the past.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">
              Our Vision 👁️
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a future where every college and university uses smart
              technology to ensure no item remains lost, and every person feels
              connected through responsible sharing.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-orange-500 mb-6">
              Key Features ⚡
            </h2>
            <ul className="text-gray-700 text-left space-y-3 max-w-md mx-auto">
              <li>🧾 Simple lost/found item reporting</li>
              <li>🔍 Smart item matching and instant notifications</li>
              <li>📸 Upload images for faster recognition</li>
              <li>📍 Campus-specific categorization for easy search</li>
              <li>🔒 Secure, user-friendly, and reliable design</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
