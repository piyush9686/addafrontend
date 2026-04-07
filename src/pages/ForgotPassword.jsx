import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });

      alert("Reset link sent to email ✅");
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9')",
      }}
    >
      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔥 Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot Password 
        </h2>

        <p className="text-sm text-gray-300 text-center mb-6">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>

        </form>

        {/* ✅ Back to Login */}
        <p
          className="text-center mt-4 text-blue-400 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>

      </motion.div>
    </div>
  );
};

export default ForgotPassword;