import React, { useRef, useEffect } from "react";
import MessageInput from "./MessageInput.jsx";

export default function ChatWindow({ selectedUser, messages, setMessages, currentUser }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-lg sm:text-xl italic">
        Select a user to start chatting
      </div>
    );

  return (
    <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 dark:scrollbar-thumb-blue-600 dark:scrollbar-track-gray-700">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-3 flex ${msg.senderId === currentUser._id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-xs break-words shadow-lg transform transition-all duration-300 
                ${msg.senderId === currentUser._id 
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:scale-105" 
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:scale-105"}`
              }
            >
              {msg.text}
              {msg.image && (
                <img
                  src={msg.image}
                  alt=""
                  className="mt-2 max-w-full rounded-xl shadow-sm object-cover"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Section */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <MessageInput
          selectedUser={selectedUser}
          messages={messages}
          setMessages={setMessages}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
