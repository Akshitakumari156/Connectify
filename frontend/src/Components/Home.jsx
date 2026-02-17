import { logout, getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const socketRef = useRef(null);

  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]); // pinned chats (like WhatsApp left list)

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Socket connect
  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      auth: { token: getToken() },
      transports: ["websocket"],
    });

    socketRef.current.on("private_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  // 🔎 Search users
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    const t = setTimeout(() => {
      fetch(`http://localhost:5000/users/search?q=${search}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
        // console.log("Search results for:", search);
    }, 300);
    // console.log(`i am t ${t}`);
    return () => clearTimeout(t);
  }, [search]);
  
  // Open chat (pin to sidebar + load messages)
  const openChat = (user) => {
  setSelectedChat(user); // user already has _id

  setChats((prev) => {
    const exists = prev.find((c) => c._id === user._id);
    if (exists) return prev;
    return [{ _id: user._id, name: user.name }, ...prev];
  });

  fetch(`http://localhost:5000/messages/${user._id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setMessages(data));

  setSearch("");
  setSearchResults([]);
};

  return (
    <div className="h-screen w-screen flex bg-gradient-to-br from-[#0b1020] via-[#1b1b3a] to-[#2e1065] text-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-3">💬 Chat App</h2>

        {/* 🔎 Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username..."
          className="mb-2 px-3 py-2 rounded-xl bg-white/20 outline-none placeholder-white/50"
        />

        {/* Search results */}
        {searchResults.length > 0 && (
          <div className="mb-3 bg-white/10 rounded-xl p-2 max-h-40 overflow-y-auto">
            {searchResults.map((u) => (
              <div
                key={u._id}
                onClick={() => openChat(u)}
                className="p-2 rounded-lg hover:bg-white/20 cursor-pointer"
              >
                {u.name}
              </div>
            ))}
          </div>
        )}

        {/* Pinned chats (like WhatsApp left list) */}
        <div className="flex-1 space-y-2 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => openChat(chat)}
              className={`p-3 rounded-xl cursor-pointer 
                ${selectedChat?._id === chat._id ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              {chat.name}
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {!selectedChat ? (
          <div className="flex-1 flex items-center justify-center text-white/60">
            Select a user to start chatting 💬
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-white/10 font-semibold">
              Chat with {selectedChat.name}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className="bg-white/20 px-3 py-2 rounded-xl w-fit">
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 outline-none"
              />
              <button
                onClick={() => {
                  if (!message || !selectedChat) return;
                   console.log("Sending message to:", selectedChat._id, "Text:", message);
                   socketRef.current.emit("private_message", {
                    receiverId: selectedChat._id,
                    text: message,
                  });

                  setMessage("");
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-[1.03] transition"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}