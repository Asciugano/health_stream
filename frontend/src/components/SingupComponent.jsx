import React, { useState } from "react";
import axios from "axios";
import { LucideMail, User, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SingupComponent({ onSingup }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [viewPsw, setViewPasswd] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('http://localhost:8000/singup', formData);
      const { access_token } = res.data
      localStorage.setItem('token', access_token);
      onSingup(access_token);

      navigate('/');
    } catch (e) {
      setError("Errore nella registrazione");
      console.error(e.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registrati</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="flex items-center border rounded-md px-3 py-2">
          <LucideMail className="mr-2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        {/* Username */}
        <div className="flex items-center border rounded-md px-3 py-2">
          <User className="mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="w-full outline-none"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        {/* Password */}
        <div className="flex items-center border rounded-md px-3 py-2">
          <Lock className="mr-2 text-gray-400" />
          <input
            type={viewPsw ? "text" : "password"}
            placeholder="Password"
            className="w-full outline-none"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="button" onClick={(e) => {
            e.preventDefault();
            setViewPasswd(!viewPsw);
          }}
            className="ml-2"
          >
            {viewPsw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Sing Up
        </button>
      </form>

      {/* Link per accedere */}
      <p className="text-sm mt-4">
        Hai gia un account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">Accedi</a>
      </p>
    </div>
  );
}

export default SingupComponent;
