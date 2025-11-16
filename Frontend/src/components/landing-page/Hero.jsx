import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const arrowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 1 } },
  };

  return (
    <section className="relative flex items-center justify-center text-center overflow-hidden bg-black py-28">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "#000000",
          backgroundImage: `
            linear-gradient(-90deg, transparent calc(5em - 1px), rgba(255,255,255,0.07) 1px, rgba(255,255,255,0.07) 5em),
            linear-gradient(0deg, transparent calc(5em - 1px), rgba(255,255,255,0.07) 1px, rgba(255,255,255,0.07) 5em)
          `,
          backgroundSize: "5em 5em",
        }}
      ></div>

      {/* Decorative orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-16"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]">
          CampusFind
          <br />
          <span className="text-orange-400">Lost and Found Portal</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10 mt-4">
          Report lost or found items instantly. Stay connected and help make
          your campus safer with{" "}
          <span className="font-semibold text-orange-400">CampusFind</span>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:shadow-[0_0_15px_rgba(255,140,0,0.9)] hover:bg-orange-700 transition-all duration-300"
          >
            Get Started
          </Link>
          <a
            href="#learn-more"
            className="px-6 py-3 border-2 border-orange-600 text-orange-400 font-semibold rounded-full hover:text-white hover:border-white transition-all duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Bouncing arrow */}
        <motion.div
          className="mt-12 animate-bounce"
          initial="hidden"
          animate="visible"
          variants={arrowVariants}
        >
          <button
            onClick={() => {
              const featuresSection = document.getElementById("features");
              if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-orange-400 hover:text-orange-200 cursor-pointer"
          >
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
