import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaUser, FaBox, FaCheckCircle } from "react-icons/fa";
import API_BASE_URL from "../../../config";
import SearchBar from "../../common/SearchBar";
import Loader from "../../common/Loader/Loader";
import toast from "react-hot-toast";

const MatchItemPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(`${API_BASE_URL}/clip/match`);
        setMatches(
          data.matches.map((m, index) => ({
            id: index,
            lostItem: m.lostItem, // full object
            foundItem: m.foundItem, // full object
            confidence: m.finalScore,
            status:
              m.finalScore > 75
                ? "High Match"
                : m.finalScore > 50
                ? "Medium Match"
                : "Low Match",
          }))
        );
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleNotify = async (match) => {
    // Show loading toast
    const toastId = toast.loading("Sending notification...", {
      style: {
        background: "#1F1F1F", // dark background
        color: "#FFA500", // bright text
        fontWeight: "bold",
      },
    });

    try {
      // Format date
      const formattedDate = match.foundItem.dateFound
        ? new Date(match.foundItem.dateFound).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "N/A";

      // Send notification
      await axios.post(`${API_BASE_URL}/notify/user`, {
        to: match.lostItem.userEmail,
        lostItem: {
          itemName: match.lostItem.itemName,
          itemDescription: match.lostItem.itemDescription,
        },
        foundItem: {
          itemName: match.foundItem.itemName,
          itemDescription: match.foundItem.itemDescription,
          placeFound: match.foundItem.placeFound || "N/A",
          dateFound: formattedDate,
          image: match.foundItem.image || "",
        },
      });

      // Success toast 
      toast.success("Notification sent!", {
        id: toastId,
        style: {
          background: "#1F1F1F",
          color: "#00FF00",
          fontWeight: "bold",
        },
      });
    } catch (err) {
      console.error(err);
      // Error toast 
      toast.error(
        err.response?.data?.message || "Failed to send notification",
        {
          id: toastId,
          style: {
            background: "#1F1F1F",
            color: "#FF4500",
            fontWeight: "bold",
          },
        }
      );
    }
  };

  const filteredMatches = matches.filter(
    (item) =>
      item.lostItem.itemName.toLowerCase().includes(filter.toLowerCase()) ||
      item.foundItem.itemName.toLowerCase().includes(filter.toLowerCase()) ||
      item.lostItem.userName.toLowerCase().includes(filter.toLowerCase()) ||
      item.foundItem.userName.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="hidden sm:block text-orange-400 text-xl">
          <Loader />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );

  if (!matches.length)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-xl">
        No matches found.
      </div>
    );

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Centered and widened SearchBar */}
      <div className="flex justify-center mb-6">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/2">
          <SearchBar
            searchTerm={filter}
            setSearchTerm={setFilter}
            placeholder="Search by item or user..."
          />
        </div>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMatches.map((item) => (
          <div
            key={item.id}
            className="bg-black border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-orange-500/50 transition flex flex-col justify-between"
          >
            <div>
              {/* Status and Confidence */}
              <div className="flex gap-2 mb-3">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    item.status === "High Match"
                      ? "bg-green-700/30 text-green-400"
                      : item.status === "Medium Match"
                      ? "bg-yellow-700/30 text-yellow-400"
                      : "bg-red-700/30 text-red-400"
                  }`}
                >
                  {item.status}
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-orange-200 text-orange-700">
                  Confidence: {item.confidence}%
                </div>
              </div>

              {/* Lost Item */}
              <div className="flex items-center gap-2 text-lg font-semibold text-orange-400">
                <FaBox /> Lost: {item.lostItem.itemName}
              </div>
              <div className="text-gray-300 text-sm ml-6 mt-1 space-y-1">
                <p>
                  <strong>Description:</strong> {item.lostItem.itemDescription}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {item.lostItem.itemCategory || "N/A"}
                </p>
                <p>
                  <strong>ID Mark:</strong>{" "}
                  {item.lostItem.identificationMark || "N/A"}
                </p>
              </div>

              {/* Found Item */}
              <div className="flex items-center gap-2 text-lg font-semibold text-green-400 mt-3">
                <FaCheckCircle /> Found: {item.foundItem.itemName}
              </div>
              <div className="text-gray-300 text-sm ml-6 mt-1 space-y-1">
                <p>
                  <strong>Description:</strong> {item.foundItem.itemDescription}
                </p>
                <p>
                  <strong>Place:</strong> {item.foundItem.placeFound || "N/A"}
                </p>
              </div>

              {/* Users */}
              <div className="mt-3 space-y-1">
                <p className="flex items-center gap-2 text-sm text-gray-300">
                  <FaUser className="text-orange-300" /> Lost By:{" "}
                  <span className="font-semibold">
                    {item.lostItem.userName}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-300">
                  <FaUser className="text-green-300" /> Found By:{" "}
                  <span className="font-semibold">
                    {item.foundItem.userName}
                  </span>
                </p>
              </div>
            </div>

            {/* Notify Button at bottom */}
            <button
              onClick={() => handleNotify(item)} 
              className="cursor-pointer mt-5 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              <FaBell /> Notify User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchItemPage;
