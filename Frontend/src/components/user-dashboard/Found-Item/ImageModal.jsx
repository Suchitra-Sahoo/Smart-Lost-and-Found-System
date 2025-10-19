import React from "react";
import { FaTimes } from "react-icons/fa";

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl max-w-[90vw] max-h-[90vh] flex justify-center items-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2 z-50 text-white bg-black/70 hover:bg-black/90 rounded-full p-2 shadow-lg transition"
        >
          <FaTimes size={22} />
        </button>

        {/* Image */}
        <img
          src={image}
          alt="Found Item"
          className="object-contain min-w-[500px] min-h-[500px] max-w-[85vw] max-h-[85vh] rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
