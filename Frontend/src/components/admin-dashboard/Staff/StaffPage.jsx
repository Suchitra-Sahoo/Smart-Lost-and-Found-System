import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../config";
import {
  FaUserTie,
  FaEnvelope,
  FaPhoneAlt,
  FaBoxOpen,
  FaSearchLocation,
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import noitems from "../../../assets/admin-dashboard/noitems.png";
import Loader from "../../common/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../../common/SearchBar";

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedStaff, setExpandedStaff] = useState(null);
  const [viewType, setViewType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/admin/staff-details`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          setError("Unauthorized access. Please login as admin.");
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (Array.isArray(data.staff)) {
          setStaff(data.staff);
        } else {
          setStaff([]);
          setError("No staff data found");
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
        setError("Failed to load staff data");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const filteredStaff = staff.filter(
    (member) =>
      member.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 font-medium">{error}</p>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3 mt-6 lg:mt-0">
        Staff Management Dashboard
      </h1>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex flex-col gap-6 w-full">
        {filteredStaff.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <img src={noitems} alt="No staff" className="w-52 opacity-70" />
            <p className="text-gray-600 mt-4 text-lg">
              {searchTerm
                ? "No staff found matching your search"
                : "No staff data found"}
            </p>
          </div>
        ) : (
          filteredStaff.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 w-full"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <FaUserTie className="text-orange-500" />{" "}
                    {member.fullName || member.name}
                  </h2>
                  <p className="text-gray-700 text-md flex items-center gap-3 mt-1">
                    <FaEnvelope className="text-orange-400" /> {member.email}
                  </p>
                  {member.contactNumber && (
                    <p className="text-gray-700 text-md flex items-center gap-3">
                      <FaPhoneAlt className="text-orange-400" />{" "}
                      {member.contactNumber}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => {
                      if (expandedStaff === member._id && viewType === "lost") {
                        setExpandedStaff(null);
                        setViewType("");
                      } else {
                        setExpandedStaff(member._id);
                        setViewType("lost");
                      }
                    }}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                      expandedStaff === member._id && viewType === "lost"
                        ? "bg-red-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    View Lost Items
                  </button>

                  <button
                    onClick={() => {
                      if (
                        expandedStaff === member._id &&
                        viewType === "found"
                      ) {
                        setExpandedStaff(null);
                        setViewType("");
                      } else {
                        setExpandedStaff(member._id);
                        setViewType("found");
                      }
                    }}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                      expandedStaff === member._id && viewType === "found"
                        ? "bg-green-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    View Found Items
                  </button>
                </div>
              </div>

              {/* Animated Expand Section */}
              <AnimatePresence>
                {expandedStaff === member._id && (
                  <motion.div
                    key="expanded-section"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-5 border-t-2 border-orange-500 pt-4 overflow-hidden"
                  >
                    {viewType === "lost" ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <FaBoxOpen className="text-red-500" /> Reported Lost
                          Items
                        </h3>
                        {member.lostItems?.length > 0 ? (
                          <ul className="space-y-3">
                            {member.lostItems.map((item) => (
                              <li
                                key={item._id}
                                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <p className="font-medium text-gray-900 text-base">
                                  {item.itemName || "Unnamed Item"}
                                </p>
                                <p className="text-md text-gray-700 flex items-center gap-2 mt-1">
                                  <MdLocationOn className="text-orange-500" />{" "}
                                  {item.location || "Unknown location"} |{" "}
                                  <MdAccessTime className="text-orange-500" />{" "}
                                  {item.timeRange || "Not specified"}
                                </p>
                                <p className="text-md text-gray-600 mt-1">
                                  {item.itemDescription || "No description"}
                                </p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 text-md">
                            No lost items reported
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <FaSearchLocation className="text-green-600" />{" "}
                          Reported Found Items
                        </h3>
                        {member.foundItems?.length > 0 ? (
                          <ul className="space-y-3">
                            {member.foundItems.map((item) => (
                              <li
                                key={item._id}
                                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <p className="font-medium text-gray-900 text-base">
                                  {item.itemName || "Unnamed Item"}
                                </p>
                                <p className="text-md text-gray-700 flex items-center gap-2 mt-1">
                                  <MdLocationOn className="text-orange-500" />{" "}
                                  {item.placeFound || "Unknown location"} |{" "}
                                  <MdAccessTime className="text-orange-500" />{" "}
                                  {item.timeFound || "Not specified"}
                                </p>
                                <p className="text-md text-gray-600 mt-1">
                                  {item.itemDescription || "No description"}
                                </p>
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.itemName}
                                    className="mt-2 w-48 h-36 object-cover rounded-lg border border-gray-200"
                                  />
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 text-md">
                            No found items reported
                          </p>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StaffPage;
