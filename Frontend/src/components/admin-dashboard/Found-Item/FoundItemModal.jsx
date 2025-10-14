import React, { useEffect } from "react";

const FoundItemModal = ({ item, onClose }) => {
  // Disable scrolling when modal is open
  useEffect(() => {
    if (item) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [item]);

  if (!item) return null;

  const imageUrl = item.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white w-11/12 md:w-2/3 lg:w-1/2 p-8 max-h-[90vh] overflow-y-auto z-10 rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-orange-600 border-b border-orange-200 pb-2">
          {item.itemName}
        </h2>

        {/* Content */}
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Description:</strong> {item.itemDescription || "-"}
          </p>
          <p>
            <strong>Date Found:</strong>{" "}
            {new Date(item.dateFound).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Time:</strong> {item.timeFound}
          </p>
          <p>
            <strong>Place:</strong> {item.placeFound}
          </p>
          <p>
            <strong>Reported By:</strong> {item.userName}
          </p>
          <p>
            <strong>Email:</strong> {item.userEmail}
          </p>

          {imageUrl && (
            <div>
              <strong>Image:</strong>
              <img
                src={imageUrl}
                alt={item.itemName}
                className="mt-2 w-54 h-54 rounded object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundItemModal;
