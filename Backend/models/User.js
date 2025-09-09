const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["student", "staff", "admin"],
      required: true,
    },

    // Common fields
    fullName: {
      type: String,
      required: function () {
        return this.role !== "admin";
      },
    },
    email: {
      type: String,
      required: function () {
        return this.role !== "admin";
      },
      unique: function () {
        return this.role !== "admin";
      },
    },
    contactNumber: {
      type: String,
      required: function () {
        return this.role !== "admin";
      },
    },

    // Student-only
    enrollmentNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
      unique: function () {
        return this.role === "student";
      },
    },
    semester: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },
    year: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },

    // Staff-only
    staffId: {
      type: String,
      required: function () {
        return this.role === "staff";
      },
      unique: function () {
        return this.role === "staff";
      },
    },

    department: {
      type: String,
      required: function () {
        return this.role === "student" || this.role === "staff";
      },
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
