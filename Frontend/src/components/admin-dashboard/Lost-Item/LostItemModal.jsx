import React, { useEffect, useState } from "react";

const LostItemModal = ({ item, onClose }) => {
  const [status, setStatus] = useState(item?.status || "Pending");

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-11/12 md:w-2/3 lg:w-1/2 p-8 max-h-[90vh] overflow-y-auto z-10 rounded-2xl shadow-2xl">
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
            <strong>Date Lost:</strong>{" "}
            {new Date(item.dateLost).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Time:</strong> {item.timeRange}
          </p>
          <p>
            <strong>Location:</strong> {item.location}
          </p>
          <p>
            <strong>Category:</strong> {item.itemCategory || "-"}
          </p>
          <p>
            <strong>Identification Mark:</strong>{" "}
            {item.identificationMark || "-"}
          </p>
          <p>
            <strong>Reported By:</strong> {item.userName}
          </p>
          <p>
            <strong>Email:</strong> {item.userEmail}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LostItemModal;
