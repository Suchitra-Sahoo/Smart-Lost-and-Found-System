import React, { useState, useEffect, useRef } from "react";

const CategoryDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const categories = [
    "Bags",
    "Books & Notes",
    "Electronics",
    "Keys",
    "Documents / ID Cards",
    "Wallets",
    "Clothing",
    "Stationery",
    "Water Bottles",
    "Accessories",
    "Others",
  ];

  const handleSelect = (category) => {
    onChange(category);
    setOpen(false);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>

      {/* BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-white px-4 py-2 border border-gray-300 cursor-pointer rounded-lg"
      >
        <span className="text-base font-normal text-black">
          {value || "Choose Category"}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute w-full bg-gray-100 shadow-xl py-2 px-4 z-50 rounded-lg">

          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => handleSelect(cat)}
              className="py-2 text-gray-600 font-medium cursor-pointer hover:text-orange-500"
            >
              {cat}
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
