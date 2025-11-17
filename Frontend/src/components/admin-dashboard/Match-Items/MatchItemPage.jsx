import React from "react";
import {
  FaCheckCircle,
  FaBell,
  FaSearch,
  FaUser,
  FaBox,
} from "react-icons/fa";

const matches = [
  {
    id: 1,
    lostItem: "Black Wallet",
    foundItem: "Black Wallet with Cards",
    lostBy: "Rahul Sharma",
    foundBy: "Amit Kumar",
    confidence: "92%",
    status: "High Match",
  },
  {
    id: 2,
    lostItem: "Red Water Bottle",
    foundItem: "Red Milton Bottle",
    lostBy: "Aarav Mehta",
    foundBy: "Sneha Kapoor",
    confidence: "76%",
    status: "Medium Match",
  },
  {
    id: 3,
    lostItem: "Dell Laptop",
    foundItem: "Dell Laptop Sleeve",
    lostBy: "Priya Verma",
    foundBy: "Rohan Singh",
    confidence: "34%",
    status: "Low Match",
  },
  {
    id: 4,
    lostItem: "Earbuds (Boat)",
    foundItem: "Boat Earbuds Black",
    lostBy: "Neha Sharma",
    foundBy: "Kunal Verma",
    confidence: "81%",
    status: "High Match",
  },
  {
    id: 5,
    lostItem: "ID Card",
    foundItem: "College ID Card",
    lostBy: "Mehak Jain",
    foundBy: "Abhishek Yadav",
    confidence: "89%",
    status: "High Match",
  },
  {
    id: 6,
    lostItem: "Casio Calculator",
    foundItem: "Black Scientific Calculator",
    lostBy: "Yuvraj Rana",
    foundBy: "Shalini Gupta",
    confidence: "63%",
    status: "Medium Match",
  },
];

const MatchItemsPage = () => {
  const handleNotify = (name) => {
    alert(`Notification sent to ${name}`);
  };

  return (
    <div className="p-6 text-gray-200">
      <h1 className="text-3xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <FaSearch /> AI Match Results
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map((item) => (
          <div
            key={item.id}
            className="bg-black border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-orange-500/20 transition"
          >
            {/* Status badge */}
            <div
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                item.status === "High Match"
                  ? "bg-green-700/30 text-green-400"
                  : item.status === "Medium Match"
                  ? "bg-yellow-700/30 text-yellow-400"
                  : "bg-red-700/30 text-red-400"
              }`}
            >
              {item.status} • Confidence: {item.confidence}
            </div>

            <div className="space-y-3">
              {/* Lost item */}
              <div className="flex items-center gap-2 text-lg font-semibold text-orange-400">
                <FaBox /> Lost: {item.lostItem}
              </div>

              {/* Found item */}
              <div className="flex items-center gap-2 text-lg font-semibold text-green-400">
                <FaCheckCircle /> Found: {item.foundItem}
              </div>

              {/* User details */}
              <div className="mt-4 space-y-2">
                <p className="flex items-center gap-2 text-sm text-gray-300">
                  <FaUser className="text-orange-300" /> Lost By:{" "}
                  <span className="font-semibold">{item.lostBy}</span>
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-300">
                  <FaUser className="text-green-300" /> Found By:{" "}
                  <span className="font-semibold">{item.foundBy}</span>
                </p>
              </div>
            </div>

            {/* Notify button */}
            <button
              onClick={() => handleNotify(item.lostBy)}
              className="mt-5 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              <FaBell /> Notify User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchItemsPage;
