import React from "react";
import { FaUser } from "react-icons/fa";

function RoleDropdown({ role, open, setOpen, handleSelect }) {
  return (
    <div className="relative">
      <FaUser className="absolute top-3 md:top-4 left-3 md:left-4 text-orange-500" />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-orange-300 
          focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 shadow-sm 
          text-sm md:text-base bg-orange-50 hover:bg-orange-100 flex items-center"
      >
        <span className="flex-1 text-left">
          {role ? role : "Select Role"}
        </span>
      </button>
      {open && (
        <ul className="absolute z-10 w-full text-gray-700 pt-1 bg-white rounded-xl shadow-md border border-orange-200 mt-1">
          {["Student", "Staff", "Admin"].map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-2 hover:bg-orange-100"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RoleDropdown;
