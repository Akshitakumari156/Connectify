import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginApi } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await loginApi({ email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/enter");
    } else {
      setError(res.msg || res.message || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0b1020] via-[#1b1b3a] to-[#2e1065] flex items-center justify-center">
      <motion.div className="w-full max-w-md bg-white/10 p-8 rounded-3xl text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome back 👋</h1>

        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-3 rounded-xl bg-white/20" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-3 rounded-xl bg-white/20" />

        <button onClick={handleLogin} className="w-full py-3 bg-indigo-500 rounded-xl font-semibold">
          Login
        </button>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <p className="text-sm mt-4">
          Don’t have an account? <Link to="/signup" className="text-pink-400">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}