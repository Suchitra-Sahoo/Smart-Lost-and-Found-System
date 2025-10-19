import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserPlus,
  FaSearch,
  FaBoxOpen,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Logo from "/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole("");
    setUserDropdown(false);
    setIsOpen(false);
    navigate("/");
  };

  const menuItems = [
    { name: "Home", icon: <FaHome />, to: "/home" },
    { name: "About", icon: <FaInfoCircle />, to: "/about" },
    {
      name: "Report Lost Item",
      icon: <FaBoxOpen />,
      to: "/report-lost-item",
    },
    {
      name: "Report Found Item",
      icon: <FaSearch />,
      to: "/report-found-item",
    },
    { name: "Contact", icon: <FaPhone />, to: "/contact" },
  ];

  // Dynamic dashboard link based on role
  const userOptions = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
    to:
      role === "admin"
        ? "/admin-dashboard"
        : "/user-dashboard", // student or staff
  },
  { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
];

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white/20 backdrop-blur-md text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="CampusFind Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-orange-500">
              CampusFind
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex xl:items-center justify-between w-full">
            <div className="flex justify-center flex-1 space-x-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white/40 transition duration-300 font-medium text-gray-700 hover:text-orange-500"
                  onClick={(e) => {
                    if (
                      role === "admin" &&
                      (item.name === "Report Lost Item" || item.name === "Report Found Item")
                    ) {
                      e.preventDefault();
                      navigate("/admin-dashboard");
                    }
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="ml-4 relative flex items-center">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="cursor-pointer flex items-center space-x-2 px-2 py-1 rounded-full hover:text-orange-500 hover:bg-white/30 transition duration-300 focus:outline-none"
                  >
                    <FaUserCircle size={28} />
                    <span className="px-2 py-1 text-md font-semibold bg-orange-100 text-orange-600 rounded-lg transition duration-300">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                  </button>

                  {/* Dropdown */}
                  {userDropdown && (
                    <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-md shadow-lg py-2 z-50">
                      {userOptions.map((option) =>
                        option.to ? (
                          <Link
                            key={option.name}
                            to={option.to}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-orange-50"
                            onClick={() => setUserDropdown(false)}
                          >
                            <span>{option.icon}</span>
                            <span>{option.name}</span>
                          </Link>
                        ) : (
                          <button
                            key={option.name}
                            onClick={option.action}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-orange-50"
                          >
                            <span>{option.icon}</span>
                            <span>{option.name}</span>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 font-semibold"
                >
                  <FaUserPlus />
                  <span>Join Now</span>
                </Link>
              )}
            </div>
          </div>

           {/* Mobile/Tablet Menu Button */}
          <div className="flex xl:hidden items-center space-x-2">
            {isLoggedIn && !userDropdown && (
              <button
                onClick={() => {
                  setUserDropdown(true);
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 px-2 py-1 rounded-full hover:text-orange-500 hover:bg-white/30 transition duration-300 focus:outline-none"
              >
                <FaUserCircle size={24} />
                <span className="px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-600 rounded-full">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              </button>
            )}
             <button
              onClick={() => {
                setIsOpen(!isOpen);
                setUserDropdown(false);
              }}
              className="focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
          </div>
        </div>
      </div>

       {/* Mobile/Tablet User Dropdown */}
      {isLoggedIn && userDropdown && (
        <div className="xl:hidden bg-white/90 backdrop-blur-md py-2 flex flex-col items-center">
          {userOptions.map((option) =>
            option.to ? (
              <Link
                key={option.name}
                to={option.to}
                className="flex items-center w-40 justify-start space-x-2 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-md transition duration-300"
                onClick={() => setUserDropdown(false)}
              >
                <span>{option.icon}</span>
                <span>{option.name}</span>
              </Link>
            ) : (
              <button
                key={option.name}
                onClick={option.action}
                className="flex items-center w-40 justify-start space-x-2 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-md transition duration-300"
              >
                <span>{option.icon}</span>
                <span>{option.name}</span>
              </button>
            )
          )}
        </div>
      )}

      {/* Mobile/Tablet Menu */}
      {!userDropdown && (
      <div
        className={`xl:hidden bg-white/90 backdrop-blur-md overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex items-center space-x-3 px-6 py-4 border-b border-gray-200 hover:bg-orange-50 rounded-md transition duration-300 font-medium"
              onClick={(e) => {
                if (
                  role === "admin" &&
                  (item.name === "Report Lost Item" ||
                    item.name === "Report Found Item")
                ) {
                  e.preventDefault();
                  navigate("/admin-dashboard");
                }
                setIsOpen(false);
              }}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}

        {!isLoggedIn && (
          <Link
            to="/signin"
            className="flex items-center justify-center space-x-2 mx-6 my-3 bg-orange-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            <FaUserPlus />
            <span>Join Now</span>
          </Link>
            )}
          </div>
        )}
    </nav>
  );
}
