import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../assets/logo.jpeg";
import {motion} from "framer-motion";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ AUTO REDIRECT IF LOGGED IN
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  // ✅ GOOGLE LOGIN
  const handleSuccess = async (e) => {
    try {
      const res = await api.post("/auth/google", {
        token: e.credential,
      });

      localStorage.setItem("token", res.data.token);

      // ✅ FIX HERE
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login success ✅");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ NORMAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.data.accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.data.user)
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 text-white flex-col justify-center items-center p-10">
    
//     <h1 className="text-4xl font-bold mb-2">PhoneAdda</h1>
//     <p className="text-lg text-gray-200 mb-6">
//       All Phones. One Adda.
//     </p>

//     <img 
//       src={logo} 
//       alt="phones"
//       className="w-80"
//     />
//   </div>
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Login to MobileStore
//         </h2>

//         {/* ✅ GOOGLE LOGIN */}
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={() => console.log("Login Failed")}
//         />

//         <form onSubmit={handleSubmit} className="space-y-4 mt-4">

//           {/* Email */}
//           <div>
//             <label className="block mb-1 text-gray-600">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border rounded-lg"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 text-gray-600">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border rounded-lg"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Forgot Password */}
//           <p
//             className="text-blue-500 cursor-pointer"
//             onClick={() => navigate("/forgot-password")}
//           >
//             Forgot Password?
//           </p>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//         {/* Footer */}
//         <p className="text-sm text-center mt-4 text-gray-500">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             className="text-blue-600 cursor-pointer"
//           >
//             Register
//           </span>
//         </p>

//       </div>

//     </div>
//   );
return (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Container */}
    <div className="relative z-10 flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">

      {/* LEFT SIDE */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 flex-col justify-center items-center text-white p-10 bg-white/10 backdrop-blur-md"
      >
        <img src={logo} alt="logo" className="w-40 mb-4" />

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
          Welcome Back
        </h2>

        {/* Google Login */}
        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p
            className="text-sm text-gray-300 cursor-pointer hover:text-white"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          {/* Animated Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </motion.div>
    </div>
  </div>
);
 };


 export default Login;