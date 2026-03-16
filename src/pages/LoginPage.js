import React, { useState } from 'react';
import { api, setUser } from '../utils/api';

export default function LoginPage({ onLogin }) {
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [newPass, setNewPass]   = useState('');
  const [confirmPass, setConfirm] = useState('');
  const [step, setStep]         = useState('login'); // login | setpassword
  const [pendingUser, setPending] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const data = await api('login', { phone, password });
      if (data.needsPassword) {
        setPending(data); setStep('setpassword');
      } else {
        setUser(data); onLogin(data);
      }
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function handleSetPassword(e) {
    e.preventDefault();
    if (newPass !== confirmPass) { setError('Passwords do not match'); return; }
    if (newPass.length < 6) { setError('Password must be at least 6 characters'); return; }
    setError(''); setLoading(true);
    try {
      await api('setPassword', { phone: pendingUser.phone, password: newPass, role: pendingUser.role });
      const userData = { ...pendingUser, needsPassword: false };
      setUser(userData); onLogin(userData);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="login-screen">
      <div className="login-logo">🎯</div>
      <div className="login-title">UPSC Tracker</div>
      <div className="login-sub">LegacyIAS — Student Progress Portal</div>

      <div className="login-card">
        {step === 'login' ? (
          <>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Sign In</div>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Phone Number</label>
                <input className="input-field" type="tel" placeholder="Enter your phone number"
                  value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input className="input-field" type="password" placeholder="Enter your password"
                  value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : 'Sign In'}
              </button>
            </form>
            <div style={{ marginTop: 14, fontSize: 12, color: '#6B7280', textAlign: 'center' }}>
              First time? Enter your phone & any password — you'll be asked to set a new one.
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Set Your Password</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 18 }}>
              Welcome! Please set a password for your account.
            </div>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSetPassword}>
              <div className="input-group">
                <label>New Password</label>
                <input className="input-field" type="password" placeholder="Min. 6 characters"
                  value={newPass} onChange={e => setNewPass(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <input className="input-field" type="password" placeholder="Repeat password"
                  value={confirmPass} onChange={e => setConfirm(e.target.value)} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : 'Set Password & Continue'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
