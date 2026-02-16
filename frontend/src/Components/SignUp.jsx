import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupApi } from "../api/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    const res = await signupApi({ name, email, password });

    if (res.msg || res.message) {
      setMsg(res.msg || res.message);
    } else {
      setMsg("Verification email sent. Check your inbox!");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0b1020] via-[#1b1b3a] to-[#2e1065] flex items-center justify-center">
      <motion.div className="w-full max-w-md bg-white/10 p-8 rounded-3xl text-white">
        <h1 className="text-3xl font-bold mb-4">Create account ✨</h1>

        <input onChange={(e) => setName(e.target.value)} placeholder="Username" className="w-full p-3 mb-3 rounded-xl bg-white/20" />
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-3 rounded-xl bg-white/20" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-3 rounded-xl bg-white/20" />

        <button onClick={handleSignup} className="w-full py-3 bg-pink-500 rounded-xl font-semibold">
          Sign Up
        </button>

        {msg && <p className="mt-3 text-sm text-green-400">{msg}</p>}

        <p className="text-sm mt-4">
          Already have an account? <Link to="/login" className="text-indigo-400">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}