import React, { useRef, useEffect } from "react";
import MessageInput from "./MessageInput.jsx";

export default function ChatWindow({ selectedUser, messages, setMessages, currentUser }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser)
    return (
      <div className="flex-1 flex items-center justify-center text-cyan-400 text-lg sm:text-xl italic animate-pulse">
        🌊 Select a user to start chatting 🌊
      </div>
    );

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-100 via-teal-100 to-cyan-200 dark:from-gray-900 dark:via-blue-950 dark:to-cyan-900 transition-all duration-500 relative overflow-hidden">
      {/* Background Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-cyan-300 dark:bg-cyan-600 rounded-full opacity-30 animate-bubble"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-cyan-100 dark:scrollbar-thumb-cyan-600 dark:scrollbar-track-gray-800 relative z-10">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-4 flex transition-all duration-300 ${
              msg.senderId === currentUser._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-3xl max-w-xs break-words shadow-lg transform transition-all duration-500 animate-messagePop ${
                msg.senderId === currentUser._id
                  ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white border border-cyan-300 shadow-cyan-500/40 hover:shadow-cyan-300 hover:scale-105 animate-glow"
                  : "bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 border border-teal-300 shadow-teal-400/30 hover:shadow-teal-200 hover:scale-105 animate-glowSoft"
              }`}
            >
              {msg.text}
              {msg.image && (
                <img
                  src={msg.image}
                  alt=""
                  className="mt-2 max-w-full rounded-xl shadow-md animate-fadeIn"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Section */}
      <div className="p-3 border-t border-cyan-300 dark:border-cyan-800 bg-cyan-50/60 dark:bg-gray-900/60 backdrop-blur-md z-10">
        <MessageInput
          selectedUser={selectedUser}
          messages={messages}
          setMessages={setMessages}
          currentUser={currentUser}
        />
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-500px) scale(1.2); opacity: 0.7; }
          100% { transform: translateY(-1000px) scale(0.8); opacity: 0; }
        }
        .animate-bubble {
          animation: bubble 12s linear infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(6, 182, 212, 0.6), 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 25px rgba(6, 182, 212, 0.9), 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glowSoft {
          0%, 100% { box-shadow: 0 0 5px rgba(94, 234, 212, 0.3); }
          50% { box-shadow: 0 0 15px rgba(94, 234, 212, 0.6); }
        }
        .animate-glowSoft {
          animation: glowSoft 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }

        @keyframes messagePop {
          0% { transform: scale(0.8) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-messagePop {
          animation: messagePop 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
