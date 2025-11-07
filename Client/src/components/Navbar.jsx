import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-lg sticky top-0 z-50 overflow-hidden">
      {/* Water ripple animation */}
      <span className="absolute inset-0 animate-wave bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 opacity-20"></span>

      <h1 className="relative text-2xl font-bold text-white tracking-wide drop-shadow-lg animate-float">
        💬 ChatSphere
      </h1>

      <div className="relative flex items-center gap-4">
        <span className="text-white font-medium text-lg drop-shadow-sm animate-fadeIn">
          {user?.fullName}
        </span>

        {/* Profile Button */}
        <Link
          to="/profile"
          className="relative bg-blue-400 hover:bg-blue-500 transition-all duration-500 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-2 font-semibold before:absolute before:-inset-1 before:rounded-xl before:bg-white/10 before:blur-xl before:opacity-0 before:transition-all before:duration-500 hover:before:opacity-100"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="relative bg-red-400 hover:bg-red-500 transition-all duration-500 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-2 font-semibold before:absolute before:-inset-1 before:rounded-xl before:bg-white/10 before:blur-xl before:opacity-0 before:transition-all before:duration-500 hover:before:opacity-100"
        >
          Logout
        </button>
      </div>

      {/* Floating bubbles */}
      <span className="absolute w-4 h-4 bg-white/30 rounded-full animate-bubble top-2 left-10"></span>
      <span className="absolute w-6 h-6 bg-white/20 rounded-full animate-bubble delay-200 top-10 left-20"></span>
      <span className="absolute w-3 h-3 bg-white/40 rounded-full animate-bubble delay-400 top-16 left-32"></span>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes wave {
          0% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(0%) translateY(5px); }
          100% { transform: translateX(-50%) translateY(0); }
        }
        .animate-wave { animation: wave 8s ease-in-out infinite; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }

        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-40px) scale(1); opacity: 0; }
        }
        .animate-bubble { animation: bubble 6s linear infinite; }
        .animate-bubble.delay-200 { animation-delay: 2s; }
        .animate-bubble.delay-400 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
