import React from "react";
import { FaBolt, FaLock, FaUserFriends, FaHeadset, FaSyncAlt, FaCloud } from "react-icons/fa";

export const Features = () => {
  const features = [
    {
      icon: <FaBolt className="h-8 w-8 text-orange-600" />,
      title: "Lightning Fast",
      description:
        "Optimized for performance so you can report lost or found items in seconds.",
      bgColor: "bg-orange-100",
    },
    {
      icon: <FaLock className="h-8 w-8 text-orange-600" />,
      title: "Secure by Design",
      description:
        "End-to-end encrypted reports ensuring privacy and security for all users.",
      bgColor: "bg-orange-100",
    },
    {
      icon: <FaUserFriends className="h-8 w-8 text-orange-600" />,
      title: "Intuitive Interface",
      description:
        "User-friendly design so anyone can report and find items easily.",
      bgColor: "bg-orange-100",
    },
    {
      icon: <FaHeadset className="h-8 w-8 text-orange-600" />,
      title: "24/7 Support",
      description:
        "Our team is ready to assist students and campus staff anytime.",
      bgColor: "bg-orange-100",
    },
    {
      icon: <FaSyncAlt className="h-8 w-8 text-orange-600" />,
      title: "Regular Updates",
      description:
        "Continuous improvements with new features rolled out frequently.",
      bgColor: "bg-orange-100",
    },
    {
      icon: <FaCloud className="h-8 w-8 text-orange-600" />,
      title: "Reliable & Uptime",
      description:
        "Cloud-based system ensuring your campus never loses track of items.",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="bg-gray-50">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-orange-600 font-semibold text-lg">WHY CHOOSE US</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Our Key Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Discover what makes CampusFind the perfect solution for your campus.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-left"
            >
              <div
                className={`w-14 h-14 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
