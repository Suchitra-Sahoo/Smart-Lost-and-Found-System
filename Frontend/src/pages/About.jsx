import React, { use } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();
  return (


    <>

    <Navbar />
    <div className="bg-white text-gray-800 font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 text-white text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          About CampusFind
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-orange-50 leading-relaxed"
        >
          A modern lost & found platform that helps students and staff connect,
          report, and recover lost items — all within your campus.
        </motion.p>

        <div className="absolute -bottom-12 left-0 right-0 h-16 bg-white rounded-t-[50%]" />
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-[1.05rem] leading-relaxed">
              CampusFind was built to eliminate the stress of losing belongings
              on campus. Whether you’ve lost your student ID or found someone’s
              notebook, our platform bridges the gap — helping items return to
              their rightful owners faster and easier than ever before.
            </p>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            src="https://cdn.dribbble.com/userupload/10760993/file/original-54a63dca9c1b945c038196681fa4a689.png?resize=1200x900"
            alt="Campus community"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-orange-50 py-20 px-6 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-14">
          How CampusFind Works
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Report Lost Item",
              icon: "https://cdn-icons-png.flaticon.com/512/9271/9271912.png",
              desc: "Submit details of your lost item with an image and description. Our community will help you locate it.",
              link: "/report-lost-item",
            },
            {
              title: "List Found Item",
              icon: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
              desc: "Found something on campus? Upload it easily to help the owner identify and claim it.",
              link: "/report-found-item",
            },
            {
              title: "Connect & Return",
              icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
              desc: "Once verified, contact the owner securely and hand it over. Campus kindness made simple!",
              link: "/contact",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              onClick={() => navigate(card.link)}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={card.icon}
                alt={card.title}
                className="w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-[0.95rem] leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-5">
            Our Vision
          </h2>
          <p className="text-gray-700 text-[1.05rem] leading-relaxed">
            We dream of a campus where technology and empathy walk hand in hand.
            CampusFind is more than an app — it’s a movement to make your
            community kinder, more honest, and connected through small, simple
            actions.
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-16 text-center text-white rounded-t-[2rem] shadow-inner">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-3"
        >
          Join the CampusFind Movement
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto text-orange-100 text-[1.05rem] mb-6"
        >
          Be part of something meaningful — find, return, and connect with your
          campus community.
        </motion.p>
        <a
          href="/signup"
          className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-50 transition"
        >
          Get Started
        </a>
      </section>
    </div>

    <Footer />
    </>
  );
};

export default About;