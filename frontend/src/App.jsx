import { useEffect, useState } from 'react'
import axios from 'axios';
import LoginPage from './pages/LoginPage'
import { getUserIDFromToken } from './utils/token'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './middleware/ProtectedRoute';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import HealthForm from './components/HealthForm.jsx';
import SingupPage from './pages/SingupPage';

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
    <>
      <BrowserRouter>
        <NavBar setToken={setToken} setUser_id={setUser_id} token={token} />
        <Routes>
          <Route path='/' element={<HomePage userID={user_id} metrics={metrics} />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute
                token={token}
                Component={DashBoard}
                componentProps={{ metrics }}
                setUser_id={setUser_id}
              />}
          />
          <Route path='/login' element={<LoginPage setToken={setToken} />} />
          <Route path='/singup' element={<SingupPage setToken={setToken} />} />
          <Route
            path='/metrics'
            element={
              <ProtectedRoute
                token={token}
                Component={HealthForm}
                setUser_id={setUser_id}
                componentProps={{ setMetrics: setMetrics, metrics: metrics, user_id: user_id }}
                redirectTo='/login'
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                token={token}
                Component={ProfilePage}
                componentProps={{ setToken: setToken, user_id: user_id }}
                setUser_id={setUser_id}
              />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
