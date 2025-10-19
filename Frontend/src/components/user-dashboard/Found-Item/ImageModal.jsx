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
        className="relative bg-white rounded-lg shadow-xl p-2 max-w-[90vw] max-h-[90vh] flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer absolute top-2 right-2 text-white bg-orange-600 rounded-full p-1 shadow hover:bg-orange-500 transition"
          onClick={onClose}
        >
          <FaTimesCircle size={28} />
        </button>

        <img
          src={image}
          alt="Found Item"
          className="object-contain min-w-[500px] min-h-[500px] max-w-[85vw] max-h-[85vh] rounded"
        />
      </div>
    </div>
  );
};

export default ImageModal;
