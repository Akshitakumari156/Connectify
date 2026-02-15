import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./App.css";

export default function Welcome() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#1b1b3a] to-[#2e1065] relative">
      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-pink-500/30 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[520px] h-[520px] bg-indigo-500/30 rounded-full blur-[140px]" />

      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-7xl grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Left */}
          <div className="text-white space-y-6">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold leading-tight"
            >
              Connectify ✨
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
                Group chats, but smarter.
              </span>
            </motion.h1>

            <p className="text-white/80 text-lg max-w-xl">
              Send messages as a team. Let multiple members co-sign a single
              message before it goes to the group. No awkward “who will send?”
              moments anymore.
            </p>

            <div className="flex gap-4 pt-2">
              <Link
                to="/login"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 font-semibold text-white shadow-2xl hover:scale-105 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 font-semibold text-white hover:bg-white/20 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Right: Group Co-sign Feature Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6">
              <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-5 space-y-5">
                {/* Group Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">Design Team</p>
                    <p className="text-xs text-white/60">10 members • Group chat</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                    New Feature ✨
                  </span>
                </div>

                {/* Co-sign avatars */}
                <div>
                  <p className="text-xs text-white/60 mb-2">
                    Message sent on behalf of:
                  </p>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {["A", "D", "S", "M"].map((x, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold border-2 border-[#1b1b3a]"
                        >
                          {x}
                        </div>
                      ))}
                    </div>
                    <span className="ml-4 text-xs text-white/70">
                      4 members approved
                    </span>
                  </div>
                </div>

                {/* Co-signed message bubble */}
                <div className="max-w-sm bg-gradient-to-r from-pink-500 to-indigo-500 text-white p-4 rounded-2xl rounded-br-none shadow-lg">
                  <p className="text-sm">
                    Hey everyone! We’ve finalized the new color system and will
                    push it today 🚀
                  </p>
                  <p className="text-[11px] text-white/80 mt-2">
                    Co-signed by Alex, Dev, Sarah & Mike
                  </p>
                </div>

                {/* Disabled input preview */}
                <div className="flex gap-2 pt-2">
                  <input
                    disabled
                    placeholder="Waiting for approvals..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 outline-none"
                  />
                  <button
                    disabled
                    className="px-5 rounded-xl bg-white/20 text-white/60 cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>

                {/* Feature label */}
                <p className="text-xs text-white/60 italic">
                  Unique feature: co-signed group messages.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}