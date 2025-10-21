import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

const TopSection = () => {
  const [lostItems, setLostItems] = useState(0);
  const [foundItems, setFoundItems] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Admin token not found");

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const lostRes = await axios.get(`${API_BASE_URL}/lost-items`, config);
        const foundRes = await axios.get(`${API_BASE_URL}/found-items`, config);
        const usersRes = await axios.get(`${API_BASE_URL}/users/stats`, config);

        setLostItems(lostRes.data.items.length);
        setFoundItems(foundRes.data.items.length);
        setStudentCount(usersRes.data.totalStudents);
        setStaffCount(usersRes.data.totalStaff);
      } catch (err) {
        console.error("Error fetching dashboard data:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5 text-orange-600">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Lost Items</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{lostItems}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Found Items</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{foundItems}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Staff</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{staffCount}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Students</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{studentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
