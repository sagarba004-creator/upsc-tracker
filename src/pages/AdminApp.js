import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import { SubjectsTab, TestsTab as StudentTestsTab, DailyTab } from './StudentApp';

const C = {
  navy:'#1B3A6B', blue:'#2563EB', green:'#16A34A', orange:'#EA580C',
  red:'#DC2626', amber:'#D97706', purple:'#7C3AED', teal:'#0D9488',
  bg:'#F0F4FF', card:'#FFFFFF', border:'#E2E8F0', text:'#1E293B',
  sub:'#64748B', light:'#F8FAFC',
};

const TABS = [
  { key:'students',    icon:'👥', label:'Students'   },
  { key:'alerts',      icon:'🚨', label:'Alerts'     },
  { key:'leaderboard', icon:'🏆', label:'Top 30'     },
  { key:'mentors',     icon:'🧑‍🏫', label:'Mentors'  },
  { key:'tests',       icon:'📝', label:'Tests'      },
];

// ── Shared primitives ──────────────────────────────────────────
function Pill({ color='#2563EB', children, small }) {
  return <span style={{ background:`${color}18`, color, border:`1px solid ${color}40`, borderRadius:99,
    padding:small?'2px 7px':'3px 10px', fontSize:small?10:11, fontWeight:700 }}>{children}</span>;
}
function Card({ children, style={}, onClick }) {
  return <div onClick={onClick} style={{ background:C.card, borderRadius:14, padding:'16px',
    boxShadow:'0 1px 8px rgba(0,0,0,0.07)', marginBottom:12,
    ...(onClick?{cursor:'pointer'}:{}), ...style }}>{children}</div>;
}
function Bar({ pct=0, color=C.blue, height=6 }) {
  return <div style={{ background:'#E2E8F0', borderRadius:99, height, overflow:'hidden' }}>
    <div style={{ width:`${Math.min(100,pct)}%`, height, background:color, borderRadius:99, transition:'width 0.4s' }} />
  </div>;
}
function LoadingSpinner() {
  return <div style={{ textAlign:'center', padding:40 }}>
    <div className="spinner spinner-dark" style={{ width:30, height:30, margin:'0 auto' }} />
  </div>;
}
function Empty({ icon, text }) {
  return <div className="empty"><div className="empty-icon">{icon}</div>{text}</div>;
}
function Avatar({ name, size=40, color=C.navy }) {
  return <div style={{ width:size, height:size, borderRadius:'50%',
    background:`linear-gradient(135deg,${color},${C.teal})`,
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:size*0.38, fontWeight:800, color:'#fff', flexShrink:0 }}>
    {name?.[0]?.toUpperCase() || '?'}
  </div>;
}
function SectionTitle({ children }) {
  return <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:10 }}>{children}</div>;
}

// ── Root ──────────────────────────────────────────────────────
export default function AdminApp({ user, onLogout }) {
  const [tab, setTab]   = useState('students');
  const [view, setView] = useState(null); // { type, data }

  if (view?.type === 'student_detail') return (
    <StudentDetail student={view.data} onBack={() => setView(null)} />
  );
  if (view?.type === 'mentor_detail') return (
    <MentorDetail mentor={view.data} onBack={() => setView(null)} />
  );
  if (view?.type === 'add_student') return (
    <AddStudentForm onDone={() => setView(null)} onCancel={() => setView(null)} />
  );
  if (view?.type === 'add_mentor') return (
    <AddMentorForm onDone={() => setView(null)} onCancel={() => setView(null)} />
  );

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div style={{ fontSize:17, fontWeight:800 }}>⚙️ Admin Panel</div>
          <div className="sub">{user.name}</div>
        </div>
        <button onClick={onLogout} style={{ background:'rgba(255,255,255,0.15)', border:'none',
          color:'#fff', borderRadius:8, padding:'6px 14px', fontSize:13, cursor:'pointer' }}>
          Logout
        </button>
      </div>
      <div className="page" style={{ paddingBottom:80 }}>
        {tab==='students'    && <StudentsTab    onSelect={s => setView({type:'student_detail',data:s})} onAdd={() => setView({type:'add_student'})} />}
        {tab==='alerts'      && <AlertsTab      onSelect={s => setView({type:'student_detail',data:s})} />}
        {tab==='leaderboard' && <LeaderboardTab onSelect={s => setView({type:'student_detail',data:s})} />}
        {tab==='mentors'     && <MentorsTab     onAdd={() => setView({type:'add_mentor'})} onSelect={m => setView({type:'mentor_detail',data:m})} />}
        {tab==='tests'       && <AdminTestsTab />}
      </div>
      <nav className="bottom-nav">
        {TABS.map(t => (
          <button key={t.key} className={tab===t.key?'active':''} onClick={() => setTab(t.key)}>
            <span style={{ fontSize:18 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STUDENTS TAB
// ══════════════════════════════════════════════════════════════
function StudentsTab({ onSelect, onAdd }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [batch, setBatch]       = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try { setStudents(await api('adminGetStudents', { batch:batch||undefined })); }
    catch(e){} finally { setLoading(false); }
  }, [batch]);
  useEffect(() => { load(); }, [load]);

  const filtered = students.filter(s =>
    !search || s.name?.toLowerCase().includes(search.toLowerCase()) || String(s.phone).includes(search));

  async function handleDownload() {
    try {
      const data = await api('adminDownloadReport');
      const csv = [['Name','Phone','Batch','Target Year','Optional','Overall %'].join(','),
        ...data.map(r => [r.name,r.phone,r.batch,r.target_year,r.optional,r.overall_pct].join(','))].join('\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
      a.download = 'upsc_report.csv'; a.click();
    } catch(e) { alert('Download failed'); }
  }

  return (
    <>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input className="input-field" style={{ flex:1, margin:0 }} placeholder="🔍 Search name or phone..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <input className="input-field" style={{ width:80, margin:0 }} placeholder="Batch"
          value={batch} onChange={e => setBatch(e.target.value)} />
        <button className="btn btn-sm btn-primary" onClick={onAdd} style={{ flexShrink:0 }}>+ Add</button>
      </div>

      {loading ? <LoadingSpinner /> : <>
        <div style={{ fontSize:12, color:C.sub, marginBottom:8 }}>{filtered.length} students</div>
        {filtered.map(s => (
          <Card key={s.phone} onClick={() => onSelect(s)} style={{ borderLeft:`4px solid ${s.alerts?.length?C.red:C.blue}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <Avatar name={s.name} size={40} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
                  <span style={{ fontWeight:700, fontSize:14 }}>{s.name}</span>
                  {s.alerts?.length>0 && <span style={{ fontSize:11 }}>🚨</span>}
                </div>
                <div style={{ fontSize:11, color:C.sub }}>{s.phone} · {s.batch||'No batch'} · {s.optional||'—'}</div>
                <div style={{ display:'flex', gap:6, marginTop:4, flexWrap:'wrap' }}>
                  {s.alerts?.includes('inactive') && <Pill color={C.red} small>Inactive {s.days_since_active}d</Pill>}
                  {s.alerts?.includes('low_consistency') && <Pill color={C.amber} small>Cons {s.consistency_7d}%</Pill>}
                </div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:22, fontWeight:800, color:C.navy }}>{s.overall_pct}%</div>
                <div style={{ fontSize:10, color:C.sub }}>Progress</div>
              </div>
            </div>
            <Bar pct={s.overall_pct} color={s.alerts?.length?C.red:C.blue} height={4} />
          </Card>
        ))}
        {!filtered.length && <Empty icon="👥" text="No students found" />}
        <button className="btn btn-outline" style={{ width:'100%', marginTop:8 }} onClick={handleDownload}>
          ⬇️ Download CSV Report
        </button>
      </>}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// STUDENT DETAIL
// ══════════════════════════════════════════════════════════════
function StudentDetail({ student, onBack }) {
  const [dash, setDash]           = useState(null);
  const [consistency, setCons]    = useState(null);
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState('summary');
  const [mentors, setMentors]     = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selMentor, setSelMentor] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [removing, setRemoving]   = useState(false);
  const [editing, setEditing]     = useState(false);
  const [editForm, setEditForm]   = useState({});

  // read-only user object for shared tab components
  const studentUser = { phone: student.phone, name: student.name,
    batch: student.batch, target_year: student.target_year, optional: student.optional };

  useEffect(() => {
    Promise.all([
      api('adminGetStudentFull', { phone: student.phone }),
      api('getConsistency', { phone: student.phone }),
      api('adminGetMentors'),
    ]).then(([d, cons, ms]) => {
      setDash(d); setCons(cons); setMentors(ms);
      setEditForm({ name:student.name, batch:student.batch,
        target_year:student.target_year, optional:student.optional });
      // derive current assignments from mentor list
      const assigned = ms.flatMap(m =>
        (m.students||[]).includes(String(student.phone)) ? [m] : []
      );
      setAssignments(assigned);
    }).catch(console.error).finally(() => setLoading(false));
  }, [student.phone]);

  async function handleRemoveStudent() {
    if (!window.confirm(`Remove ${student.name}? This cannot be undone.`)) return;
    setRemoving(true);
    try { await api('adminRemoveStudent', { phone:student.phone }); onBack(); }
    catch(e) { alert('Failed'); setRemoving(false); }
  }

  async function handleAssign() {
    if (!selMentor) return;
    setAssigning(true);
    try {
      await api('adminAssignMentor', { mentor_id:selMentor, student_phone:student.phone, type:'student' });
      const m = mentors.find(x => String(x.mentor_id) === String(selMentor));
      if (m) setAssignments(a => [...a, m]);
      setSelMentor('');
      alert('Assigned ✓');
    } catch(e) { alert('Failed'); }
    finally { setAssigning(false); }
  }

  async function handleSaveEdit() {
    try {
      await api('adminEditStudent', { phone:student.phone, ...editForm });
      setEditing(false);
      alert('Updated ✓');
    } catch(e) { alert('Failed'); }
  }

  const DTABS = [
    { key:'summary',     label:'Summary'     },
    { key:'subjects',    label:'Subjects'    },
    { key:'consistency', label:'Consistency' },
    { key:'tests',       label:'Tests'       },
    { key:'feedback',    label:'Feedback'    },
  ];

  const succ = dash ? Math.round((dash.proficiency_score||0)*0.40+(dash.exam_readiness||0)*0.35+
    (dash.consistency?.overall?.consistency_pct||0)*0.25) : 0;

  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer' }}>←</button>
          <Avatar name={student.name} size={34} />
          <div>
            <div style={{ fontSize:15, fontWeight:700 }}>{student.name}</div>
            <div className="sub">{student.phone} · {student.batch||'No batch'}</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          <button onClick={() => setEditing(e=>!e)} style={{ background:'rgba(255,255,255,0.15)',
            border:'none', color:'#fff', borderRadius:8, padding:'6px 10px', fontSize:12, cursor:'pointer' }}>
            ✏️
          </button>
          <button onClick={handleRemoveStudent} disabled={removing} style={{ background:'rgba(220,38,38,0.7)',
            border:'none', color:'#fff', borderRadius:8, padding:'6px 10px', fontSize:12, cursor:'pointer' }}>
            🗑
          </button>
        </div>
      </div>

      {/* Edit form inline */}
      {editing && (
        <div style={{ background:'#EFF6FF', padding:'12px 16px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
            {[
              {key:'name',label:'Name'}, {key:'batch',label:'Batch'},
              {key:'target_year',label:'Target Year'}, {key:'optional',label:'Optional'},
            ].map(f => (
              <div key={f.key}>
                <div style={{ fontSize:10, color:C.sub, marginBottom:2 }}>{f.label}</div>
                <input className="input-field" style={{ margin:0, fontSize:12, padding:'6px 8px' }}
                  value={editForm[f.key]||''} onChange={e => setEditForm(v=>({...v,[f.key]:e.target.value}))} />
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-primary btn-sm" onClick={handleSaveEdit}>Save</button>
            <button className="btn btn-outline btn-sm" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Sub-tabs */}
      <div style={{ display:'flex', background:C.card, borderBottom:`1px solid ${C.border}`,
        padding:'0 12px', overflowX:'auto' }}>
        {DTABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding:'10px 12px', fontSize:12, fontWeight:600, border:'none', background:'none',
              cursor:'pointer', whiteSpace:'nowrap',
              color:tab===t.key?C.blue:C.sub,
              borderBottom:tab===t.key?`2px solid ${C.blue}`:'2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="page" style={{ paddingBottom:20 }}>
        {loading ? <LoadingSpinner /> : !dash ? <Empty icon="📊" text="No data yet" /> : <>

          {/* ── Summary ── */}
          {tab==='summary' && <>
            {/* Score grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:12 }}>
              {[
                { label:'Success',     val:`${succ}%`,                                          color:C.navy   },
                { label:'Pre Success', val:`${dash.pre_success||0}%`,                           color:C.blue   },
                { label:'Mains Succ.', val:`${dash.mains_success||0}%`,                         color:C.purple },
                { label:'Proficiency', val:`${dash.proficiency_score||0}%`,                     color:C.green  },
                { label:'Readiness',   val:`${dash.exam_readiness||0}%`,                        color:C.orange },
                { label:'Consistency', val:`${dash.consistency?.overall?.consistency_pct||0}%`, color:C.teal   },
              ].map(m => (
                <Card key={m.label} style={{ textAlign:'center', padding:'12px 6px', marginBottom:0 }}>
                  <div style={{ fontSize:20, fontWeight:800, color:m.color }}>{m.val}</div>
                  <div style={{ fontSize:10, color:C.sub, marginTop:2 }}>{m.label}</div>
                </Card>
              ))}
            </div>

            {/* Paper progress */}
            <Card>
              <SectionTitle>📋 Paper Progress</SectionTitle>
              {dash.gs_summary?.map(g => (
                <div key={g.gs_paper} style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                    <span style={{ fontSize:12 }}>{g.gs_paper}</span>
                    <span style={{ fontSize:12, fontWeight:700 }}>{g.pct}%</span>
                  </div>
                  <Bar pct={g.pct} />
                </div>
              ))}
            </Card>

            {/* Assigned mentors */}
            <Card>
              <SectionTitle>🧑‍🏫 Assigned Mentors</SectionTitle>
              {assignments.length ? assignments.map(m => (
                <div key={m.mentor_id} style={{ display:'flex', alignItems:'center', gap:10,
                  padding:'8px 0', borderBottom:`1px solid ${C.border}` }}>
                  <Avatar name={m.name} size={32} color={C.teal} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600 }}>{m.name}</div>
                    <div style={{ fontSize:11, color:C.sub }}>{m.phone}</div>
                  </div>
                  <Pill color={C.teal} small>Assigned</Pill>
                </div>
              )) : <div style={{ fontSize:12, color:C.sub }}>No mentor assigned yet</div>}

              {/* Assign new mentor */}
              <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
                <div style={{ fontSize:11, color:C.sub, marginBottom:6 }}>Assign mentor</div>
                <div style={{ display:'flex', gap:8 }}>
                  <select value={selMentor} onChange={e => setSelMentor(e.target.value)}
                    style={{ flex:1, padding:'8px 10px', borderRadius:8,
                      border:`1px solid ${C.border}`, fontSize:13 }}>
                    <option value="">Select mentor...</option>
                    {mentors.map(m => (
                      <option key={m.mentor_id} value={m.mentor_id}>
                        {m.name} · {m.student_count} students
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-primary btn-sm" onClick={handleAssign} disabled={assigning}>
                    {assigning ? '…' : 'Assign'}
                  </button>
                </div>
              </div>
            </Card>

            {/* Recent activity */}
            <Card>
              <SectionTitle>🔥 Recent Activity</SectionTitle>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                {[
                  { label:'7-Day Cons.', val:`${dash.consistency_7d||0}%`, color:C.teal },
                  { label:'Days Inactive', val:`${student.days_since_active>=999?'Never':(student.days_since_active||0)+'d'}`, color:C.red },
                  { label:'Weekly Cons.', val:`${dash.consistency?.weekly?.consistency_pct||0}%`, color:C.green },
                ].map(s => (
                  <div key={s.label} style={{ background:C.light, borderRadius:10, padding:'10px 4px', textAlign:'center' }}>
                    <div style={{ fontSize:16, fontWeight:900, color:s.color }}>{s.val}</div>
                    <div style={{ fontSize:9, color:C.sub, marginTop:2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>}

          {/* ── Subjects ── (full student view) */}
          {tab==='subjects' && (
            <SubjectsTab
              dashboard={dash}
              user={studentUser}
              onUpdate={() => {}}
              gsSummary={dash?.gs_summary}
            />
          )}

          {/* ── Consistency ── (full student view) */}
          {tab==='consistency' && (
            <DailyTab
              dashboard={dash}
              user={studentUser}
              onUpdate={() => {}}
              consistency={consistency}
              readOnly={true}
            />
          )}

          {/* ── Tests ── (full student view) */}
          {tab==='tests' && (
            <StudentTestsTab user={studentUser} readOnly={true} />
          )}

          {/* ── Feedback ── */}
          {tab==='feedback' && (
            <div>
              <SectionTitle>💬 Mentor Feedback</SectionTitle>
              {dash.feedback?.length ? dash.feedback.map(f => (
                <Card key={f.id} style={{ borderLeft:`3px solid ${C.teal}`, marginBottom:8 }}>
                  <div style={{ fontSize:13, color:C.text, lineHeight:1.6, marginBottom:6,
                    whiteSpace:'pre-wrap' }}>{f.note}</div>
                  <div style={{ fontSize:10, color:C.sub }}>{f.mentor_id} · {f.created_date}</div>
                </Card>
              )) : <Empty icon="💬" text="No feedback yet" />}
            </div>
          )}
        </>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ALERTS TAB
// ══════════════════════════════════════════════════════════════
function AlertsTab({ onSelect }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api('adminGetAlerts').then(setAlerts).catch(console.error).finally(() => setLoading(false));
  }, []);
  if (loading) return <LoadingSpinner />;
  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
        <span style={{ fontSize:20 }}>🚨</span>
        <div>
          <div style={{ fontWeight:700, fontSize:15 }}>Student Alerts</div>
          <div style={{ fontSize:12, color:C.sub }}>{alerts.length} students need attention</div>
        </div>
      </div>
      {alerts.map(a => (
        <Card key={a.phone} onClick={() => onSelect(a)} style={{ borderLeft:`4px solid ${C.red}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14 }}>{a.name}</div>
              <div style={{ fontSize:11, color:C.sub }}>{a.phone} · {a.batch}</div>
              <div style={{ display:'flex', gap:6, marginTop:6, flexWrap:'wrap' }}>
                {a.reasons.map((r,i) => (
                  <Pill key={i} color={r.type==='inactive'?C.red:C.amber} small>{r.msg}</Pill>
                ))}
              </div>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontSize:11, color:C.sub }}>Inactive</div>
              <div style={{ fontSize:20, fontWeight:800, color:C.red }}>{a.days_since_active}d</div>
            </div>
          </div>
        </Card>
      ))}
      {!alerts.length && <Empty icon="✅" text="No alerts — all students on track!" />}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// LEADERBOARD TAB
// ══════════════════════════════════════════════════════════════
function LeaderboardTab({ onSelect }) {
  const [board, setBoard]     = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api('adminGetLeaderboard').then(setBoard).catch(console.error).finally(() => setLoading(false));
  }, []);
  if (loading) return <LoadingSpinner />;
  const MEDAL = ['🥇','🥈','🥉'];
  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
        <span style={{ fontSize:20 }}>🏆</span>
        <div>
          <div style={{ fontWeight:700, fontSize:15 }}>Top 30 Students</div>
          <div style={{ fontSize:12, color:C.sub }}>Ranked by progress + consistency + activity</div>
        </div>
      </div>
      {board.map((s, i) => (
        <Card key={s.phone} onClick={() => onSelect(s)}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ fontSize:i<3?24:15, fontWeight:800, color:C.sub, width:32, textAlign:'center', flexShrink:0 }}>
              {i<3 ? MEDAL[i] : `#${i+1}`}
            </div>
            <Avatar name={s.name} size={36} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:700, fontSize:13 }}>{s.name}</div>
              <div style={{ fontSize:11, color:C.sub }}>{s.batch||'No batch'} · {s.optional||'—'}</div>
              <div style={{ display:'flex', gap:10, marginTop:4, flexWrap:'wrap' }}>
                <span style={{ fontSize:11, color:C.blue }}>📚 {s.overall_pct}%</span>
                <span style={{ fontSize:11, color:C.teal }}>🔥 {s.consistency_7d}%</span>
                <span style={{ fontSize:11, color:s.days_since_active<=1?C.green:C.sub }}>
                  ⚡ {s.days_since_active===0?'Today':`${s.days_since_active}d ago`}
                </span>
              </div>
            </div>
            <div style={{ fontWeight:800, fontSize:20, color:C.navy, flexShrink:0 }}>
              {s.leaderboard_score}
            </div>
          </div>
        </Card>
      ))}
      {!board.length && <Empty icon="🏆" text="No data yet" />}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MENTORS TAB
// ══════════════════════════════════════════════════════════════
function MentorsTab({ onAdd, onSelect }) {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setMentors(await api('adminGetMentors')); }
    catch(e){} finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function handleRemove(mentor_id, name) {
    if (!window.confirm(`Remove mentor ${name}? Their student assignments will remain.`)) return;
    try {
      await api('adminRemoveMentor', { mentor_id });
      setMentors(m => m.filter(x => x.mentor_id !== mentor_id));
    } catch(e) { alert('Failed'); }
  }

  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontWeight:700, fontSize:15 }}>Mentors ({mentors.length})</div>
        <button className="btn btn-primary btn-sm" onClick={onAdd}>+ Add Mentor</button>
      </div>
      {loading ? <LoadingSpinner /> : mentors.map(m => (
        <Card key={m.mentor_id} onClick={() => onSelect(m)}
          style={{ borderLeft:`4px solid ${C.teal}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Avatar name={m.name} size={42} color={C.teal} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14 }}>{m.name}</div>
              <div style={{ fontSize:11, color:C.sub }}>{m.phone} · ID: {m.mentor_id}</div>
              <div style={{ marginTop:4 }}>
                <Pill color={C.teal} small>👥 {m.student_count} student{m.student_count!==1?'s':''}</Pill>
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); handleRemove(m.mentor_id, m.name); }}
              style={{ background:'#FEE2E2', border:'none', color:C.red, borderRadius:6,
                padding:'5px 10px', fontSize:12, cursor:'pointer', flexShrink:0 }}>
              Remove
            </button>
          </div>
        </Card>
      ))}
      {!loading && !mentors.length && <Empty icon="🧑‍🏫" text="No mentors yet" />}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// MENTOR DETAIL
// ══════════════════════════════════════════════════════════════
function MentorDetail({ mentor, onBack }) {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState('students');
  const [selStudent, setSelStudent] = useState('');
  const [assigning, setAssigning]   = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    Promise.all([
      api('mentorGetStudents', { mentor_id: String(mentor.phone) }),
      api('adminGetStudents'),
    ]).then(([ms, all]) => {
      setStudents(ms);
      setAllStudents(all);
    }).catch(console.error).finally(() => setLoading(false));
  }, [mentor.phone, mentor.mentor_id]);

  async function handleAssignStudent() {
    if (!selStudent) return;
    setAssigning(true);
    try {
      await api('adminAssignMentor', {
        mentor_id: String(mentor.phone),
        student_phone: selStudent,
        type: 'student',
      });
      const s = allStudents.find(x => String(x.phone) === String(selStudent));
      if (s) setStudents(prev => [...prev, { ...s, overall_pct:0, consistency_7d:0, days_since_active:999 }]);
      setSelStudent('');
      alert('Student assigned ✓');
    } catch(e) { alert('Failed: ' + e.message); }
    finally { setAssigning(false); }
  }

  if (selectedStudent) return (
    <StudentDetail student={selectedStudent} onBack={() => setSelectedStudent(null)} />
  );

  const DTABS = [{ key:'students', label:'Students' }, { key:'info', label:'Info' }];

  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer' }}>←</button>
          <Avatar name={mentor.name} size={34} color={C.teal} />
          <div>
            <div style={{ fontSize:15, fontWeight:700 }}>{mentor.name}</div>
            <div className="sub">{mentor.phone} · {mentor.student_count} students</div>
          </div>
        </div>
      </div>

      <div style={{ display:'flex', background:C.card, borderBottom:`1px solid ${C.border}`, padding:'0 12px' }}>
        {DTABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding:'10px 14px', fontSize:12, fontWeight:600, border:'none', background:'none',
              cursor:'pointer', color:tab===t.key?C.blue:C.sub,
              borderBottom:tab===t.key?`2px solid ${C.blue}`:'2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="page" style={{ paddingBottom:20 }}>
        {loading ? <LoadingSpinner /> : <>

          {tab==='students' && <>
            {/* Assign student */}
            <Card>
              <SectionTitle>➕ Assign Student to this Mentor</SectionTitle>
              <div style={{ display:'flex', gap:8 }}>
                <select value={selStudent} onChange={e => setSelStudent(e.target.value)}
                  style={{ flex:1, padding:'8px 10px', borderRadius:8,
                    border:`1px solid ${C.border}`, fontSize:13 }}>
                  <option value="">Select student...</option>
                  {allStudents
                    .filter(s => !students.some(x => String(x.phone)===String(s.phone)))
                    .map(s => (
                      <option key={s.phone} value={s.phone}>{s.name} · {s.batch||'No batch'}</option>
                    ))}
                </select>
                <button className="btn btn-primary btn-sm" onClick={handleAssignStudent} disabled={assigning}>
                  {assigning ? '…' : 'Assign'}
                </button>
              </div>
            </Card>

            {/* Student list */}
            <div style={{ fontSize:12, color:C.sub, marginBottom:8 }}>
              {students.length} assigned student{students.length!==1?'s':''}
            </div>
            {students.map(s => (
              <Card key={s.phone} onClick={() => setSelectedStudent(s)}
                style={{ borderLeft:`4px solid ${s.days_since_active>=3||s.consistency_7d<50?C.red:C.blue}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <Avatar name={s.name} size={38} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:13 }}>{s.name}</div>
                    <div style={{ fontSize:11, color:C.sub }}>{s.phone} · {s.batch||'No batch'}</div>
                    <div style={{ display:'flex', gap:8, marginTop:3, flexWrap:'wrap' }}>
                      <span style={{ fontSize:11, color:C.blue }}>📚 {s.overall_pct||0}%</span>
                      <span style={{ fontSize:11, color:C.teal }}>🔥 {s.consistency_7d||0}%</span>
                      <span style={{ fontSize:11, color:s.days_since_active<=1?C.green:C.sub }}>
                        ⚡ {s.days_since_active===0?'Today':s.days_since_active>=999?'Never':`${s.days_since_active}d ago`}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:20, fontWeight:800, color:C.navy }}>{s.overall_pct||0}%</div>
                  </div>
                </div>
              </Card>
            ))}
            {!students.length && <Empty icon="👥" text="No students assigned yet" />}
          </>}

          {tab==='info' && (
            <Card>
              <SectionTitle>🧑‍🏫 Mentor Info</SectionTitle>
              {[
                { label:'Name',       val: mentor.name },
                { label:'Phone',      val: mentor.phone },
                { label:'Mentor ID',  val: mentor.mentor_id },
                { label:'Students',   val: mentor.student_count },
              ].map(r => (
                <div key={r.label} style={{ display:'flex', justifyContent:'space-between',
                  padding:'10px 0', borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:13, color:C.sub }}>{r.label}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:C.text }}>{r.val}</span>
                </div>
              ))}
            </Card>
          )}
        </>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TESTS TAB (Admin)
// ══════════════════════════════════════════════════════════════
function AdminTestsTab() {
  const [adding, setAdding] = useState(false);
  const [form, setForm]     = useState({ category:'', test_code:'', test_name:'', marks_total:'100', test_type:'' });
  const [saving, setSaving] = useState(false);

  async function handleAdd(e) {
    e.preventDefault(); setSaving(true);
    try {
      await api('adminManageTest', { ...form, action:'add' });
      alert('Test added ✓');
      setAdding(false);
      setForm({ category:'', test_code:'', test_name:'', marks_total:'100', test_type:'' });
    } catch(e) { alert('Failed: ' + e.message); }
    finally { setSaving(false); }
  }

  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontWeight:700, fontSize:15 }}>Test Master</div>
        <button className="btn btn-primary btn-sm" onClick={() => setAdding(a=>!a)}>
          {adding ? 'Cancel' : '+ Add Test'}
        </button>
      </div>
      {adding && (
        <Card>
          <SectionTitle>Add New Test</SectionTitle>
          <form onSubmit={handleAdd}>
            {[
              { key:'category',    label:'Category',    placeholder:'e.g. GS Prelims' },
              { key:'test_code',   label:'Test Code',   placeholder:'e.g. EDGE-GS-001' },
              { key:'test_name',   label:'Test Name',   placeholder:'Full test name' },
              { key:'marks_total', label:'Total Marks', placeholder:'100', type:'number' },
              { key:'test_type',   label:'Test Type',   placeholder:'EDGE / LEEP / CMT' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:10 }}>
                <label style={{ fontSize:12, color:C.sub, display:'block', marginBottom:4 }}>{f.label}</label>
                <input className="input-field" type={f.type||'text'} style={{ margin:0 }}
                  placeholder={f.placeholder}
                  value={form[f.key]} onChange={e => setForm(v=>({...v,[f.key]:e.target.value}))}
                  required={f.key!=='test_type'} />
              </div>
            ))}
            <button type="submit" className="btn btn-primary" style={{ width:'100%' }} disabled={saving}>
              {saving ? '…' : 'Add Test'}
            </button>
          </form>
        </Card>
      )}
      <Card>
        <div style={{ fontSize:12, color:C.sub, textAlign:'center', padding:'20px 0' }}>
          Add tests here to make them available in the student test logging interface.<br />
          They will appear in the Tests_Master sheet.
        </div>
      </Card>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// ADD STUDENT FORM
// ══════════════════════════════════════════════════════════════
function AddStudentForm({ onDone, onCancel }) {
  const [form, setForm]     = useState({ phone:'', name:'', batch:'', target_year:'', optional:'' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setSaving(true);
    try { await api('adminAddStudent', form); onDone(); }
    catch(err) { setError(err.message); setSaving(false); }
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onCancel} style={{ background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer' }}>←</button>
          <div style={{ fontWeight:700, fontSize:16 }}>Add New Student</div>
        </div>
      </div>
      <div className="page">
        <Card>
          {error && <div style={{ background:'#FEE2E2', color:C.red, padding:'10px 12px',
            borderRadius:8, fontSize:13, marginBottom:12 }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            {[
              { key:'phone',       label:'Phone Number',     type:'tel',    req:true  },
              { key:'name',        label:'Full Name',         type:'text',   req:true  },
              { key:'batch',       label:'Batch',             type:'text',   req:false },
              { key:'target_year', label:'Target Year',       type:'number', req:false },
              { key:'optional',    label:'Optional Subject',  type:'text',   req:false },
            ].map(f => (
              <div key={f.key} className="input-group">
                <label>{f.label}</label>
                <input className="input-field" type={f.type} required={f.req}
                  value={form[f.key]} onChange={e => setForm(v=>({...v,[f.key]:e.target.value}))} />
              </div>
            ))}
            <div style={{ display:'flex', gap:10 }}>
              <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex:1 }} disabled={saving}>
                {saving ? '…' : 'Add Student'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ADD MENTOR FORM
// ══════════════════════════════════════════════════════════════
function AddMentorForm({ onDone, onCancel }) {
  const [form, setForm]     = useState({ mentor_id:'', name:'', phone:'' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setSaving(true);
    try { await api('adminAddMentor', form); onDone(); }
    catch(err) { setError(err.message); setSaving(false); }
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onCancel} style={{ background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer' }}>←</button>
          <div style={{ fontWeight:700, fontSize:16 }}>Add New Mentor</div>
        </div>
      </div>
      <div className="page">
        <Card>
          {error && <div style={{ background:'#FEE2E2', color:C.red, padding:'10px 12px',
            borderRadius:8, fontSize:13, marginBottom:12 }}>{error}</div>}
          <div style={{ background:'#EFF6FF', border:`1px solid #BFDBFE`, borderRadius:8,
            padding:'10px 12px', fontSize:12, color:C.blue, marginBottom:12 }}>
            💡 Mentor ID should be the mentor's phone number for consistent matching.
          </div>
          <form onSubmit={handleSubmit}>
            {[
              { key:'mentor_id', label:'Mentor ID (use phone number)' },
              { key:'name',      label:'Full Name' },
              { key:'phone',     label:'Phone Number' },
            ].map(f => (
              <div key={f.key} className="input-group">
                <label>{f.label}</label>
                <input className="input-field" type="text" required
                  value={form[f.key]} onChange={e => setForm(v=>({...v,[f.key]:e.target.value}))} />
              </div>
            ))}
            <div style={{ display:'flex', gap:10 }}>
              <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex:1 }} disabled={saving}>
                {saving ? '…' : 'Add Mentor'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
