import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, User } from "lucide-react";

function ProfilePage({ user_id, setToken }) {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "password",
  });

  useEffect(() => {
    if (!user_id) return;

    try {
      axios.post(`http://localhost:8000/user/`, {
        user_id: user_id,
      })
        .then((res) => setUser(res.data))
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  }, [user_id]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword === passwordData.oldPassword) {
      setMessage({ type: "Error", msg: "Errore nel cambiare la password" });
      setLoading(false);
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "Error", msg: "Le password non combaciano" });
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put('http://localhost:8000/profile/password', {
        "user_id": user_id,
        "old_password": passwordData.oldPassword,
        "new_password": passwordData.newPassword,
      });

      setToken(null);
      setMessage({ type: "Success", msg: "Password cambiata con successo" });
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (e) {
      console.error(e);
      setMessage({ type: "Error", msg: "Errore nel cambiare la password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-8">
      {/* Info utente */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Info Profilo</h2>
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <User size={20} /> Username: {user.username}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Mail size={20} /> Username: {user.email}
          </div>
        </div>
      </div>

      {/* Cambia password */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cambia Password</h2>
        {message && (
          <p className={`mb-4 p-2 rounded ${message.type === "Success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
            {message.msg}
          </p>
        )}

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Conferma Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
            {loading ? "Sto Cambiando..." : "Cambia la Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage;
