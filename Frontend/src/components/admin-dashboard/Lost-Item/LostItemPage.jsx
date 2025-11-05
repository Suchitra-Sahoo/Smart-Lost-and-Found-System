import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../config";
import noitems from "./../../../assets/admin-dashboard/noitems.png";
import Loader from "../../common/Loader/Loader";
import LostItemModal from "./LostItemModal";
import SearchBar from "../../common/SearchBar";
import RecentReportedItems from "./RecentReportedItems";

const LostItemsPage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Admin token not found");

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${API_BASE_URL}/lost-items`, config);
        setLostItems(res.data.items || []);
        setFilteredItems(res.data.items || []);
      } catch (err) {
        console.error(
          "Error fetching lost items:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.message || "Failed to fetch lost items");
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredItems(lostItems);
    } else {
      const filtered = lostItems.filter(
        (item) =>
          item.itemName?.toLowerCase().includes(search.toLowerCase()) ||
          item.userName?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [search, lostItems]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_BASE_URL}/lost-items/${id}`, config);

      setLostItems(lostItems.filter((item) => item._id !== id));
      setFilteredItems(filteredItems.filter((item) => item._id !== id));
      toast.success("Item deleted successfully!");
    } catch (err) {
      console.error(
        "Failed to delete item:",
        err.response?.data || err.message
      );
      toast.error("Failed to delete item");
    } finally {
      setConfirmDeleteId(null); // remove inline confirm
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mb-6">
        <div className="flex justify-center mt-20 lg:mt-4 md:mt-4">
          <SearchBar
            searchTerm={search}
            setSearchTerm={setSearch}
            placeholder="Search lost items here..."
          />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <img
            src={noitems}
            alt="No items"
            className="w-64 h-64 object-contain mb-4"
          />
          <p className="text-gray-500 text-lg font-medium">No items found</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <RecentReportedItems />
          <table className="mt-8 min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Item Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Date Lost
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Time
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Reported By
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  View
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2">
                    {new Date(item.dateLost).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2">{item.timeRange}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {item.userName}
                    <br />
                    <span className="text-xs">{item.userEmail}</span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {confirmDeleteId === item._id ? (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="cursor-pointer px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="cursor-pointer px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(item._id)}
                        className="text-red-600 hover:text-red-800 transition cursor-pointer"
                      >
                        <FaTrash size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <LostItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default LostItemsPage;
