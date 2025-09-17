const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");

// Student/Staff Signup
exports.signup = async (req, res) => {
  try {
    const {
      role,
      fullName,
      email,
      contactNumber,
      enrollmentNumber,
      semester,
      year,
      staffId,
      department,
      password,
    } = req.body;

    if (role === "admin") {
      return res.status(400).json({ message: "Admin cannot signup" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      fullName,
      email,
      contactNumber,
      enrollmentNumber,
      semester,
      year,
      staffId,
      department,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// Signin (Student, Staff, Admin)
exports.signin = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    // Admin login
    if (role === "admin") {
      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(400).json({ message: "Invalid admin password" });
      }

      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ message: "Admin signed in", token });
    }

    // Student/Staff login
    const user = await User.findOne({ email, role });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Signin successful", token });
  } catch (error) {
    res.status(500).json({ message: "Signin failed", error: error.message });
  }
};

// Forgot Password 
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save token and expiry in DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // return the reset token URL in response for testing
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    res.json({ message: "Password reset link generated", resetUrl });
  } catch (error) {
    res.status(500).json({ message: "Forgot password failed", error: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password and save
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Reset password failed", error: error.message });
  }
};
