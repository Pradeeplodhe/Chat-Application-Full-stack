import { useState } from "react";
import axios from "../utils/axiosInstance.js";
import socket from "../utils/socket.js";

export default function MessageInput({ selectedUser, messages, setMessages, currentUser }) {
  const [text, setText] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(`/messages/send/${selectedUser._id}`, { text });
      if (res.data.success) {
        setMessages((prev) => [...prev, res.data.newMessage]);
        socket.emit("newMessage", res.data.newMessage);
        setText("");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Bubble count for input background
  const bubbleCount = 5;

  return (
    <div className="relative w-full">
      {/* Floating bubbles behind input */}
      {Array.from({ length: bubbleCount }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/20 animate-bubbleSmall"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            bottom: `${Math.random() * 10 + 2}px`,
            left: `${Math.random() * 90}%`,
            animationDuration: `${Math.random() * 8 + 5}s`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.4 + 0.2,
          }}
        />
      ))}

      <form
        onSubmit={handleSend}
        className="flex items-center p-4 bg-white/20 dark:bg-gray-700/20 border-t border-white/30 dark:border-gray-600/30 shadow-inner gap-2 backdrop-blur-md rounded-3xl"
      >
        <input
          type="text"
          placeholder={`Message ${selectedUser?.fullName || ""}`}
          className="flex-1 px-4 py-3 rounded-3xl border border-white/20 dark:border-gray-600/30 bg-white/30 dark:bg-gray-700/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder-white/70 dark:placeholder-gray-300 backdrop-blur-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="relative bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center justify-center overflow-hidden"
        >
          Send
          <span className="absolute inset-0 bg-white/20 scale-0 hover:scale-100 transition-transform duration-500 rounded-full"></span>
        </button>
      </form>

      {/* Animations */}
      <style>{`
        @keyframes bubbleSmall {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
          25% { transform: translateY(-10px) translateX(5px) scale(1.1); opacity: 0.4; }
          50% { transform: translateY(-25px) translateX(-5px) scale(1.2); opacity: 0.5; }
          75% { transform: translateY(-35px) translateX(2px) scale(1.1); opacity: 0.3; }
          100% { transform: translateY(-45px) translateX(0) scale(1); opacity: 0; }
        }
        .animate-bubbleSmall { animation-name: bubbleSmall; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
      `}</style>
    </div>
  );
}
