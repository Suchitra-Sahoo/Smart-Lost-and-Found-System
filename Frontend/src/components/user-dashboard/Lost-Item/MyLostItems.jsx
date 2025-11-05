import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";
import Loader from "../../common/Loader/Loader";
import noitems from "../../../assets/admin-dashboard/noitems.png";

const MyLostItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(
          `${API_BASE_URL}/items/my-lost-items`,
          config
        );
        setItems(res.data.items || []);
      } catch (err) {
        console.error(
          "Error fetching lost items:",
          err.response?.data || err.message
        );
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
    return <Loader />;
  }

  return (
    <div className="p-4 md:p-6 mt-10 md:mt-0">
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-gray-600">
          <img src={noitems} alt="No items" className="w-58 mb-4 opacity-80" />
          <p className="text-lg">You haven’t reported any lost items yet.</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            My Lost Items
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Date Lost</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Identification Mark</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-orange-50 transition`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {item.itemName || "Unnamed Item"}
                    </td>

                    <td className="py-3 px-4">
                      <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full">
                        {item.itemCategory || "General"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-700 max-w-xs break-words">
                      {item.itemDescription || "No description"}
                    </td>

                    <td className="py-3 px-4 text-gray-700">
                      {formatDate(item.dateLost)}
                    </td>

                    <td className="py-3 px-4 text-gray-700">
                      {item.timeRange}
                    </td>

                    <td className="py-3 px-4 text-gray-700">
                      {item.location || "Not specified"}
                    </td>

                    <td className="py-3 px-4 text-gray-700">
                      {item.identificationMark || "None"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLostItems;
