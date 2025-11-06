import { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosInstance.js";
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import socket from "../utils/socket.js";
import Navbar from "../components/Navbar.jsx"; 

export default function Chat() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Connect socket
  useEffect(() => {
    if (!user) return;
    socket.auth = { userId: user._id };
    socket.connect();

    socket.on("getOnlineUsers", setOnlineUsers);

    return () => socket.disconnect();
  }, [user]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/messages/users");
      if (res.data.success) setUsers(res.data.users);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await axios.get(`/messages/${selectedUser._id}`);
        if (res.data.success) setMessages(res.data.messages);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  // Listen for new messages
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      if (selectedUser && msg.senderId === selectedUser._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off("newMessage");
  }, [selectedUser]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar with Logout */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          users={users}
          onlineUsers={onlineUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          className="w-80 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700"
        />

        {/* Chat Window */}
        <ChatWindow
          selectedUser={selectedUser}
          messages={messages}
          setMessages={setMessages}
          currentUser={user}
          className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto p-4"
        />
      </div>
    </div>
  );
}
