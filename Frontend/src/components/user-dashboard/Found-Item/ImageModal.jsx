import React from "react";
import { FaTimes } from "react-icons/fa";

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl p-3 max-w-[95vw] max-h-[95vh] flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2 z-50 text-white bg-black/70 hover:bg-black/90 rounded-full p-2 shadow-lg transition"
        >
          <FaTimes size={20} />
        </button>

        <img
          src={image}
          alt="Found Item"
          className="w-full h-full max-w-[95vw] max-h-[90vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
