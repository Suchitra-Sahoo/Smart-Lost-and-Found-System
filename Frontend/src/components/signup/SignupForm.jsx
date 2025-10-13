import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaUser,
  FaIdBadge,
  FaBuilding,
  FaCalendarAlt,
  FaGraduationCap,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputField from "../signin/InputField";
import RoleDropdown from "../signin/RoleDropdown";
import { signup } from "../../api/auth";
import toast from "react-hot-toast";

function SignupForm({ role, open, setOpen, handleSelect }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [staffId, setStaffId] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect Admin to signin
  useEffect(() => {
    if (role === "Admin") {
      navigate("/signin");
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role || role === "Admin") return;

    setLoading(true);

    const data = {
      role: role.toLowerCase(), // lowercase
      fullName,
      email,
      contactNumber,
      password,
      ...(role.toLowerCase() === "student" && {
        enrollmentNumber,
        semester,
        year,
        department,
      }),
      ...(role.toLowerCase() === "staff" && { staffId, department }),
    };

    try {
      const res = await signup(data);
      toast.success(res.message);
      navigate("/signin");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-1/2 w-full flex flex-col md:justify-center bg-white p-8 md:p-12 text-lg">
      {/* Back to Home */}
      <div className="flex justify-end mb-6 hover:underline text-xl font-semibold">
        <a href="/" className="flex items-center gap-2 text-orange-500">
          <FaArrowLeft /> Back to Home
        </a>
      </div>

      {/* Sign Up Heading */}
      <div className="mb-8 flex items-center">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-600 mr-4">
          Sign Up
        </h3>
        <div className="flex-grow h-1 bg-orange-200"></div>
      </div>

      {/* Form */}
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <RoleDropdown
          role={role}
          open={open}
          setOpen={setOpen}
          handleSelect={handleSelect}
        />

        <InputField
          icon={FaUser}
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* Email and Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            icon={FaEnvelope}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon={FaPhoneAlt}
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        {/* Student Fields */}
        {role === "Student" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={FaIdBadge}
              type="text"
              placeholder="Enrollment Number"
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
            />
            <InputField
              icon={FaGraduationCap}
              type="text"
              placeholder="Semester"
              value={semester}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setSemester(val); // only allow digits
              }}
            />

            <InputField
              icon={FaCalendarAlt}
              type="text"
              placeholder="Year"
              value={year}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setYear(val); // only allow digits
              }}
            />

            <InputField
              icon={FaBuilding}
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
        )}

        {/* Staff Fields */}
        {role === "Staff" && (
          <>
            <InputField
              icon={FaIdBadge}
              type="text"
              placeholder="Staff ID"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
            />
            <InputField
              icon={FaBuilding}
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </>
        )}

        {/* Password and Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            icon={FaLock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            icon={FaLock}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2.5 md:py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 md:my-6 flex items-center justify-center">
        <span className="h-px flex-1 bg-orange-200"></span>
        <span className="px-2 md:px-3 text-gray-500 text-sm md:text-base">
          or
        </span>
        <span className="h-px flex-1 bg-orange-200"></span>
      </div>

      {/* Sign In Link */}
      <p className="text-center text-gray-600 text-sm md:text-base">
        Already have an account?{" "}
        <a
          href="/signin"
          className="text-orange-600 font-semibold hover:underline"
        >
          Sign In
        </a>
      </p>
    </div>
  );
}

export default SignupForm;
