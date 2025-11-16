import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";
import Loader from "../../common/Loader/Loader";
import noitems from "../../../assets/admin-dashboard/noitems.png";

const MyFoundItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Error fetching found items:", err);
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

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-6 mt-10 md:mt-0 bg-black text-white min-h-screen">
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-gray-400 text-center">
          <img src={noitems} alt="No items" className="w-52 mb-4 opacity-80" />
          <p className="text-lg">You haven’t reported any found items yet.</p>
        </div>
      ) : (
        <div className="bg-black p-6 rounded-xl shadow-sm border border-gray-800">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
            My Found Items
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-gray-800 text-left text-gray-300 uppercase text-sm">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Date Found</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item._id}
                    className="bg-zinc-900"
                  >
                    <td className="py-3 px-4 font-medium text-white break-words">
                      {item.itemName || "Unnamed Item"}
                    </td>

                    <td className="py-3 px-4">
                      <span className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full">
                        {item.category || "General"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-300 max-w-xs break-words">
                      {item.itemDescription || "No description"}
                    </td>

                    <td className="py-3 px-4 text-gray-300 whitespace-nowrap">
                      {formatDate(item.dateFound)}
                    </td>

                    <td className="py-3 px-4 text-gray-300 whitespace-nowrap">
                      {item.timeFound || "Not specified"}
                    </td>

                    <td className="py-3 px-4 text-gray-300 break-words">
                      {item.placeFound || "Not specified"}
                    </td>

                    <td className="py-3 px-4">
                      <a
                        href={item.image}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer px-4 py-1.5 bg-gray-700 text-white text-sm rounded-lg transition"
                      >
                        View
                      </a>
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

export default MyFoundItems;
