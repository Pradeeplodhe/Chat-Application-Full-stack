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
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-blue-900">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[200%] h-[200%] top-0 left-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-70 animate-gradientShift"></div>
      </div>

      {/* Large Floating Bubbles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/20 animate-bubbleLarge"
          style={{
            width: `${Math.random() * 50 + 30}px`, // 30px - 80px
            height: `${Math.random() * 50 + 30}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 10}s`, // slower for big bubbles
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.3 + 0.2,
          }}
        />
      ))}

      {/* Glassmorphic Form */}
      <form
        className="relative bg-white/20 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-6 animate-fadeIn scale-95 hover:scale-100 transition-transform duration-700"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-extrabold text-white text-center animate-floatGlow">
          💧 Login
        </h2>

        {error && <p className="text-red-400 mb-2 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-white/30 border border-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-70 transition-all duration-300 backdrop-blur-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-white/30 border border-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-70 transition-all duration-300 backdrop-blur-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="relative w-full p-4 bg-blue-400 hover:bg-blue-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
          Login
          <span className="absolute inset-0 bg-white/20 scale-0 hover:scale-100 transition-transform duration-500 rounded-2xl"></span>
        </button>

        <p className="text-white text-center mt-2">
          Don't have an account?{" "}
          <Link className="text-blue-200 hover:text-white font-semibold underline" to="/signup">
            Signup
          </Link>
        </p>
      </form>

      {/* Tailwind Custom Animations */}
      <style>{`
        @keyframes floatGlow {
          0%, 100% { transform: translateY(0); text-shadow: 0 0 10px rgba(255,255,255,0.4); }
          50% { transform: translateY(-6px); text-shadow: 0 0 20px rgba(255,255,255,0.6); }
        }
        .animate-floatGlow { animation: floatGlow 4s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }

        @keyframes bubbleLarge {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(10px) scale(1.1); opacity: 0.4; }
          50% { transform: translateY(-60px) translateX(-10px) scale(1.2); opacity: 0.5; }
          75% { transform: translateY(-90px) translateX(5px) scale(1.1); opacity: 0.3; }
          100% { transform: translateY(-120px) translateX(0) scale(1); opacity: 0; }
        }
        .animate-bubbleLarge { animation-name: bubbleLarge; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientShift {
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
        }
      `}</style>
    </div>
  );
}
