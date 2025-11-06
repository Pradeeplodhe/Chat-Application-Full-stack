import React from "react";

export default function Sidebar({ users, onlineUsers, selectedUser, setSelectedUser }) {
  return (
    <div className="w-1/4 min-w-[280px] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto shadow-xl">
      <h2 className="text-3xl font-bold p-5 border-b border-gray-300 dark:border-gray-700 sticky top-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent z-10">
        Users
      </h2>
      <ul className="p-2">
        {users.map((u) => {
          const isSelected = selectedUser?._id === u._id;
          const isOnline = onlineUsers.includes(u._id);

          return (
            <li
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`flex justify-between items-center p-4 mb-3 rounded-2xl cursor-pointer transition-all duration-300
                ${isSelected ? "bg-blue-100 dark:bg-blue-700 shadow-lg scale-105" : "hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"}`}
            >
              <span className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-purple-400 via-pink-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {u.fullName.charAt(0)}
                </div>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-100">{u.fullName}</span>
              </span>
              {isOnline && (
                <span className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-md ring-2 ring-white dark:ring-gray-900"></span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
