import axios from "axios";
import React, { useState, useEffect } from "react";

function HealthList() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:8000/health/1')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setMetrics(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>loading metrics...</p>
  if (error) return <p>Error: {error}</p>
  if (!metrics.length) return <p>No metrics available</p>

  return (
    <div>
      <h2>Health Mestrics</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Heart Rate</th>
            <th>Sleep Hours</th>
            <th>Stress Level</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.id}>
              <td>{metric.id}</td>
              <td>{metric.user_id}</td>
              <td>{metric.heart_rate}</td>
              <td>{metric.sleep_hours}</td>
              <td>{metric.stress_level}</td>
              <td>{metric.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HealthList;
