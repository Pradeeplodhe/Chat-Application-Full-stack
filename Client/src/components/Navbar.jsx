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
    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
        💬 ChatSphere
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-white font-medium text-lg drop-shadow-sm">
          {user?.fullName}
        </span>

        {/* Profile Button */}
        <Link
          to="/profile"
          className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-semibold"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
