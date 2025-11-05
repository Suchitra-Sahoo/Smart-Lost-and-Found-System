const User = require("../models/User");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

// Get all students and their reported items
exports.getAllStudentsWithItems = async (req, res) => {
  try {
    // Access check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Fetch all students
    const students = await User.find({ role: "student" }).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    // For each student, find their lost & found items
    const result = await Promise.all(
      students.map(async (student) => {
        const lostItems = await LostItem.find({ userEmail: student.email });
        const foundItems = await FoundItem.find({ userEmail: student.email });

        return {
          ...student.toObject(),
          lostItems,
          foundItems,
        };
      })
    );

    res.json({ students: result });
  } catch (error) {
    console.error("Error fetching students with items:", error);
    res.status(500).json({
      message: "Failed to fetch students and their items",
      error: error.message,
    });
  }
};

// Get all staff and their reported items
exports.getAllStaffWithItems = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const staff = await User.find({ role: "staff" }).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    const result = await Promise.all(
      staff.map(async (member) => {
        const lostItems = await LostItem.find({ userEmail: member.email });
        const foundItems = await FoundItem.find({ userEmail: member.email });

        return {
          ...member.toObject(),
          lostItems,
          foundItems,
        };
      })
    );

    res.json({ staff: result });
  } catch (error) {
    console.error("Error fetching staff with items:", error);
    res.status(500).json({
      message: "Failed to fetch staff and their items",
      error: error.message,
    });
  }
};
