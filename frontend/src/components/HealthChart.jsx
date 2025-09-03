import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function HealthChart({ metrics }) {
  if (!metrics || !Array.isArray(metrics) || metrics.length === 0) {
    return <p className="text-gray-500">Nessun dato disponibile</p>
  }

  const data = {
    labels: metrics.map((m) => m.created_at ? new Date(m.created_at).toLocaleDateString() : "?"),
    datasets: [
      {
        label: "Heart Rate",
        data: metrics.map((m) => m.heart_rate),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sleep Hours",
        data: metrics.map((m) => m.sleep_hours),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Stress Level",
        data: metrics.map((m) => m.stress_level),
        borderColor: "rgb(75, 192, 75)",
        backgroundColor: "rgba(75, 192, 75, 0.5)",
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default HealthChart;
