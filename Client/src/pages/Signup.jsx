// import { useState, useContext } from "react";
// import axios from "../utils/axiosInstance.js";
// import { AuthContext } from "../context/AuthContext.jsx";
// import { useNavigate, Link } from "react-router-dom";

// export default function Signup() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [bio, setBio] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/signup", {
//         fullName,
//         email,
//         password,
//         bio,
//       });
//       if (res.data.success) {
//         login(res.data.userData, res.data.token);
//         navigate("/chat");
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <form
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full p-3 mb-4 border rounded"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 mb-4 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 mb-4 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Bio"
//           className="w-full p-3 mb-4 border rounded"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           required
//         />
//         <button className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition">
//           Signup
//         </button>
//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <Link className="text-blue-500" to="/">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }





import { useState, useContext } from "react";
import axios from "../utils/axiosInstance.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", { fullName, email, password, bio });
      if (res.data.success) {
        login(res.data.userData, res.data.token);
        navigate("/chat");
      } else setError(res.data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 border rounded" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-4 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <textarea placeholder="Bio" className="w-full p-3 mb-4 border rounded" value={bio} onChange={(e) => setBio(e.target.value)} required />
        <button className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition">Signup</button>
        <p className="mt-4 text-center">
          Already have an account? <Link className="text-blue-500" to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
