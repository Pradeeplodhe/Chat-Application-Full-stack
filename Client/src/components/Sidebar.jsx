import React from "react";

export default function Sidebar({ users, onlineUsers, selectedUser, setSelectedUser }) {
  return (
    <div className="w-1/4 min-w-[280px] bg-gradient-to-b from-gray-900 via-black to-gray-800 border-r border-gray-700 overflow-y-auto shadow-xl relative">
      {/* Sidebar header */}
      <h2 className="text-3xl font-bold p-5 border-b border-gray-700 sticky top-0 bg-gradient-to-r from-blue-800 via-purple-800 to-cyan-700 bg-clip-text text-transparent z-10">
        Users
      </h2>

      {/* User list */}
      <ul className="p-2 relative z-10">
        {users.map((u) => {
          const isSelected = selectedUser?._id === u._id;
          const isOnline = onlineUsers.includes(u._id);

          return (
            <li
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`flex justify-between items-center p-4 mb-3 rounded-2xl cursor-pointer transition-all duration-300
                ${isSelected
                  ? "bg-gradient-to-r from-indigo-800 via-purple-800 to-blue-900 shadow-2xl scale-105 animate-selectedGlow text-white"
                  : "hover:bg-gray-800 hover:scale-105 hover:shadow-lg"}`}
            >
              <span className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-indigo-700 via-purple-700 to-blue-800 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-float">
                  {u.fullName.charAt(0)}
                </div>
                <span className="text-lg font-medium text-gray-100">{u.fullName}</span>
              </span>
              {isOnline && (
                <span className="w-4 h-4 bg-green-400 rounded-full animate-ping shadow-md ring-2 ring-gray-900"></span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Floating bubbles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full animate-bubble"
            style={{
              width: `${8 + Math.random() * 30}px`,
              height: `${8 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              bottom: `-${Math.random() * 50}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Moving wave overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-40 animate-wave"></div>

      {/* Light rays */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1/2 h-full bg-gradient-to-r from-white/10 to-transparent opacity-10 animate-lightRay"
            style={{
              left: `${i * 16}%`,
              animationDuration: `${12 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Swimming fish silhouettes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-2 bg-white/15 rounded-full animate-fish"
            style={{
              top: `${Math.random() * 80}%`,
              left: `-${Math.random() * 100}px`,
              animationDuration: `${6 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <style>
        {`
          /* Bubble animation */
          @keyframes bubble {
            0% { transform: translateY(0) scale(1); opacity: 0.3; }
            50% { transform: translateY(-50px) scale(1.2); opacity: 0.6; }
            100% { transform: translateY(-250px) scale(1); opacity: 0; }
          }
          .animate-bubble { animation: bubble linear infinite; }

          /* Avatar float */
          @keyframes float { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-6px);} }
          .animate-float { animation: float 3s ease-in-out infinite; }

          /* Selected user glow */
          @keyframes selectedGlow {
            0%,100%{box-shadow:0 0 15px rgba(0,255,255,0.5);}
            50%{box-shadow:0 0 25px rgba(0,255,255,0.8);}
          }
          .animate-selectedGlow { animation: selectedGlow 2s ease-in-out infinite; }

          /* Wave overlay */
          @keyframes wave { 0%{transform:translateX(-25%);} 50%{transform:translateX(25%);} 100%{transform:translateX(-25%);} }
          .animate-wave { animation: wave 6s ease-in-out infinite; }

          /* Light rays */
          @keyframes lightRay { 0%{transform:translateX(0);} 50%{transform:translateX(10px);} 100%{transform:translateX(0);} }
          .animate-lightRay { animation: lightRay linear infinite; }

          /* Fish swimming */
          @keyframes fish { 0%{transform:translateX(0);} 100%{transform:translateX(110vw);} }
          .animate-fish { animation: fish linear infinite; }
        `}
      </style>
    </div>
  );
}
