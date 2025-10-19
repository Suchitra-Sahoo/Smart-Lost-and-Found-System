import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";
import Loader from "../../common/Loader/Loader";
import { FaBoxOpen, FaTimesCircle } from "react-icons/fa";
import noitems from "../../../assets/admin-dashboard/noitems.png";

const MyFoundItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${API_BASE_URL}/items/my-found-items`, config);
        setItems(res.data.items || []);
      } catch (err) {
        console.error("Error fetching found items:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 mt-10 md:mt-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaBoxOpen className="text-orange-600 text-3xl" />
        <h1 className="text-3xl font-bold text-gray-800">My Found Items</h1>
      </div>

      {/* If no items */}
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-gray-600">
          <img src={noitems} alt="No items" className="w-58 mb-4 opacity-80" />
          <p className="text-lg">You haven’t reported any found items yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.itemName || "Unnamed Item"}
                </h2>
                <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full cursor-pointer">
                  {item.itemCategory || "General"}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1.5 mb-3">
                <p>
                  <strong className="text-gray-900">Description:</strong>{" "}
                  {item.itemDescription || "No description provided"}
                </p>
                <p>
                  <strong className="text-gray-900">Date Found:</strong>{" "}
                  {formatDate(item.dateFound)}
                </p>
                <p>
                  <strong className="text-gray-900">Location:</strong>{" "}
                  {item.placeFound || "Not specified"}
                </p>
                <p>
                  <strong className="text-gray-900">Identification Mark:</strong>{" "}
                  {item.identificationMark || "None"}
                </p>
              </div>

              {/* View Image Button */}
              {item.image && (
                <button
                  onClick={() => setSelectedImage(item.image)}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  View Image
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backdropFilter: "blur(5px)" }} // Blur the background
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
          >
            {/* Bold Close Icon */}
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimesCircle size={28} />
            </button>

            <img
              src={selectedImage}
              alt="Found Item"
              className="max-h-[70vh] max-w-[90vw] rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFoundItems;
