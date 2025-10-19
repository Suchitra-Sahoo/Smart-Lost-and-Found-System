import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/user-dashboard/Sidebar";
import TopSectionUser from "../components/user-dashboard/TopSectionUser";
import MyLostItems from "../components/user-dashboard/Lost-Item/MyLostItems"; 

function UserDashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen p-5 md:ml-64">
        <Routes>
          <Route path="/" element={<TopSectionUser />} />
          <Route path="/my-lost-items" element={<MyLostItems />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default UserDashboard;
