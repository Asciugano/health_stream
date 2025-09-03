import React, { useEffect, useId, useState } from "react";
import HealthChart from "../components/HealthChart";
import HealthList from "../components/HealthList";
import axios from "axios";
import { Activity, Heart, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomePage({ userID, metrics }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!userID) return;

    setLoading(true);
    try {
      axios.post('http://localhost:8000/user/', { user_id: userID })
        .then((res) => setUser(res.data))
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [userID]);

  if (!userID)
    return (
      <div className="flex flex-col items-center pt-12">
        <h1 className="text-2xl font-bold mb-6">Benvenuto!</h1>
        <p className="mb-4 text-gray-600">
          Non sei loggato: stai vedendo delle metriche di esempio
        </p>
        {!userID &&
          <div>
            <HealthChart metrics={fake_metrics} />
            <HealthList metrics={fake_metrics} />
          </div>
        }
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p- flex flex-col gap-8">
      {/* Hero */}
      <div className="bg-blue-100 rounded-xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Ciao {user?.username} 👋</h2>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={(e) => {
          e.preventDefault();
          navigate('/metrics');
        }}>
          Aggiungi una nuova metrica
        </button>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <Heart size={32} className="text-red-500" />
          <div>
            <p className="text-gray-500">Battito medio</p>
            <p className="font-semibold text-lg">{metrics?.heart_rate || 0} bpm</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <Activity size={32} className="text-green-500" />
          <div>
            <p className="text-gray-500">Livello di stres</p>
            <p className="font-semibold text-lg">{metrics?.stress_level || 0}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <Moon size={32} className="text-indigo-500" />
          <div>
            <p className="text-gray-500">Ore di Sonno</p>
            <p className="font-semibold text-lg">{metrics?.sleep_hours || 0} h</p>
          </div>
        </div>
      </div>

      {/* Grafico andamento */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Andamento settimanale</h3>
      </div>
    </div>
  )
}

export default HomePage;
