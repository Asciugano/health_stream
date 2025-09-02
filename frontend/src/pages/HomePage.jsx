import React, { useId } from "react";
import HealthChart from "../components/HealthChart";
import HealthList from "../components/HealthList";

function HomePage({ userID, metrics }) {
  const fake_metrics = [


    { date: "2025-09-01 12:19:56.962553", heart_rate: 72, sleep_hours: 10, stress_level: 2 },
    { date: "2025-09-02 12:19:56.962553", heart_rate: 80, sleep_hours: 7, stress_level: 3 },
    { date: "2025-09-03 12:19:56.962553", heart_rate: 65, sleep_hours: 9, stress_level: 1 },
    { date: "2024-09-01 12:19:56.962553", heart_rate: 93, sleep_hours: 4, stress_level: 5 },
    { date: "2025-05-02 12:19:56.962553", heart_rate: 77, sleep_hours: 7, stress_level: 4 },
    { date: "2025-02-03 12:19:56.962553", heart_rate: 89, sleep_hours: 8, stress_level: 1 },
  ];

  return (
    <div className="flex flex-col items-center pt-12">
      <h1 className="text-2xl font-bold mb-6">Benvenuto!</h1>
      <p className="mb-4 text-gray-600">
        {userID
          ? "sei loggato"
          : "Non sei loggato: stai vedendo delle metriche di esempio"}
      </p>
      {!userID &&
        <div>
          <HealthChart metrics={fake_metrics} />
          <HealthList metrics={fake_metrics} />
        </div>
      }
    </div>
  );
}

export default HomePage;
