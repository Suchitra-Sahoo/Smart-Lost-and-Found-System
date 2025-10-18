import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/user-dashboard/Sidebar";
import TopSectionUser from "../components/user-dashboard/TopSectionUser";
// Import other user pages if any

function UserDashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Right content */}
      <div className="flex-1 bg-gray-50 min-h-screen p-5 md:ml-64">
        <Routes>
          <Route path="/" element={<TopSectionUser />} />
          {/* Add more routes for user pages if needed */}
        </Routes>
      </div>
    </div>
  );
}

export default UserDashboard;
