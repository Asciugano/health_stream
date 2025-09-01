import React, { useState } from "react";
import axios from "axios";

function HealthForm() {
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
      // onAdd(res.data);
      setFormData({ ...formData, heart_rate: 0.0, sleep_hours: 0.0, stress_level: 0.0 });
    } catch (e) {
      console.error("error saving metric:", e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Health Metric</h3>
      <label name="heart_rate">Heart Rate</label>
      <input
        type="number"
        name="heart_rate"
        placeholder="Heart Rate"
        value={formData.heart_rate}
        onChange={handleChange}
        required
      />
      <label name="sleep_hours">Sleep Hours</label>
      <input
        type="number"
        name="sleep_hours"
        placeholder="Sleep Hours"
        value={formData.sleep_hours}
        onChange={handleChange}
        required
      />
      <label name="stress_level">Stress Level</label>
      <input
        type="number"
        name="stress_level"
        placeholder="Stress Level"
        value={formData.stress_level}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  )
}

export default HealthForm;
