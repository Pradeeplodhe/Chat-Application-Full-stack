// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import { genrateToken } from "../lib/utiles.js";
// import cloudinary from "../lib/cloudinary.js";

// export const signup = async (req, res) => {
//   try {
//     const { fullName, email, password, bio } = req.body;
//     if (!fullName || !email || !password || !bio)
//       return res.json({ success: false, message: "Missing details" });

//     const userExist = await User.findOne({ email });
//     if (userExist) return res.json({ success: false, message: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await User.create({ fullName, email, password: hashedPassword, bio });
//     const token = genrateToken(newUser._id);

//     res.json({ success: true, userData: newUser, token, message: "Account created successfully" });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userData = await User.findOne({ email });
//     if (!userData) return res.json({ success: false, message: "User not found" });

//     const isPasswordCorrect = await bcrypt.compare(password, userData.password);
//     if (!isPasswordCorrect) return res.json({ success: false, message: "Invalid credentials" });

//     const token = genrateToken(userData._id);
//     res.json({ success: true, userData, token, message: "Login successful" });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export const checkAuth = (req, res) => res.json({ success: true, user: req.user });

// export const updateprofile = async (req, res) => {
//   try {
//     const { profilePic, bio, fullName } = req.body;
//     const userId = req.user._id;

//     let updatedUser;
//     if (!profilePic) {
//       updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
//     } else {
//       const upload = await cloudinary.uploader.upload(profilePic);
//       updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { profilePic: upload.secure_url, bio, fullName },
//         { new: true }
//       );
//     }
//     res.json({ success: true, user: updatedUser });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };






import User from "../models/User.js";
import Message from "../models/Message.js";
import { io, userSocketMap } from "../server.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    const unseenMessages = {};
    await Promise.all(
      users.map(async (u) => {
        const messages = await Message.find({ senderId: u._id, receiverId: userId, seen: false });
        if (messages.length) unseenMessages[u._id] = messages.length;
      })
    );

    res.json({ success: true, users, unseenMessages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    await Message.updateMany({ senderId: selectedUserId, receiverId: myId, seen: false }, { seen: true });

    res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({ senderId, receiverId, text, image: imageUrl });

    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

    res.json({ success: true, newMessage });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
