import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBoxOpen,
  FaUser,
  FaSignOutAlt,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usersDropdownOpen, setUsersDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleUsersDropdown = () => setUsersDropdownOpen(!usersDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Lost Items", icon: <FaBoxOpen />, path: "/lost-items" },
    { name: "Found Items", icon: <FaSearch />, path: "/found-items" },
    { name: "Users", icon: <FaUser />, dropdown: ["Students", "Staff"] },
    { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  const handleClick = (item) => {
    if (item.dropdown) {
      toggleUsersDropdown();
    } else if (item.path) {
      navigate(item.path);
      setIsOpen(false);
    } else if (item.action) {
      item.action();
      setIsOpen(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
              <h1 className="text-xl font-bold text-orange-500">CampusFind</h1>
            </Link>
          </div>
          <button className="md:hidden" onClick={toggleSidebar}>
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex flex-col mt-5 space-y-3 px-4">
          {menuItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => handleClick(item)}
                className=" cursor-pointer w-full flex items-center justify-between gap-3 p-2 rounded-md hover:text-orange-500 text-gray-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </span>
                {item.dropdown && (
                  <FaChevronDown
                    className={`${
                      usersDropdownOpen ? "rotate-180" : ""
                    } transition-transform`}
                  />
                )}
              </button>

              {/* Dropdown */}
              {item.dropdown && usersDropdownOpen && (
                <div className="ml-8 mt-1 flex flex-col space-y-1">
                  {item.dropdown.map((subItem) => (
                    <button
                      key={subItem}
                      className="text-gray-600 hover:text-orange-500 p-1 text-md font-semibold cursor-pointer rounded-md text-left"
                      onClick={() => {
                        navigate(`/${subItem.toLowerCase()}`);
                        setIsOpen(false);
                        setUsersDropdownOpen(false);
                      }}
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile/Tablet Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center justify-between px-4 md:hidden z-40">
        <button onClick={toggleSidebar} className="text-orange-500">
          <FaBars size={25} />
        </button>
        <span className="text-gray-800 font-medium mr-4">Hello Admin</span>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
