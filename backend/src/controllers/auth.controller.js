import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const handleGoogleAuth = async (req, res) => {
  try {
    const { email, displayName, photoURL } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: displayName,
        email,
        password: Math.random().toString(36).slice(-8),
        photoURL
      });
    }

    console.log(`Google auth successful for user: ${email}`);
    res.json({ token: generateToken(user._id), user });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: "Google authentication failed", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });

    res.json({ token: generateToken(user._id), user });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    console.log(`User logged in successfully: ${email}`);
    res.json({ token: generateToken(user._id), user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export { register, login, handleGoogleAuth };