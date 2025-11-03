import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";
import Loader from "../../common/Loader/Loader";
import { FaBoxOpen } from "react-icons/fa";
import noitems from "../../../assets/admin-dashboard/noitems.png";
import ImageModal from "./ImageModal";

const MyFoundItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(
          `${API_BASE_URL}/items/my-found-items`,
          config
        );
        setItems(res.data.items || []);
      } catch (err) {
        console.error(
          "Error fetching found items:",
          err.response?.data || err.message
        );
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
    return <Loader />;
  }

  return (
    <div className="p-4 md:p-6 mt-10 md:mt-0">

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
                  <strong className="text-gray-900">Time Found:</strong>{" "}
                  {item.timeFound || "Not specified"}
                </p>
                <p>
                  <strong className="text-gray-900">Location:</strong>{" "}
                  {item.placeFound || "Not specified"}
                </p>
              </div>

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

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default MyFoundItems;
