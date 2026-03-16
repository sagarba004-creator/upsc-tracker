import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

export default function MentorApp({ user, onLogout }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch]     = useState('');

  useEffect(() => {
    api('mentorGetStudents', { mentor_id: user.phone })
      .then(setStudents).catch(console.error).finally(() => setLoading(false));
  }, [user.phone]);

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    String(s.phone).includes(search) ||
    s.batch?.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) return (
    <MentorStudentView student={selected} onBack={() => setSelected(null)} />
  );

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>🧑‍🏫 Mentor Dashboard</div>
          <div className="sub">{user.name} · {students.length} students</div>
        </div>
        <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      <div className="page">
        <input className="input-field" placeholder="Search by name, phone or batch..."
          value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: 14 }} />

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner spinner-dark" style={{ width: 30, height: 30, margin: '0 auto' }} /></div>
        ) : (
          <div className="student-list">
            {filtered.map(s => (
              <div key={s.phone} className="student-card" onClick={() => setSelected(s)}>
                <div className="student-avatar">{s.name?.[0]?.toUpperCase()}</div>
                <div className="student-info">
                  <div className="student-name">{s.name}</div>
                  <div className="student-meta">{s.batch || 'No batch'} · {s.phone}</div>
                  {s.mentor_subjects?.length > 0 && (
                    <div style={{ fontSize: 11, color: '#1565C0', marginTop: 2 }}>
                      📌 {s.mentor_subjects.join(', ')}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: progressColor(s.overall_pct) }}>{s.overall_pct}%</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>Overall</div>
                </div>
              </div>
            ))}
            {!filtered.length && <div className="empty"><div className="empty-icon">👥</div>No students found</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function MentorStudentView({ student, onBack }) {
  const [dash, setDash]     = useState(null);
  const [cons, setCons]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api('getStudentDashboard', { phone: student.phone }),
      api('getConsistency',      { phone: student.phone }),
    ]).then(([d, c]) => { setDash(d); setCons(c); })
      .catch(console.error).finally(() => setLoading(false));
  }, [student.phone]);

  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{student.name}</div>
            <div className="sub">{student.batch} · {student.phone}</div>
          </div>
        </div>
      </div>
      <div className="page">
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner spinner-dark" style={{ width: 30, height: 30, margin: '0 auto' }} /></div>
        ) : (
          <>
            {/* GS Summary */}
            <div className="card">
              <div className="card-title">GS Paper Progress</div>
              {dash?.gs_summary?.map(g => (
                <div key={g.gs_paper} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{g.gs_paper}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: progressColor(g.pct) }}>{g.pct}%</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${g.pct}%`, background: progressColor(g.pct) }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Consistency */}
            {cons && (
              <div className="card">
                <div className="card-title">Consistency</div>
                <div className="stat-grid">
                  <div className="stat-box"><div className="val">{cons.weekly.consistency_pct}%</div><div className="lbl">This Week</div></div>
                  <div className="stat-box"><div className="val">{cons.monthly.consistency_pct}%</div><div className="lbl">This Month</div></div>
                  <div className="stat-box"><div className="val">{cons.overall.consistency_pct}%</div><div className="lbl">Overall</div></div>
                  <div className="stat-box"><div className="val">{cons.overall.logged_days}</div><div className="lbl">Days Logged</div></div>
                </div>
                {/* Heatmap */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>30-Day Activity</div>
                  <div className="heatmap">
                    {cons.heatmap.map(d => {
                      const s = d.score;
                      const bg = s === null ? '#F0F0F0' : s >= 80 ? '#1B5E20' : s >= 60 ? '#388E3C' : s >= 40 ? '#81C784' : '#C8E6C9';
                      return <div key={d.date} className="heatmap-cell" style={{ background: bg }} title={`${d.date}: ${s !== null ? s + '%' : 'No log'}`} />;
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Subject details */}
            <div className="card">
              <div className="card-title">Subject Breakdown</div>
              {dash?.subjects?.map(s => (
                <div key={s.subject} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0F0F0' }}>
                  <span style={{ fontSize: 14 }}>{s.subject}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60 }}>
                      <div className="progress-bar-wrap" style={{ height: 6 }}>
                        <div className="progress-bar-fill" style={{ width: `${s.completion_pct}%`, background: progressColor(s.completion_pct) }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: progressColor(s.completion_pct), width: 36, textAlign: 'right' }}>{s.completion_pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function progressColor(pct) {
  if (pct >= 70) return '#2E7D32';
  if (pct >= 40) return '#E65100';
  return '#B00020';
}
