import { Activity, Calendar, Heart, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";

function HealthList({ metrics }) {
  if (!metrics.length) return <p className="text-gray-500">No metrics available</p>

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Health Metrics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-6 py-3 text-left text-gray-600 font-medium flex items-center gap-2">
                <Heart size={18} className="text-red-500" /> Heart Rate
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium flex items-center gap-2">
                <Moon size={18} className="text-indigo-500" /> Sleep Hours
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium flex items-center gap-2">
                <Activity size={18} className="text-green-500" /> Stress Level
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium flex items-center gap-2">
                <Calendar size={18} /> Created at
              </th>
            </tr>
          </thead>
        </table>
        <table className="min-w-full border-collapse">
          <tbody>
            {metrics.map((metric, idx) => (
              <tr
                key={metric.id || idx}
                className={`transition hover:bg-gray-50 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-6 py-4 text-gray-700 font-medium">
                  <Heart size={12} className="text-red-500" />
                  {metric.heart_rate}
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  <Moon size={12} className="text-indigo-500" />
                  {metric.sleep_hours}
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  <Activity size={12} className="text-green-500" />
                  {metric.stress_level}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <Calendar size={12} />
                  {new Date(metric.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HealthList;
