import { Activity, Calendar, Heart, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";

function HealthList({ metrics }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (loading) return <p className="text-gray-500">loading metrics...</p>
  if (error) return <p className="text-red-600">Error: {error}</p>
  if (!metrics.length) return <p className="text-gray-500">No metrics available</p>

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Health Mestrics</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left flex items-center gap-2">
                <Heart size={16} className="text-red-500" /> Heart Rate
              </th>
              <th className="px-4 py-2 text-left flex items-center gap-2">
                <Moon size={16} className="text-indigo-500" /> Sleep Hours
              </th>
              <th className="px-4 py-2 text-left flex items-center gap-2">
                <Activity size={16} className="text-green-500" /> Stress Level
              </th>
              <th className="px-4 py-2 text-left flex items-center gap-2">
                <Calendar size={16} /> Created at
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">{metric.heart_rate}</td>
                <td className="px-4 py-2">{metric.sleep_hours}</td>
                <td className="px-4 py-2">{metric.stress_level}</td>
                <td className="px-4 py-2">{new Date(metric.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HealthList;
