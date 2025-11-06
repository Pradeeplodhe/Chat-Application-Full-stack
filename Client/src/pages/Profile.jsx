// import { useState, useContext } from "react";
// import axios from "../utils/axiosInstance.js";
// import { AuthContext } from "../context/AuthContext.jsx";

// export default function Profile() {
//   const { user, login } = useContext(AuthContext);

//   const [fullName, setFullName] = useState(user.fullName);
//   const [bio, setBio] = useState(user.bio || "");
//   const [profilePic, setProfilePic] = useState(user.profilePic || "");
//   const [preview, setPreview] = useState(user.profilePic || "");
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setProfilePic(reader.result);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put("/auth/update-profile", {
//         fullName,
//         bio,
//         profilePic,
//       });
//       if (res.data.success) {
//         login(res.data.user, localStorage.getItem("token"));
//         setMessage("Profile updated successfully!");
//       }
//     } catch (err) {
//       console.log(err.message);
//       setMessage("Failed to update profile");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <form
//         className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col items-center"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-6">Profile</h2>
//         {message && <p className="text-green-500 mb-4">{message}</p>}

//         <div className="mb-4">
//           <img
//             src={preview || "https://via.placeholder.com/150"}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover mb-2"
//           />
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>

//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full p-3 mb-4 border rounded"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Bio"
//           className="w-full p-3 mb-4 border rounded"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//         />
//         <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// }






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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setProfilePic(reader.result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/auth/update-profile", { fullName, bio, profilePic });
      if (res.data.success) {
        login(res.data.user, localStorage.getItem("token"));
        setMessage("Profile updated successfully!");
      }
    } catch (err) {
      console.log(err.message);
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col items-center" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <div className="mb-4">
          <img src={preview || "https://via.placeholder.com/150"} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-2" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 border rounded" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <textarea placeholder="Bio" className="w-full p-3 mb-4 border rounded" value={bio} onChange={(e) => setBio(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">Update Profile</button>
      </form>
    </div>
  );
}
