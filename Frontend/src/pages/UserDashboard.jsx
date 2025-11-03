import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/user-dashboard/Sidebar";
import TopSectionUser from "../components/user-dashboard/TopSectionUser";
import MyLostItems from "../components/user-dashboard/Lost-Item/MyLostItems";
import MyFoundItems from "../components/user-dashboard/Found-Item/MyFoundItems";
import ProfileSection from "../components/user-dashboard/ProfileSection";
import ProfileChart from "../components/user-dashboard/main-dashboard/ProfileChart";

function UserDashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen md:ml-64 p-5">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-5">
                <ProfileSection />
                <TopSectionUser />
                <ProfileChart />
              </div>
            }
          />

          <Route path="/my-lost-items" element={<MyLostItems />} />
          <Route path="/my-found-items" element={<MyFoundItems />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserDashboard;
