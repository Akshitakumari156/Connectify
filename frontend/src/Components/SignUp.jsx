import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await API.post("/auth/signup", form);

      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold mb-2">Create account ✨</h1>
        <p className="text-white/70 mb-6">Join Connectify</p>

        <div className="space-y-4">
          <input
            name="name"
            onChange={handleChange}
            value={form.name}
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 outline-none"
            placeholder="Username"
          />
          <input
            name="email"
            onChange={handleChange}
            value={form.email}
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 outline-none"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 outline-none"
            placeholder="Password"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 font-semibold hover:scale-[1.02] transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>

        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
        {success && <p className="text-green-400 mt-3 text-sm">{success}</p>}

        <p className="text-sm text-white/70 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}