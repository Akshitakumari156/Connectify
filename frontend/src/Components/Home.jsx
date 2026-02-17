import { logout, getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
// 🔐 Decode userId from JWT
const getMyId = () => {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
};

export default function Home() {
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const myId = getMyId();

  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("selectedChat");
    localStorage.removeItem("recentChats");
    logout();
    navigate("/");
  };
  // 🔌 Socket connect
  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      auth: { token: getToken() },
      transports: ["websocket"],
    });

    socketRef.current.on("private_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socketRef.current.on("newMessage", (msg) => {
  // Agar current chat nahi hai → notify
  if (!selectedChat || msg.senderId !== selectedChat.id) {
    toast.success(`💬 ${msg.senderName}: ${msg.text}`);
  }

  // Messages update
  if (selectedChat && msg.senderId === selectedChat.id) {
    setMessages((prev) => [...prev, msg]);
  }
});
    return () => socketRef.current.disconnect();
  }, []);


 useEffect(() => {
  // ✅ Restore sidebar
  const savedChats = localStorage.getItem("recentChats");
  if (savedChats) {
    setChats(JSON.parse(savedChats));
  }

  // ✅ Restore selected chat
  const savedChat = localStorage.getItem("selectedChat");
  if (savedChat) {
    const chatUser = JSON.parse(savedChat);
    setSelectedChat(chatUser);

    fetch(`http://localhost:5000/messages/${chatUser.id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }
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
    }, 300);

    return () => clearTimeout(t);
  }, [search]);

  // 📂 Open chat
  const openChat = (user) => {
    const chatUser = { id: user._id, name: user.name };
    setSelectedChat(chatUser);
     localStorage.setItem("selectedChat", JSON.stringify(chatUser));
    setChats((prev) => {
      const exists = prev.find((c) => c.id === user._id);
      if (exists) return prev;
      const updated = exists ? prev : [chatUser, ...prev];

    // ✅ Save sidebar chats
    localStorage.setItem("recentChats", JSON.stringify(updated));
      return updated;
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

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username..."
          className="mb-2 px-3 py-2 rounded-xl bg-white/20 outline-none placeholder-white/50"
        />

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

        <div className="flex-1 space-y-2 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => openChat({ _id: chat.id, name: chat.name })}
              className={`p-3 rounded-xl cursor-pointer 
                ${selectedChat?.id === chat.id ? "bg-white/20" : "hover:bg-white/10"}`}
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

            {/* 📨 Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, i) => {
                const isMe = msg.sender?.toString() === myId;

                return (
                  <div
                    key={i}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[70%] 
                        ${isMe
                          ? "bg-pink-500 text-white rounded-br-sm"
                          : "bg-white/20 text-white rounded-bl-sm"
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ✍️ Input */}
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

                  socketRef.current.emit("private_message", {
                    receiverId: selectedChat.id,
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