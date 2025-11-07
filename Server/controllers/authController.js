import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { genrateToken } from "../lib/utiles.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;
    if (!fullName || !email || !password || !bio)
      return res.json({ success: false, message: "Missing details" });

    const userExist = await User.findOne({ email });
    if (userExist) return res.json({ success: false, message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ fullName, email, password: hashedPassword, bio });
    const token = genrateToken(newUser._id);

    res.json({ success: true, userData: newUser, token, message: "Account created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) return res.json({ success: false, message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) return res.json({ success: false, message: "Invalid credentials" });

    const token = genrateToken(userData._id);
    res.json({ success: true, userData, token, message: "Login successful" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const checkAuth = (req, res) => res.json({ success: true, user: req.user });

export const updateprofile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
   

    console.log(profilePic)

    const userId = req.user._id;

    let updatedUser;
    if (!profilePic) {
        // console.log("✅ Updated User:", updatedUser);
      updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
    } else {
        // console.log("✅ Updated User:", updatedUser);
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }
    //  console.log("✅ Updated User:", updatedUser);
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    //  console.log("✅ Updated User:", updatedUser);
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
