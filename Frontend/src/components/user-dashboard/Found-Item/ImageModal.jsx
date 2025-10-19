import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimesCircle size={28} />
        </button>

        <img
          src={image}
          alt="Found Item"
          className="object-cover w-[500px] h-[500px] rounded"
        />
      </div>
    </div>
  );
};

export default ImageModal;
