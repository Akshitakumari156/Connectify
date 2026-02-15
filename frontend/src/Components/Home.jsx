import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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