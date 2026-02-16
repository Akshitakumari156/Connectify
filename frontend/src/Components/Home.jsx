import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {io} from "socket.io-client";
import { useEffect,useRef } from "react";
export default function Home() {
  const navigate = useNavigate();
  const socketRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to Socket.IO server:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl mb-6">You are logged in 🔐</h1>

      <button
        onClick={handleLogout}
        className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}