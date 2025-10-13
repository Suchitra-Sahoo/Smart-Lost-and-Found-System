import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config";
import noitems from "../../../assets/admin-dashboard/noitems.png";
import Loader from "../../common/Loader/Loader";
import FoundItemModal from "./FoundItemModal";
import SearchBar from "../../common/SearchBar";

const FoundItemsPage = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("Admin token not found");

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${API_BASE_URL}/found-items`, config);
        setFoundItems(res.data.items || []);
        setFilteredItems(res.data.items || []);
      } catch (err) {
        console.error("Error fetching found items:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch found items");
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredItems(foundItems);
    } else {
      const filtered = foundItems.filter(
        (item) =>
          item.itemName?.toLowerCase().includes(search.toLowerCase()) ||
          item.placeFound?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [search, foundItems]);

  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-orange-600 mt-10 sm:mt-10 md:mt-0 mb-4">
          Found Items
        </h1>
        <SearchBar searchTerm={search} setSearchTerm={setSearch} />
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <img src={noitems} alt="No items" className="w-64 h-64 object-contain mb-4" />
          <p className="text-gray-500 text-lg font-medium">No items found</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 hidden sm:table-cell">Date Found</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Time</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Place</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2 hidden sm:table-cell">
                    {new Date(item.dateFound).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">{item.timeFound}</td>
                  <td className="px-4 py-2 hidden md:table-cell">{item.placeFound}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FoundItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default FoundItemsPage;
