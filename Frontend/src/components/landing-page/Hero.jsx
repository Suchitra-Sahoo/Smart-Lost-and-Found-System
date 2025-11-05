import React from "react";
import { Link } from "react-router-dom";
import illustration1 from "../../assets/Landing Page/illustration1.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 py-20 md:py-28">
      {/* Decorative orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Content aligned with navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Left Text + Image for mobile */}
          <div className="text-center lg:text-left max-w-xl flex flex-col">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-600 leading-tight mb-6 drop-shadow-sm">
              Smart Lost & Found <br />
              <span className="text-gray-800">for Your Campus</span>
            </h1>

            {/* Illustration for mobile (order first on mobile) */}
            <div className="lg:hidden mb-6">
              <img
                src={illustration1}
                alt="CampusFind Illustration"
                className="rounded-3xl w-full"
              />
            </div>

            {/* Paragraph */}
            <p className="text-gray-700 text-lg md:text-xl mb-8">
              Report lost or found items instantly. Stay connected and help make
              your campus safer with{" "}
              <span className="font-semibold text-orange-600">CampusFind</span>.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition-all duration-300"
              >
                Get Started
              </Link>
              <a
                href="#learn-more"
                className="px-6 py-3 border-2 border-orange-500 text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Illustration (desktop only) */}
          <div className="relative w-full max-w-lg hidden lg:flex items-center justify-center mt-0 lg:mt-0">
            <img
              src={illustration1}
              alt="CampusFind Illustration"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
