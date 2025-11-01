import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../config";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhoneAlt,
  FaUniversity,
  FaBoxOpen,
  FaSearchLocation,
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import noperson from "../../../assets/admin-dashboard/noperson.png";
import Loader from "../../common/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../../common/SearchBar";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [viewType, setViewType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/admin/students-details`, {
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

        if (Array.isArray(data.students)) {
          setStudents(data.students);
        } else {
          setStudents([]);
          setError("No student data found");
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.fullName?.toLowerCase().includes(term) ||
      student.email?.toLowerCase().includes(term) ||
      student.department?.toLowerCase().includes(term)
    );
  });

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 font-medium">{error}</p>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3 mt-6 lg:mt-0">
        Student Management Dashboard
      </h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search students here..."/>

      <div className="flex flex-col gap-6 w-full">
        {filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <img src={noperson} alt="No students" className="w-82" />
            <p className="text-gray-600 mt-4 text-lg">
              {searchTerm
                ? "No students found matching your search"
                : "No student data found"}
            </p>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 w-full"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <FaUserGraduate className="text-orange-500" />{" "}
                    {student.fullName}
                  </h2>
                  <p className="text-gray-700 text-md flex items-center gap-3 mt-1">
                    <FaEnvelope className="text-orange-400" /> {student.email}
                  </p>
                  <p className="text-gray-700 text-md flex items-center gap-3">
                    <FaUniversity className="text-orange-400" />{" "}
                    {student.department} | Year {student.year} | Sem{" "}
                    {student.semester}
                  </p>
                  <p className="text-gray-700 text-md flex items-center gap-3">
                    <FaPhoneAlt className="text-orange-400" />{" "}
                    {student.contactNumber}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => {
                      if (
                        expandedStudent === student._id &&
                        viewType === "lost"
                      ) {
                        setExpandedStudent(null);
                        setViewType("");
                      } else {
                        setExpandedStudent(student._id);
                        setViewType("lost");
                      }
                    }}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                      expandedStudent === student._id && viewType === "lost"
                        ? "bg-red-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    View Lost Items
                  </button>

                  <button
                    onClick={() => {
                      if (
                        expandedStudent === student._id &&
                        viewType === "found"
                      ) {
                        setExpandedStudent(null);
                        setViewType("");
                      } else {
                        setExpandedStudent(student._id);
                        setViewType("found");
                      }
                    }}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                      expandedStudent === student._id && viewType === "found"
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
                {expandedStudent === student._id && (
                  <motion.div
                    key="expanded-section"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-5 border-t border-orange-500 pt-4 overflow-hidden"
                  >
                    {viewType === "lost" ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <FaBoxOpen className="text-red-500" /> Reported Lost
                          Items
                        </h3>
                        {student.lostItems?.length > 0 ? (
                          <ul className="space-y-3">
                            {student.lostItems.map((item) => (
                              <li
                                key={item._id}
                                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <p className="font-medium text-gray-900 text-base">
                                  {item.itemName}
                                </p>
                                <p className="text-md text-gray-700 flex items-center gap-2 mt-1">
                                  <MdLocationOn className="text-orange-500" />{" "}
                                  {item.location} |{" "}
                                  <MdAccessTime className="text-orange-500" />{" "}
                                  {item.timeRange}
                                </p>
                                <p className="text-md text-gray-600 mt-1">
                                  {item.itemDescription}
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
                        {student.foundItems?.length > 0 ? (
                          <ul className="space-y-3">
                            {student.foundItems.map((item) => (
                              <li
                                key={item._id}
                                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <p className="font-medium text-gray-900 text-base">
                                  {item.itemName}
                                </p>
                                <p className="text-md text-gray-700 flex items-center gap-2 mt-1">
                                  <MdLocationOn className="text-green-600" />{" "}
                                  {item.placeFound} |{" "}
                                  <MdAccessTime className="text-green-600" />{" "}
                                  {item.timeFound}
                                </p>
                                <p className="text-md text-gray-600 mt-1">
                                  {item.itemDescription}
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

export default StudentPage;
