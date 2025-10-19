import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";
import Loader from "../../common/Loader/Loader";
import { FaBoxOpen } from "react-icons/fa";

const MyLostItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${API_BASE_URL}/items/my-lost-items`, config);
        setItems(res.data.items || []);
      } catch (err) {
        console.error("Error fetching lost items:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
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
        <h1 className="text-3xl font-bold text-gray-800">My Lost Items</h1>
      </div>

      {/* If no items */}
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-gray-600">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt="No items"
            className="w-28 mb-4 opacity-80"
          />
          <p className="text-lg">You haven’t reported any lost items yet.</p>
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
                <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {item.itemCategory || "General"}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1.5">
                <p>
                  <strong className="text-gray-900">Description:</strong>{" "}
                  {item.itemDescription || "No description provided"}
                </p>
                <p>
                  <strong className="text-gray-900">Date Lost:</strong>{" "}
                  {formatDate(item.dateLost)}
                </p>
                <p>
                  <strong className="text-gray-900">Location:</strong>{" "}
                  {item.location || "Not specified"}
                </p>
                <p>
                  <strong className="text-gray-900">Identification Mark:</strong>{" "}
                  {item.identificationMark || "None"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLostItems;
