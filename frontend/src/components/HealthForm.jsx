import React, { useState } from "react";
import axios from "axios";
import { Activity, Heart, Moon, Save } from "lucide-react";

function HealthForm({ metrics, setMetrics }) {
  const [formData, setFormData] = useState({
    user_id: 1,
    heart_rate: 0.0,
    sleep_hours: 0.0,
    stress_level: 0.0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/health', formData);
      setMetrics(...metrics, res.data);
      setFormData({ ...formData, heart_rate: 0.0, sleep_hours: 0.0, stress_level: 0.0 });
    } catch (e) {
      console.error("error saving metric:", e);
    }
  };

  return (
    <div className="flex justify-center min-h-[calc(100vh-64px)] pt-20 items-start">
      <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white shadow rounded-lg space-y-4">
        <h3 className="text-xl font-semibold mb-2">Add Health Metric</h3>
        {/* Heart Rate */}
        <div>
          <label className="block text-gray-700 mb-1">Heart Rate</label>
          <div className="flex items-center border rounded-lg px-3">
            <Heart className="text-red-500" size={18} />
            <input
              type="number"
              name="heart_rate"
              placeholder="Heart Rate"
              value={formData.heart_rate}
              onChange={handleChange}
              className="w-full px-2 py-2 outline-none"
              required
            />
          </div>
        </div>

        {/* Sleep Hours */}
        <div>
          <label className="block text-gray-700 mb-1">Sleep Hours</label>
          <div className="flex items-center border rounded-lg px-3">
            <Moon className="text-indigo-500" size={18} />
            <input
              type="number"
              name="sleep_hours"
              placeholder="Sleep Hours"
              value={formData.sleep_hours}
              onChange={handleChange}
              className="w-full px-2 py-2 outline-none"
              required
            />
          </div>
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-gray-700 mb-1">Stress Level</label>
          <div className="flex items-center border rounded-lg px-3">
            <Activity className="text-green-500" size={18} />
            <input
              type="number"
              name="stress_level"
              placeholder="Stress Level"
              value={formData.stress_level}
              onChange={handleChange}
              className="w-full px-2 py-2 outline-none"
              required
            />
          </div>
        </div>
        <button type="submit" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          <Save size={18} />
          Save Metric
        </button>
      </form>
    </div>
  );
}

export default HealthForm;
