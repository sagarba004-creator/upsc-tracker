import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

const GS_COLORS = {
  'GS Paper 1': { bg: '#E8F5E9', text: '#2E7D32', bar: '#2E7D32' },
  'GS Paper 2': { bg: '#E3F0FF', text: '#1565C0', bar: '#1565C0' },
  'GS Paper 3': { bg: '#FFF3E0', text: '#E65100', bar: '#E65100' },
  'GS Paper 4': { bg: '#F3E5FF', text: '#6A1B9A', bar: '#6A1B9A' },
};

const TASKS = [
  { key: 'reading',     label: 'Reading' },
  { key: 'short_notes', label: 'Notes' },
  { key: 'pyq_prelims', label: 'PYQ Pre' },
  { key: 'pyq_mains',   label: 'PYQ Mains' },
  { key: 'revision1',   label: 'Rev 1' },
  { key: 'revision2',   label: 'Rev 2' },
  { key: 'revision3',   label: 'Rev 3' },
];

export default function StudentApp({ user, onLogout }) {
  const [tab, setTab]           = useState('home');
  const [dashboard, setDashboard] = useState(null);
  const [consistency, setConsistency] = useState(null);
  const [loading, setLoading]   = useState(true);

  const loadDashboard = useCallback(async (silent=false) => {
    try {
      if (!silent) setLoading(true);
      const [dash, cons] = await Promise.all([
        api('getStudentDashboard', { phone: user.phone }),
        api('getConsistency', { phone: user.phone }),
      ]);
      setDashboard(dash);
      setConsistency(cons);
    } catch (e) { console.error(e); }
    finally { if (!silent) setLoading(false); }
  }, [user.phone]);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div className="topbar h1" style={{ fontSize: 17, fontWeight: 700 }}>🎯 UPSC Tracker</div>
          <div className="sub">{user.name} · {user.batch || 'No batch'}</div>
        </div>
        <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div className="page">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
            <div className="spinner spinner-dark" style={{ width: 36, height: 36 }} />
          </div>
        ) : (
          <>
            {tab === 'home'    && <HomeTab    dashboard={dashboard} consistency={consistency} user={user} />}
            {tab === 'subjects'&& <SubjectsTab dashboard={dashboard} user={user} onUpdate={loadDashboard} />}
            {tab === 'daily'   && <DailyTab   dashboard={dashboard} user={user} onUpdate={loadDashboard} consistency={consistency} />}
            {tab === 'tests'   && <TestsTab   user={user} />}
          </>
        )}
      </div>

      <nav className="bottom-nav">
        {[
          { key: 'home',     icon: '🏠', label: 'Home' },
          { key: 'subjects', icon: '📚', label: 'Subjects' },
          { key: 'daily',    icon: '📅', label: 'Daily' },
          { key: 'tests',    icon: '📝', label: 'Tests' },
        ].map(t => (
          <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// ── Home Tab ──────────────────────────────────────────────────
function HomeTab({ dashboard, consistency, user }) {
  if (!dashboard) return null;
  const overall = dashboard.gs_summary.reduce((s, g) => s + g.pct, 0) / (dashboard.gs_summary.length || 1);

  return (
    <>
      {/* Overall */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #1B3A6B, #0D2040)', color: '#fff' }}>
        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 6 }}>Overall Progress</div>
        <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>{Math.round(overall)}%</div>
        <div style={{ marginTop: 12 }}>
          <div className="progress-bar-wrap" style={{ background: 'rgba(255,255,255,0.2)', height: 10 }}>
            <div className="progress-bar-fill" style={{ width: `${overall}%`, background: '#F5A623' }} />
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
          Target Year: {user.target_year || '—'} · Optional: {user.optional || '—'}
        </div>
      </div>

      {/* GS Papers */}
      <div className="card">
        <div className="card-title">GS Papers</div>
        {dashboard.gs_summary.map(g => {
          const col = GS_COLORS[g.gs_paper] || { bg: '#F5F5F5', text: '#333', bar: '#333' };
          return (
            <div key={g.gs_paper} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: col.text }}>{g.gs_paper}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: col.text }}>{g.pct}%</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${g.pct}%`, background: col.bar }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Consistency snapshot */}
      {consistency && (
        <div className="card">
          <div className="card-title">Consistency</div>
          <div className="stat-grid">
            <div className="stat-box">
              <div className="val">{consistency.weekly.consistency_pct}%</div>
              <div className="lbl">This Week</div>
            </div>
            <div className="stat-box">
              <div className="val">{consistency.monthly.consistency_pct}%</div>
              <div className="lbl">This Month</div>
            </div>
            <div className="stat-box">
              <div className="val">{consistency.overall.consistency_pct}%</div>
              <div className="lbl">Overall</div>
            </div>
            <div className="stat-box">
              <div className="val">{consistency.overall.avg_score}</div>
              <div className="lbl">Avg Score</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Subjects Tab ──────────────────────────────────────────────
function SubjectsTab({ dashboard, user, onUpdate }) {
  const [openSubject, setOpenSubject] = useState(null);
  const [openChapter, setOpenChapter] = useState(null);
  const [saving, setSaving] = useState('');
  const [localData, setLocalData] = useState(null);

  React.useEffect(() => {
    if (dashboard) setLocalData(JSON.parse(JSON.stringify(dashboard)));
  }, [dashboard]);

  const data = localData || dashboard;
  if (!data) return null;

  const grouped = {};
  data.subjects.forEach(s => {
    if (!grouped[s.gs_paper]) grouped[s.gs_paper] = [];
    grouped[s.gs_paper].push(s);
  });

  async function toggleTask(subject, chapter, field, current) {
    const newVal = current === 'Done' ? 'Not Done' : 'Done';
    const key = `${subject}||${chapter}||${field}`;
    setSaving(key);

    // Optimistic update — instant UI change
    setLocalData(prev => {
      if (!prev) return prev;
      const updated = JSON.parse(JSON.stringify(prev));
      const subj = updated.subjects.find(s => s.subject === subject);
      if (!subj) return prev;
      const ch = subj.chapters.find(c => c.chapter === chapter);
      if (!ch) return prev;
      ch[field] = newVal;
      const fixedW = { reading:0.20, short_notes:0.20, pyq_prelims:0.15,
        pyq_mains:0.15, revision1:0.10, revision2:0.10, revision3:0.10 };
      ch.score = Object.entries(fixedW).reduce((s,[k,w]) => s+(ch[k]==='Done'?w:0),0);
      const totalWt = subj.chapters.reduce((s,c)=>s+c.weightage,0);
      const earned  = subj.chapters.reduce((s,c)=>s+c.weightage*c.score,0);
      subj.completion_pct = totalWt>0 ? Math.round((earned/totalWt)*100) : 0;
      return updated;
    });

    try {
      await api('updateProgress', { phone: user.phone, subject, chapter, field, value: newVal });
      onUpdate(true).catch(()=>{});
    } catch (e) {
      setLocalData(null);
      alert('Failed to save. Please try again.');
    } finally { setSaving(''); }
  }

  return (
    <>
      {Object.entries(grouped).map(([paper, subjects]) => {
        const col = GS_COLORS[paper] || { bg: '#F5F5F5', text: '#333', bar: '#333' };
        return (
          <div key={paper}>
            <div style={{ background: col.bg, borderRadius: 10, padding: '8px 14px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: col.text, fontSize: 14 }}>{paper}</span>
            </div>
            {subjects.map(subj => (
              <div key={subj.subject} className="card" style={{ marginBottom: 10 }}>
                <div className="accordion-header" onClick={() => setOpenSubject(openSubject === subj.subject ? null : subj.subject)}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{subj.subject}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{subj.chapters.length} chapters</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontWeight: 700, color: col.text, fontSize: 16 }}>{subj.completion_pct}%</span>
                    <span className="accordion-arrow" style={openSubject === subj.subject ? { display: 'inline-block', transform: 'rotate(180deg)' } : {}}>▼</span>
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${subj.completion_pct}%`, background: col.bar }} />
                  </div>
                </div>

                {openSubject === subj.subject && (
                  <div style={{ marginTop: 12 }}>
                    {subj.chapters.map(ch => (
                      <div key={ch.chapter} className="chapter-row">
                        <div className="accordion-header" onClick={() => setOpenChapter(openChapter === ch.chapter ? null : ch.chapter)}>
                          <span className="chapter-name" style={{ marginBottom: 0 }}>{ch.chapter}</span>
                          <span style={{ fontSize: 12, color: col.text, fontWeight: 600 }}>
                            {Math.round(ch.score * 100)}%
                          </span>
                        </div>
                        {openChapter === ch.chapter && (
                          <div className="task-grid" style={{ marginTop: 8 }}>
                            {TASKS.map(t => {
                              const val = ch[t.key];
                              const key = `${subj.subject}||${ch.chapter}||${t.key}`;
                              return (
                                <button
                                  key={t.key}
                                  className={`toggle-btn ${val === 'Done' ? 'done' : ''}`}
                                  onClick={() => toggleTask(subj.subject, ch.chapter, t.key, val)}
                                  disabled={saving === key}
                                >
                                  {saving === key ? '...' : (val === 'Done' ? '✓ ' : '') + t.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

// ── Daily Tab ─────────────────────────────────────────────────
function DailyTab({ dashboard, user, onUpdate, consistency }) {
  const today = dashboard?.today_log;
  const [vals, setVals] = useState({
    editorials_mins:      today?.editorials_mins      || '',
    current_affairs_mins: today?.current_affairs_mins || '',
    static_mins:          today?.static_mins          || '',
    csat_mins:            today?.csat_mins            || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  const TASKS_DAILY = [
    { key: 'editorials_mins',      label: '📰 Editorials',      optimal: dashboard?.config?.editorials_optimal_mins || 20, unit: 'min' },
    { key: 'current_affairs_mins', label: '🗞️ Current Affairs', optimal: dashboard?.config?.current_affairs_optimal_mins || 60, unit: 'min' },
    { key: 'static_mins',          label: '📚 Static (GS+Opt)', optimal: dashboard?.config?.static_optimal_mins || 150, unit: 'min' },
    { key: 'csat_mins',            label: '🔢 CSAT',            optimal: dashboard?.config?.csat_optimal_mins || 30, unit: 'min' },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api('logDailyTask', { phone: user.phone, ...vals });
      await onUpdate(true);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { alert('Failed to save'); }
    finally { setSaving(false); }
  }

  return (
    <>
      <div className="card">
        <div className="card-title">📅 Today's Study Log</div>
        <form onSubmit={handleSubmit}>
          {TASKS_DAILY.map(t => {
            const val = Number(vals[t.key]) || 0;
            const pct = Math.min(100, Math.round((val / t.optimal) * 100));
            return (
              <div key={t.key} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 14, fontWeight: 500 }}>{t.label}</label>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>Optimal: {t.optimal} min</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input
                    type="number" min="0" max="600"
                    className="input-field"
                    style={{ width: 90, flexShrink: 0 }}
                    placeholder="0"
                    value={vals[t.key]}
                    onChange={e => setVals(v => ({ ...v, [t.key]: e.target.value }))}
                  />
                  <div style={{ flex: 1 }}>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill" style={{
                        width: `${pct}%`,
                        background: pct >= 100 ? '#2E7D32' : pct >= 60 ? '#F5A623' : '#E65100'
                      }} />
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>{pct}% of optimal</div>
                  </div>
                </div>
              </div>
            );
          })}
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? <span className="spinner" /> : saved ? '✓ Saved!' : 'Save Today\'s Log'}
          </button>
        </form>
      </div>

      {/* Heatmap */}
      {consistency && (
        <div className="card">
          <div className="card-title">🔥 30-Day Activity</div>
          <div className="heatmap">
            {consistency.heatmap.map(d => {
              const s = d.score;
              const bg = s === null ? '#F0F0F0' : s >= 80 ? '#1B5E20' : s >= 60 ? '#388E3C' : s >= 40 ? '#81C784' : '#C8E6C9';
              return (
                <div key={d.date} className="heatmap-cell" style={{ background: bg, color: s !== null && s >= 60 ? '#fff' : '#999' }}
                  title={`${d.date}: ${s !== null ? s + '%' : 'No log'}`}>
                  {s !== null ? s : ''}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, alignItems: 'center', fontSize: 11, color: '#6B7280' }}>
            <span>Less</span>
            {['#F0F0F0','#C8E6C9','#81C784','#388E3C','#1B5E20'].map(c => (
              <div key={c} style={{ width: 14, height: 14, background: c, borderRadius: 3 }} />
            ))}
            <span>More</span>
          </div>
        </div>
      )}

      {/* Consistency scores */}
      {consistency && (
        <div className="card">
          <div className="card-title">📊 Consistency Score</div>
          <div className="stat-grid">
            <div className="stat-box">
              <div className="val" style={{ color: '#1565C0' }}>{consistency.weekly.consistency_pct}%</div>
              <div className="lbl">This Week</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#E65100' }}>{consistency.monthly.consistency_pct}%</div>
              <div className="lbl">This Month</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#2E7D32' }}>{consistency.overall.consistency_pct}%</div>
              <div className="lbl">Overall</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#6A1B9A' }}>{consistency.overall.logged_days}</div>
              <div className="lbl">Days Logged</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Tests Tab ─────────────────────────────────────────────────
function TestsTab({ user }) {
  const [scores, setScores]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [adding, setAdding]     = useState(null); // 'cmt'|'prelims'|'mains'
  const [form, setForm]         = useState({});
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    api('getTestScores', { phone: user.phone })
      .then(setScores).catch(console.error).finally(() => setLoading(false));
  }, [user.phone]);

  async function saveTest(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api('logTestScore', { phone: user.phone, test_type: adding, ...form });
      const updated = await api('getTestScores', { phone: user.phone });
      setScores(updated); setAdding(null); setForm({});
    } catch (err) { alert('Failed to save'); }
    finally { setSaving(false); }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 60 }}><div className="spinner spinner-dark" style={{ width: 30, height: 30, margin: '0 auto' }} /></div>;

  return (
    <>
      {/* CMT */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="card-title" style={{ marginBottom: 0 }}>🧪 Concept Mastery Tests</div>
          <button className="btn btn-sm btn-saffron" onClick={() => { setAdding('cmt'); setForm({}); }}>+ Add</button>
        </div>
        {scores?.cmt?.length ? scores.cmt.map((r, i) => (
          <div key={i} style={{ borderBottom: '1px solid #F0F0F0', padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14 }}>{r.chapter}</span>
            <span className={`pill ${r.mastery_status === 'Mastered' ? 'pill-green' : 'pill-orange'}`}>{r.mastery_status}</span>
          </div>
        )) : <div style={{ color: '#6B7280', fontSize: 13 }}>No entries yet</div>}
      </div>

      {/* Prelims */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="card-title" style={{ marginBottom: 0 }}>📝 Prelims Tests</div>
          <button className="btn btn-sm btn-saffron" onClick={() => { setAdding('prelims'); setForm({}); }}>+ Add</button>
        </div>
        {scores?.prelims?.length ? scores.prelims.map((r, i) => (
          <div key={i} style={{ borderBottom: '1px solid #F0F0F0', padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{r.test_code} — {r.test_name}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1B3A6B' }}>{r.marks_scored}/{r.marks_total}</span>
            </div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{r.test_type}</div>
          </div>
        )) : <div style={{ color: '#6B7280', fontSize: 13 }}>No entries yet</div>}
      </div>

      {/* Mains */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="card-title" style={{ marginBottom: 0 }}>📋 Mains Tests</div>
          <button className="btn btn-sm btn-saffron" onClick={() => { setAdding('mains'); setForm({}); }}>+ Add</button>
        </div>
        {scores?.mains?.length ? scores.mains.map((r, i) => (
          <div key={i} style={{ borderBottom: '1px solid #F0F0F0', padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{r.test_code} — {r.test_name}</span>
              <span className={`pill ${r.attempted === 'Yes' ? 'pill-green' : 'pill-orange'}`}>{r.attempted === 'Yes' ? 'Attempted' : 'Not Done'}</span>
            </div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{r.no_of_questions} questions</div>
          </div>
        )) : <div style={{ color: '#6B7280', fontSize: 13 }}>No entries yet</div>}
      </div>

      {/* Add form modal */}
      {adding && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: '#fff', borderRadius: '18px 18px 0 0', padding: 24, width: '100%', maxWidth: 480, margin: '0 auto' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
              Add {adding === 'cmt' ? 'CMT' : adding === 'prelims' ? 'Prelims' : 'Mains'} Entry
            </div>
            <form onSubmit={saveTest}>
              {adding === 'cmt' && <>
                <div className="input-group"><label>Chapter</label>
                  <input className="input-field" placeholder="Chapter name" onChange={e => setForm(f => ({ ...f, chapter: e.target.value }))} required /></div>
                <div className="input-group"><label>Mastery Status</label>
                  <select className="input-field" onChange={e => setForm(f => ({ ...f, mastery_status: e.target.value }))} required>
                    <option value="">Select</option>
                    <option>Mastered</option><option>Concerned</option><option>Not Attempted</option>
                  </select></div>
              </>}
              {adding === 'prelims' && <>
                <div className="input-group"><label>Test Code</label>
                  <input className="input-field" placeholder="e.g. PT-2101" onChange={e => setForm(f => ({ ...f, test_code: e.target.value }))} required /></div>
                <div className="input-group"><label>Test Name</label>
                  <input className="input-field" placeholder="e.g. Polity Sectional Test" onChange={e => setForm(f => ({ ...f, test_name: e.target.value }))} /></div>
                <div className="input-group"><label>Type</label>
                  <select className="input-field" onChange={e => setForm(f => ({ ...f, test_type: e.target.value }))}>
                    <option>LEEP</option><option>EDGE</option>
                  </select></div>
                <div className="input-group"><label>Total Marks</label>
                  <input className="input-field" type="number" onChange={e => setForm(f => ({ ...f, marks_total: e.target.value }))} required /></div>
                <div className="input-group"><label>Scored</label>
                  <input className="input-field" type="number" onChange={e => setForm(f => ({ ...f, marks_scored: e.target.value }))} required /></div>
              </>}
              {adding === 'mains' && <>
                <div className="input-group"><label>Test Code</label>
                  <input className="input-field" placeholder="e.g. MT2101" onChange={e => setForm(f => ({ ...f, test_code: e.target.value }))} required /></div>
                <div className="input-group"><label>Test Name</label>
                  <input className="input-field" onChange={e => setForm(f => ({ ...f, test_name: e.target.value }))} /></div>
                <div className="input-group"><label>No. of Questions</label>
                  <input className="input-field" type="number" onChange={e => setForm(f => ({ ...f, no_of_questions: e.target.value }))} /></div>
                <div className="input-group"><label>Attempted?</label>
                  <select className="input-field" onChange={e => setForm(f => ({ ...f, attempted: e.target.value }))}>
                    <option>Yes</option><option>Not Done</option>
                  </select></div>
              </>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-outline" onClick={() => setAdding(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <span className="spinner" /> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
