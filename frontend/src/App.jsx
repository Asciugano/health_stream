import { useEffect, useState } from 'react'
import axios from 'axios';
import LoginPage from './pages/LoginPage'
import { getUserIDFromToken } from './utils/token'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './middleware/ProtectedRoute';
import NavBar from './components/NavBar';

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
        <NavBar setToken={setToken} setUser_id={setUser_id} />
        <Routes>
          <Route path='/' element={<Navigate to={token ? "/dashboard" : '/login'} />} />
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
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={user_id ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
