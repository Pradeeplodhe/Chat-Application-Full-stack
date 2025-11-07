import { useState, useContext } from "react";
import axios from "../utils/axiosInstance.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user.fullName);
  const [bio, setBio] = useState(user.bio || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [preview, setPreview] = useState(user.profilePic || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setProfilePic(reader.result); // ✅ Move this inside here
    };
    reader.readAsDataURL(file);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put("/auth/update-profile", { fullName, bio, profilePic });
      console.log(profilePic,fullName,bio)
      console.log(res.data.user)
      if (res.data.success) {
        login(res.data.user, localStorage.getItem("token"));
        setMessage("✅ Profile updated successfully!");
      }
    } catch (err) {
      console.log(err.message);
      setMessage("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#111] p-6 text-gray-100">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl rounded-3xl w-full max-w-lg p-8 text-center transition-transform duration-500 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent tracking-wide">
          My Profile
        </h2>

        {message && (
          <p className="mb-4 text-sm font-medium bg-white/10 text-green-400 rounded-md p-2">
            {message}
          </p>
        )}

        {/* Profile Image */}
        <div className="relative mb-6">
          <img
            src={preview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-purple-600/40 shadow-lg shadow-purple-900/40 transition-transform duration-500 hover:scale-105"
          />
          <label className="absolute bottom-1 right-[40%] bg-purple-600/80 text-white px-2 py-1 text-xs rounded-md cursor-pointer hover:bg-purple-500 transition">
            📸 Edit
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          {[
            { label: "Followers", value: 248 },
            { label: "Following", value: 312 },
            { label: "Posts", value: 56 },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-3 shadow-md hover:bg-purple-600/10 transition"
            >
              <p className="text-2xl font-semibold text-purple-400">{stat.value}</p>
              <p className="text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input */}
          <div className="relative">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="peer w-full bg-transparent border-b-2 border-gray-600 text-gray-100 placeholder-transparent focus:outline-none focus:border-purple-400 transition"
              placeholder="Full Name"
            />
            <label className="absolute left-0 -top-3.5 text-sm text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all">
              Full Name
            </label>
          </div>

          {/* Bio Input */}
          <div className="relative">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              rows="3"
              className="peer w-full bg-transparent border-b-2 border-gray-600 text-gray-100 placeholder-transparent focus:outline-none focus:border-purple-400 transition resize-none"
            ></textarea>
            <label className="absolute left-0 -top-3.5 text-sm text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all">
              Bio
            </label>
          </div>

          {/* Update Button */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold p-3 rounded-xl shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Progress Bar */}
        <div className="mt-6">
          <p className="text-sm mb-1 opacity-80">Profile Completion</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-lime-500 h-2 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(
                  ((fullName ? 1 : 0) + (bio ? 1 : 0) + (profilePic ? 1 : 0)) / 3 * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <p className="text-gray-500 text-xs mt-6">© 2025 YourApp | Dark UI by Pradeep 💻</p>
    </div>
  );
}
