import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpeg";

const Register = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Google Register/Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registered with Google ✅");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Normal Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/auth/register", form);

      alert("Registered successfully ✅");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration failed ❌");
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

      {/* 🔥 Main Container */}
      <div className="relative z-10 flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex w-1/2 flex-col justify-center items-center text-white p-10 bg-white/10 backdrop-blur-md"
        >
          <motion.img
            src={logo}
            className="w-40 mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />

          <h1 className="text-4xl font-bold mb-2">PhoneAdda</h1>

          <p className="text-lg text-gray-200 text-center">
            All Phones. One Adda.
          </p>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg p-8 md:p-10 text-white"
        >

          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account 🚀
          </h2>

          {/* Google Register */}
          <div className="flex justify-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Register Failed")}
            />
          </div>

          <p className="text-center text-gray-300 mb-4">OR</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 focus:outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 focus:outline-none"
            />

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Creating..." : "Register"}
            </motion.button>

          </form>

          {/* Footer */}
          <p className="text-sm text-center mt-6 text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </motion.div>
      </div>
    </div>
  );
};

export default Register;