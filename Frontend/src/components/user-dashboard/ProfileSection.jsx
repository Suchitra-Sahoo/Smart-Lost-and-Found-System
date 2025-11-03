import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import Banner from "../../assets/admin-dashboard/banner.jpg";

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const res = await axios.get(`${API_BASE_URL}/auth/me`, config);
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="pb-6 bg-gray-50 pt-16 lg:pt-0 md:pt-0">
      {/* Banner + Profile Header */}
      <div className="relative w-full">
        {/* Banner */}
        <div
          className="w-full h-40 sm:h-48 rounded-t-xl shadow-md bg-cover bg-center"
          style={{
            backgroundImage: `url(${Banner})`,
          }}
        ></div>

        {/* Floating Profile Circle */}
        <div className="absolute -bottom-12 left-4 sm:left-8 w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold">
            {user.fullName?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white shadow-md p-6 sm:p-8 pt-16 sm:pt-20 mt-0 border border-gray-200 rounded-b-xl">
        <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 uppercase">Email</p>
              <p className="text-lg font-medium text-gray-800">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 uppercase">Role</p>
              <p className="text-lg font-medium text-gray-800">{user.role}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {user.department && (
              <div>
                <p className="text-sm text-gray-600 uppercase">Department</p>
                <p className="text-lg font-medium text-gray-800">
                  {user.department}
                </p>
              </div>
            )}

            {user.enrollmentNumber && (
              <div>
                <p className="text-sm text-gray-600 uppercase">Enrollment No</p>
                <p className="text-lg font-medium text-gray-800">
                  {user.enrollmentNumber}
                </p>
              </div>
            )}

            {user.staffId && (
              <div>
                <p className="text-sm text-gray-600 uppercase">Staff ID</p>
                <p className="text-lg font-medium text-gray-800">
                  {user.staffId}
                </p>
              </div>
            )}

            {user.contactNumber && (
              <div>
                <p className="text-sm text-gray-600 uppercase">Contact</p>
                <p className="text-lg font-medium text-gray-800">
                  {user.contactNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
