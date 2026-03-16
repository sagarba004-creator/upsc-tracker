import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

export default function AdminApp({ user, onLogout }) {
  const [tab, setTab]         = useState('students');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batch, setBatch]     = useState('');
  const [selected, setSelected] = useState(null);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await api('adminGetStudents', { batch: batch || undefined });
      setStudents(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadStudents(); }, [batch]);

  if (selected) return (
    <StudentDetail student={selected} onBack={() => { setSelected(null); loadStudents(); }} />
  );

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>⚙️ Admin Panel</div>
          <div className="sub">{user.name}</div>
        </div>
        <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div className="page">
        {tab === 'students' && (
          <>
            <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
              <input className="input-field" style={{ flex: 1, margin: 0 }} placeholder="Filter by batch..."
                value={batch} onChange={e => setBatch(e.target.value)} />
              <button className="btn btn-sm btn-primary" onClick={() => setTab('add')}>+ Add</button>
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner spinner-dark" style={{ width: 30, height: 30, margin: '0 auto' }} /></div>
            ) : (
              <div className="student-list">
                {students.map(s => (
                  <div key={s.phone} className="student-card" onClick={() => setSelected(s)}>
                    <div className="student-avatar">{s.name?.[0]?.toUpperCase()}</div>
                    <div className="student-info">
                      <div className="student-name">{s.name}</div>
                      <div className="student-meta">{s.phone} · {s.batch || 'No batch'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#1B3A6B' }}>{s.overall_pct}%</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>Progress</div>
                    </div>
                  </div>
                ))}
                {!students.length && <div className="empty"><div className="empty-icon">👥</div>No students found</div>}
              </div>
            )}
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-outline" onClick={handleDownload}>⬇️ Download Report</button>
            </div>
          </>
        )}
        {tab === 'add' && <AddStudentForm onDone={() => { setTab('students'); loadStudents(); }} onCancel={() => setTab('students')} />}
        {tab === 'mentor' && <AddMentorForm onDone={() => setTab('students')} onCancel={() => setTab('students')} />}
      </div>

      <nav className="bottom-nav">
        {[
          { key: 'students', icon: '👥', label: 'Students' },
          { key: 'mentor',   icon: '🧑‍🏫', label: 'Mentors' },
        ].map(t => (
          <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
    </div>
  );

  async function handleDownload() {
    try {
      const data = await api('adminDownloadReport');
      const csv = [
        ['Name','Phone','Batch','Target Year','Optional','Overall %'].join(','),
        ...data.map(r => [r.name, r.phone, r.batch, r.target_year, r.optional, r.overall_pct].join(','))
      ].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a'); a.href = url; a.download = 'upsc_report.csv'; a.click();
    } catch (e) { alert('Failed to download'); }
  }
}

function StudentDetail({ student, onBack }) {
  const [dash, setDash]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    api('adminGetStudent', { phone: student.phone })
      .then(setDash).catch(console.error).finally(() => setLoading(false));
  }, [student.phone]);

  async function handleRemove() {
    if (!window.confirm(`Remove ${student.name}? This cannot be undone.`)) return;
    setRemoving(true);
    try {
      await api('adminRemoveStudent', { phone: student.phone });
      onBack();
    } catch (e) { alert('Failed to remove'); setRemoving(false); }
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{student.name}</div>
            <div className="sub">{student.phone} · {student.batch}</div>
          </div>
        </div>
        <button onClick={handleRemove} disabled={removing}
          style={{ background: '#FDECEA', border: 'none', color: '#B00020', borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer' }}>
          Remove
        </button>
      </div>
      <div className="page">
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner spinner-dark" style={{ width: 30, height: 30, margin: '0 auto' }} /></div>
        ) : dash ? (
          <>
            <div className="card">
              <div className="card-title">GS Paper Progress</div>
              {dash.gs_summary?.map(g => (
                <div key={g.gs_paper} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{g.gs_paper}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{g.pct}%</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${g.pct}%`, background: '#1B3A6B' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="card-title">Subject Details</div>
              {dash.subjects?.map(s => (
                <div key={s.subject} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0F0F0' }}>
                  <span style={{ fontSize: 14 }}>{s.subject}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1B3A6B' }}>{s.completion_pct}%</span>
                </div>
              ))}
            </div>
          </>
        ) : <div className="empty"><div className="empty-icon">📊</div>No data yet</div>}
      </div>
    </div>
  );
}

function AddStudentForm({ onDone, onCancel }) {
  const [form, setForm] = useState({ phone: '', name: '', batch: '', target_year: '', optional: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setSaving(true);
    try {
      await api('adminAddStudent', form); onDone();
    } catch (err) { setError(err.message); setSaving(false); }
  }

  return (
    <div className="card">
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Add New Student</div>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        {[
          { key: 'phone',       label: 'Phone Number', type: 'tel',  req: true },
          { key: 'name',        label: 'Full Name',    type: 'text', req: true },
          { key: 'batch',       label: 'Batch',        type: 'text', req: false },
          { key: 'target_year', label: 'Target Year',  type: 'number', req: false },
          { key: 'optional',    label: 'Optional Subject', type: 'text', req: false },
        ].map(f => (
          <div className="input-group" key={f.key}>
            <label>{f.label}</label>
            <input className="input-field" type={f.type} required={f.req}
              value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <span className="spinner" /> : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
}

function AddMentorForm({ onDone, onCancel }) {
  const [form, setForm] = useState({ mentor_id: '', name: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setSaving(true);
    try {
      await api('adminAddMentor', form); onDone();
    } catch (err) { setError(err.message); setSaving(false); }
  }

  return (
    <div className="card">
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Add New Mentor</div>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        {[
          { key: 'mentor_id', label: 'Mentor ID (unique)', req: true },
          { key: 'name',      label: 'Full Name',          req: true },
          { key: 'phone',     label: 'Phone Number',       req: true },
        ].map(f => (
          <div className="input-group" key={f.key}>
            <label>{f.label}</label>
            <input className="input-field" type="text" required={f.req}
              value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <span className="spinner" /> : 'Add Mentor'}
          </button>
        </div>
      </form>
    </div>
  );
}
