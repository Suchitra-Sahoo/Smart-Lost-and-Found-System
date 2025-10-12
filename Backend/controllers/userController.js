const User = require("../models/User");

// Get total users (admin only)
exports.getTotalUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    console.error("Get Total Users Error:", error);
    res.status(500).json({ message: "Failed to fetch total users", error: error.message });
  }
};

// Optional: Get breakdown by role
exports.getUserStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const students = await User.countDocuments({ role: "student" });
    const staff = await User.countDocuments({ role: "staff" });

    res.json({ totalStudents: students, totalStaff: staff });
  } catch (error) {
    console.error("Get User Stats Error:", error);
    res.status(500).json({ message: "Failed to fetch user stats", error: error.message });
  }
};
