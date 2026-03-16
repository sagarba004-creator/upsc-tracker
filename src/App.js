import React, { useState, useEffect } from 'react';
import { getUser, clearUser } from './utils/api';
import LoginPage from './pages/LoginPage';
import StudentApp from './pages/StudentApp';
import AdminApp from './pages/AdminApp';
import MentorApp from './pages/MentorApp';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = getUser();
    if (saved) setUser(saved);
    setLoading(false);
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => { clearUser(); setUser(null); };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner spinner-dark" style={{ width: 36, height: 36 }} />
    </div>
  );

  if (!user) return <LoginPage onLogin={handleLogin} />;
  if (user.role === 'admin')   return <AdminApp   user={user} onLogout={handleLogout} />;
  if (user.role === 'mentor')  return <MentorApp  user={user} onLogout={handleLogout} />;
  return <StudentApp user={user} onLogout={handleLogout} />;
}
