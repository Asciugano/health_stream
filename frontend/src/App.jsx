import { useEffect, useState } from 'react'
import './App.css'
import HealthList from './components/HealthList'
import HealthForm from './components/HealthForm'
import HealthChart from './components/HealthChart'
import axios from 'axios';
import LoginPage from './pages/LoginPage'

function App() {
  const [metrics, setMetrics] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:8000/health/1')
          .then((data) => setMetrics(data.data))
          .catch((e) => console.error(e));
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {token ? (
          <div>
            <HealthChart metrics={metrics} />
            <HealthList />
            <HealthForm />
          </div>
        ) : (
          <LoginPage token={token} setToken={setToken} />
        )}
      </div>
    </div >
  )
}

export default App
