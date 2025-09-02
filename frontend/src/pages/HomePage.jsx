import React, { useId } from "react";
import HealthChart from "../components/HealthChart";
import HealthList from "../components/HealthList";

function HomePage({ userID, metrics }) {
  function random_date(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  function genFakeMestrics(count = 6) {
    const fake_metrics = []
    for (let i = 0; i < count; i++) {
      fake_metrics.push(
        {
          created_at: random_date(new Date(2020, 0, 1), new Date()),
          heart_rate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
          sleep_hours: Math.floor(Math.random() * (10 - 4 + 1)) + 4,
          stress_level: Math.floor(Math.random() * 5) + 1
        }
      )
    }

    return fake_metrics;
  }

  const fake_metrics = genFakeMestrics();

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
