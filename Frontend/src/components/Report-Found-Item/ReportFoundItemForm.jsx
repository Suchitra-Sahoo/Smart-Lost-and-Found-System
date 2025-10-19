import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "../../config";

const ReportFoundItemForm = ({ user }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    placeFound: "",
    timeFound: "",
    dateFound: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const { itemName, itemDescription, placeFound, timeFound, dateFound } = formData;

    if (!itemName || !itemDescription || !placeFound || !timeFound || !dateFound || !image) {
      toast.error("Please fill all required fields including image.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Use FormData for image upload
      const data = new FormData();
      data.append("itemName", itemName);
      data.append("itemDescription", itemDescription);
      data.append("placeFound", placeFound);
      data.append("timeFound", timeFound);
      data.append("dateFound", dateFound);
      data.append("image", image);

      const response = await axios.post(`${API_BASE_URL}/found-items`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);

      // Reset form
      setFormData({
        itemName: "",
        itemDescription: "",
        placeFound: "",
        timeFound: "",
        dateFound: "",
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to report found item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5">
      <div>
        <label className="block mb-1 font-medium text-gray-700">Item Name *</label>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Enter item name"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Description *</label>
        <textarea
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
          placeholder="Describe the found item"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Date Found *</label>
          <input
            type="date"
            name="dateFound"
            value={formData.dateFound}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Time Found *</label>
          <input
            type="text"
            name="timeFound"
            value={formData.timeFound}
            onChange={handleChange}
            placeholder="e.g., 11:30 AM"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Place Found *</label>
        <input
          type="text"
          name="placeFound"
          value={formData.placeFound}
          onChange={handleChange}
          placeholder="Where did you find it?"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Upload Image *</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="cursor-pointer w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2.5 rounded-xl font-semibold shadow hover:scale-105 transform transition duration-300 disabled:opacity-50"
      >
        {loading ? "Reporting..." : "Report Found Item"}
      </button>
    </form>
  );
};

export default ReportFoundItemForm;
