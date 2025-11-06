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

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-inner gap-2"
    >
      <input
        type="text"
        placeholder={`Message ${selectedUser?.fullName || ""}`}
        className="flex-1 px-4 py-3 rounded-3xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder-gray-400 dark:placeholder-gray-300"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all font-semibold flex items-center justify-center"
      >
        Send
      </button>
    </form>
  );
}
