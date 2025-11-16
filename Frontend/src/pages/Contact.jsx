import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Contact = () => {
  return (

    <>

    <Navbar />
    <div className="bg-white text-gray-800 font-inter">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 text-white text-center py-25 px-5 md:px-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-3"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base md:text-lg max-w-xl mx-auto text-orange-50 leading-relaxed"
        >
          Have a question, feedback, or found something on campus?  
          We’d love to hear from you — let’s stay connected!
        </motion.p>

        <div className="absolute -bottom-10 left-0 right-0 h-12 bg-white rounded-t-[50%]" />
      </section>

      {/* Contact Info Section */}
      <section className="py-14 px-5 md:px-14">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: "https://cdn-icons-png.flaticon.com/512/324/324123.png",
              title: "Email Us",
              info: "support@campusfind.in",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/159/159832.png",
              title: "Call Us",
              info: "+91 98765 43210",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
              title: "Visit Us",
              info: "CampusFind HQ, Delhi University Campus",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300"
            >
              <img src={item.icon} alt={item.title} className="w-10 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-orange-600 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">{item.info}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-orange-50 py-14 px-5 md:px-14">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-md">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-orange-600 mb-6 text-center"
          >
            Get in Touch
          </motion.h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none rounded-lg px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none rounded-lg px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none rounded-lg px-4 py-2.5 text-sm resize-none"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2.5 rounded-full transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-12 text-center text-white rounded-t-[1.8rem] shadow-inner">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold mb-2"
        >
          Need Instant Support?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-xl mx-auto text-orange-100 text-[0.95rem] mb-4"
        >
          Our team is available 24/7 to help you report or find lost items in
          your campus.
        </motion.p>
        <a
          href="mailto:support@campusfind.in"
          className="bg-white text-orange-600 font-semibold px-5 py-2.5 rounded-full shadow hover:bg-orange-50 transition"
        >
          Email Now
        </a>
      </section>
    </div>

    <Footer />
    </>
  );
};

export default Contact;