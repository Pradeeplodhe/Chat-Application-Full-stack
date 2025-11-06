// import { useState, useContext } from "react";
// import axios from "../utils/axiosInstance.js";
// import { AuthContext } from "../context/AuthContext.jsx";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("hii")
//     try {
//        console.log(email,password)
//       const res = await axios.post("/auth/login", { email, password });
//         console.log(res.data)
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
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
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
//         <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">
//           Login
//         </button>
//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <Link className="text-blue-500" to="/signup">
//             Signup
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

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-4 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">Login</button>
        <p className="mt-4 text-center">
          Don't have an account? <Link className="text-blue-500" to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
