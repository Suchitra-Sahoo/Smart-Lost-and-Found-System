import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUniversity,
  FaArrowLeft,
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import Loader from "../../common/Loader/Loader";
import Banner from "../../../assets/admin-dashboard/banner.jpg";

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ Fetch full list (same API used in StudentPage)
        const res = await fetch(`${API_BASE_URL}/admin/students-details`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!Array.isArray(data.students)) {
          setError("No student data found");
          setLoading(false);
          return;
        }

        // ✅ Find user by id
        const targetStudent = data.students.find((s) => s._id === id);

        if (!targetStudent) {
          setError("Student not found");
        } else {
          setStudent(targetStudent);
        }
      } catch (err) {
        console.error("Error loading student:", err);
        setError("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 font-medium text-xl hover:underline cursor-pointer"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Banner + Profile Header */}
      <div className="relative w-full">
        {/* Banner */}
        <div
          className="w-full h-40 sm:h-48 rounded-t-xl shadow-md mt-6 bg-cover bg-center"
          style={{
            backgroundImage: `url(${Banner})`,
          }}
        ></div>

        {/* Profile Floating Circle */}
        <div className="absolute -bottom-10 left-4 sm:left-8 w-24 h-24 sm:w-30 sm:h-30 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-20 h-20 sm:w-26 sm:h-26 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold">
            {student.fullName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white shadow-md p-4 sm:p-6 pt-14 sm:pt-16 mt-0 border border-gray-200 rounded-b-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {student.fullName}
        </h1>

        <div className="mt-3 space-y-2">
          <p className="text-gray-700 flex items-center gap-2">
            <FaEnvelope className="text-orange-500" /> {student.email}
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <FaUniversity className="text-orange-500" />
            {student.department} | Year {student.year} | Sem {student.semester}
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <FaPhoneAlt className="text-orange-500" /> {student.contactNumber}
          </p>
        </div>
      </div>

      {/* Lost Items */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Reported Lost Items
        </h2>

        {student.lostItems?.length > 0 ? (
          <ul className="space-y-4">
            {student.lostItems.map((item) => (
              <li
                key={item._id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="font-medium text-gray-900">{item.itemName}</p>
                <div className="mt-1 text-gray-700 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="flex items-center gap-2">
                    <MdLocationOn className="text-orange-500" /> {item.location}
                  </span>

                  <span className="hidden sm:block">|</span>

                  <span className="flex items-center gap-2">
                    <MdAccessTime className="text-orange-500" />{" "}
                    {item.timeRange}
                  </span>
                </div>

                <p className="text-gray-700 mt-1">
                  Description: {item.itemDescription}
                </p>
                <p className="text-gray-700 mt-1">
                  Identification Mark: {item.identificationMark}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No lost items reported</p>
        )}
      </div>

      {/* Found Items */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-6 border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Reported Found Items
        </h2>

        {student.foundItems?.length > 0 ? (
          <ul className="space-y-4">
            {student.foundItems.map((item) => (
              <li
                key={item._id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="font-medium text-gray-900">{item.itemName}</p>
                <div className="mt-1 text-gray-700 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="flex items-center gap-2">
                    <MdLocationOn className="text-green-600" />{" "}
                    {item.placeFound}
                  </span>

                  <span className="hidden sm:block">|</span>

                  <span className="flex items-center gap-2">
                    <MdAccessTime className="text-green-600" /> {item.timeFound}
                  </span>
                </div>

                <p className="text-gray-700 mt-1">
                  Description: {item.itemDescription}
                </p>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="mt-2 w-58 h-56 object-cover rounded-lg"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No found items reported</p>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
