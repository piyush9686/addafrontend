import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate= useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/auth/reset-password/${token}`, { password });
    alert("Password updated");
    navigate('/login')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Update Password</button>
    </form>
  );
};

export default ResetPassword;