import { useEffect, useState } from 'react'
import './App.css'
import HealthList from './components/HealthList'
import HealthForm from './components/HealthForm'
import HealthChart from './components/HealthChart'
import axios from 'axios';

function App() {
  const [metrics, setMetrics] = useState([]);

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
      <HealthChart metrics={metrics} />
      <HealthForm />
      <HealthList />
    </div >
  )
}

export default App
