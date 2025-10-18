import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

const TopSectionUser = () => {
  const [lostItems, setLostItems] = useState(0);
  const [foundItems, setFoundItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User token not found");

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const lostRes = await axios.get(`${API_BASE_URL}/items/my-lost-items`, config);
        const foundRes = await axios.get(`${API_BASE_URL}/items/my-found-items`, config);

        setLostItems(lostRes.data.items.length);
        setFoundItems(foundRes.data.items.length);
      } catch (err) {
        console.error("Error fetching user dashboard data:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5 text-orange-600">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700">Your Lost Items</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{lostItems}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700">Your Found Items</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{foundItems}</p>
        </div>
      </div>
    </div>
  );
};

export default TopSectionUser;
