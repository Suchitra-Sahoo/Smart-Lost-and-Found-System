import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

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
    <section className="mt-8 p-6 bg-white rounded-lg shadow-md border-l-4 border-orange-500">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">Profile Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 uppercase">Full Name</p>
            <p className="text-lg font-medium text-gray-800">{user.fullName}</p>
          </div>
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
          {user.enrollmentNumber && (
            <div>
              <p className="text-sm text-gray-600 uppercase">Enrollment No</p>
              <p className="text-lg font-medium text-gray-800">{user.enrollmentNumber}</p>
            </div>
          )}
          {user.staffId && (
            <div>
              <p className="text-sm ttext-gray-600 uppercase">Staff ID</p>
              <p className="text-lg font-medium text-gray-800">{user.staffId}</p>
            </div>
          )}
          {user.department && (
            <div>
              <p className="text-sm text-gray-600 uppercase">Department</p>
              <p className="text-lg font-medium text-gray-800">{user.department}</p>
            </div>
          )}
          {user.contactNumber && (
            <div>
              <p className="text-sm text-gray-600 uppercase">Contact</p>
              <p className="text-lg font-medium text-gray-800">{user.contactNumber}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
