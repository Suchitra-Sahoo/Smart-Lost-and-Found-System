import React from "react";

function InputField({ icon: Icon, type, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <Icon className="absolute top-3 md:top-4 left-3 md:left-4 text-orange-500" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}            
        onChange={onChange}      
        className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-orange-300 
          focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 shadow-sm 
          text-sm md:text-base bg-orange-50 hover:bg-orange-100"
      />
    </div>
  );
}

export default InputField;
