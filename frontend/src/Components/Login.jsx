import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0b1020] via-[#1b1b3a] to-[#2e1065] flex items-center justify-center relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back 👋</h1>
        <p className="text-white/70 mb-6">Login to Connectify</p>

        <div className="space-y-4">
          <input className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 outline-none" placeholder="Email" />
          <input className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 outline-none" type="password" placeholder="Password" />

          <button
            onClick={() => navigate("/enter")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 font-semibold hover:scale-[1.02] transition"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-white/70 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}