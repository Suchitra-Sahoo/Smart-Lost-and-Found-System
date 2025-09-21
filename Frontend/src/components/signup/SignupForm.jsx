

// import React, { useState } from "react";
// import {
//   FaEnvelope,
//   FaLock,
//   FaUser,
//   FaPhone,
//   FaBuilding,
//   FaIdCard,
//   FaHashtag,
//   FaCalendarAlt,
// } from "react-icons/fa";

// import InputField from "../signin/InputField";
// import { signup } from "../../api/auth";

// function SignupForm() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     phone: "",
//     department: "",
//     role: "",
//     enrollmentNo: "",
//     semester: "",
//     year: "",
//     staffId: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleRoleChange = (e) =>
//     setFormData({ ...formData, role: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(formData);
//       alert("Signup successful!");
//     } catch (err) {
//       console.error(err);
//       alert("Signup failed!");
//     }
//   };

//   return (
//     <div className="relative z-10 w-full max-w-lg">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl space-y-6 border border-orange-200"
//       >
//         <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow-md">
//           ✨ Create Your Account
//         </h2>
//         <p className="text-center text-gray-600 text-sm">
//           Join us today! Fill in the details below to get started 🚀
//         </p>

//         {/* Common Fields */}
//         <InputField
//           icon={FaUser}
//           label="Full Name"
//           name="fullName"
//           placeholder="Enter your full name"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           icon={FaEnvelope}
//           label="Email"
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           icon={FaLock}
//           label="Password"
//           type="password"
//           name="password"
//           placeholder="Create a password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           icon={FaPhone}
//           label="Contact Number"
//           type="text"
//           name="phone"
//           placeholder="Enter your phone number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//         <InputField
//           icon={FaBuilding}
//           label="Department"
//           type="text"
//           name="department"
//           placeholder="Enter your department"
//           value={formData.department}
//           onChange={handleChange}
//           required
//         />

//         {/* Role Dropdown */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Role
//           </label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleRoleChange}
//             required
//             className="w-full px-4 py-3 rounded-xl border border-orange-300 
//               focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 shadow-sm 
//               text-base bg-orange-50 hover:bg-orange-100 transition"
//           >
//             <option value="">Select Role</option>
//             <option value="student">🎓 Student</option>
//             <option value="staff">👩‍🏫 Staff</option>
//           </select>
//         </div>

//         {/* Conditional Fields */}
//         {formData.role === "student" && (
//           <div className="space-y-4">
//             <InputField
//               icon={FaIdCard}
//               label="Enrollment Number"
//               name="enrollmentNo"
//               placeholder="Enter enrollment number"
//               value={formData.enrollmentNo}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               icon={FaHashtag}
//               label="Semester"
//               name="semester"
//               placeholder="Enter semester"
//               value={formData.semester}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               icon={FaCalendarAlt}
//               label="Year"
//               name="year"
//               placeholder="Enter year"
//               value={formData.year}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         )}

//         {formData.role === "staff" && (
//           <InputField
//             icon={FaIdCard}
//             label="Staff ID"
//             name="staffId"
//             placeholder="Enter staff ID"
//             value={formData.staffId}
//             onChange={handleChange}
//             required
//           />
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 
//             text-white font-bold rounded-xl hover:scale-[1.02] 
//             hover:shadow-lg transition-all duration-300 text-lg"
//         >
//           Sign Up 🚀
//         </button>

//         <p className="text-center text-gray-600 text-sm">
//           Already have an account?{" "}
//           <span className="text-orange-600 font-semibold cursor-pointer hover:underline">
//             Login here
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default SignupForm;





import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaBuilding,
  FaIdCard,
  FaHashtag,
  FaCalendarAlt,
} from "react-icons/fa";

import InputField from "../signin/InputField";
import { signup } from "../../api/auth";

function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    role: "",
    enrollmentNo: "",
    semester: "",
    year: "",
    staffId: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleChange = (e) =>
    setFormData({ ...formData, role: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert("Signup successful!");
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <div className="relative z-10 w-full max-w-xl px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl space-y-6 border border-orange-200 animate-fadeIn"
      >
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow-md">
          ✨ Create Your Account
        </h2>
        <p className="text-center text-gray-600 text-base">
          Fill in the details below and join us 🚀
        </p>

        {/* Common Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            icon={FaUser}
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <InputField
            icon={FaEnvelope}
            type="email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            icon={FaLock}
            type="password"
            label="Password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <InputField
            icon={FaPhone}
            label="Contact Number"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <InputField
            icon={FaBuilding}
            label="Department"
            name="department"
            placeholder="Enter your department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-orange-300 
              focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 shadow-sm 
              text-base bg-orange-50 hover:bg-orange-100 transition"
          >
            <option value="">Select Role</option>
            <option value="student">🎓 Student</option>
            <option value="staff">👩‍🏫 Staff</option>
          </select>
        </div>

        {/* Conditional Fields */}
        {formData.role === "student" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InputField
              icon={FaIdCard}
              label="Enrollment Number"
              name="enrollmentNo"
              placeholder="Enter enrollment number"
              value={formData.enrollmentNo}
              onChange={handleChange}
              required
            />
            <InputField
              icon={FaHashtag}
              label="Semester"
              name="semester"
              placeholder="Enter semester"
              value={formData.semester}
              onChange={handleChange}
              required
            />
            <InputField
              icon={FaCalendarAlt}
              label="Year"
              name="year"
              placeholder="Enter year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {formData.role === "staff" && (
          <InputField
            icon={FaIdCard}
            label="Staff ID"
            name="staffId"
            placeholder="Enter staff ID"
            value={formData.staffId}
            onChange={handleChange}
            required
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 
            text-white font-bold rounded-xl hover:scale-[1.02] 
            hover:shadow-lg transition-all duration-300 text-lg"
        >
          Sign Up 🚀
        </button>

        {/* Login link */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-orange-600 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
