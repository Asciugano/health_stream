import { useEffect, useState } from 'react'
import './App.css'
import HealthList from './components/HealthList'
import HealthForm from './components/HealthForm'
import HealthChart from './components/HealthChart'
import axios from 'axios';
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './middleware/ProtectedRoute'
import { getUserIDFromToken } from './utils/token'

function App() {
  const [user_id, setUser_id] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (!token) return;

    const id = getUserIDFromToken(token);
    setUser_id(id);
  }, [token]);

  useEffect(() => {
    if (!user_id) return;

    try {
      axios.get(`http://localhost:8000/health/${user_id}`)
        .then((res) => setMetrics(res.data))
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  }, [user_id]);

  return (
    <div>
      <button onClick={() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser_id(null);
      }}>Logout</button>
      <div>
        {token ? (
          <div>
            <ProtectedRoute
              token={token}
              setUser_id={setUser_id}
              Component={HealthChart}
              componentProps={{ metrics: metrics }}
            />
          </div>
        ) : (
          <LoginPage token={token} setToken={setToken} />
        )}
      </div>
    </div >
  )
}

export default App
