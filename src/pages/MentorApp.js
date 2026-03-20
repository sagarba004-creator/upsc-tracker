import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const C = {
  navy:'#1B3A6B', blue:'#2563EB', green:'#16A34A', orange:'#EA580C',
  red:'#DC2626', amber:'#D97706', purple:'#7C3AED', teal:'#0D9488',
  card:'#FFFFFF', border:'#E2E8F0', text:'#1E293B', sub:'#64748B', light:'#F8FAFC',
};

function Card({ children, style={}, onClick }) {
  return <div onClick={onClick} style={{ background:C.card, borderRadius:14, padding:'16px',
    boxShadow:'0 1px 8px rgba(0,0,0,0.07)', marginBottom:12, ...(onClick?{cursor:'pointer'}:{}), ...style }}>{children}</div>;
}
function Bar({ pct=0, color=C.blue, height=6 }) {
  return <div style={{ background:'#E2E8F0', borderRadius:99, height, overflow:'hidden' }}>
    <div style={{ width:`${Math.min(100,pct)}%`, height, background:color, borderRadius:99, transition:'width 0.4s' }} /></div>;
}
function Pill({ color=C.blue, children, small }) {
  return <span style={{ background:`${color}18`, color, border:`1px solid ${color}40`, borderRadius:99,
    padding:small?'2px 7px':'3px 10px', fontSize:small?10:11, fontWeight:700 }}>{children}</span>;
}
function LoadingSpinner() {
  return <div style={{ textAlign:'center', padding:40 }}><div className="spinner spinner-dark" style={{ width:30, height:30, margin:'0 auto' }} /></div>;
}
function Empty({ icon, text }) {
  return <div className="empty"><div className="empty-icon">{icon}</div>{text}</div>;
}

const TABS = [
  {key:'students', icon:'👥', label:'Students'},
  {key:'alerts',   icon:'🚨', label:'Alerts'},
];

export default function MentorApp({ user, onLogout }) {
  const [tab, setTab]         = useState('students');
  const [selected, setSelected] = useState(null);

  if (selected) return <StudentDetail student={selected} mentor={user} onBack={() => setSelected(null)} />;

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div style={{ fontSize:17, fontWeight:800 }}>🧑‍🏫 Mentor Panel</div>
          <div className="sub">{user.name} · {user.mentor_id}</div>
        </div>
        <button onClick={onLogout} style={{ background:'rgba(255,255,255,0.15)', border:'none',
          color:'#fff', borderRadius:8, padding:'6px 14px', fontSize:13, cursor:'pointer' }}>Logout</button>
      </div>
      <div className="page" style={{ paddingBottom:80 }}>
        {tab==='students' && <StudentsTab mentor={user} onSelect={setSelected} />}
        {tab==='alerts'   && <AlertsTab   mentor={user} onSelect={setSelected} />}
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

function StudentsTab({ mentor, onSelect }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');

  useEffect(() => {
    api('mentorGetStudents', { mentor_id: mentor.mentor_id })
      .then(setStudents).catch(console.error).finally(() => setLoading(false));
  }, [mentor.mentor_id]);

  const filtered = students.filter(s =>
    !search || s.name?.toLowerCase().includes(search.toLowerCase()) || String(s.phone).includes(search));

  return (
    <>
      <div style={{ marginBottom:12 }}>
        <input className="input-field" style={{ margin:0 }} placeholder="🔍 Search student..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {loading ? <LoadingSpinner /> : <>
        <div style={{ fontSize:12, color:C.sub, marginBottom:8 }}>{filtered.length} assigned students</div>
        {filtered.map(s => (
          <Card key={s.phone} onClick={() => onSelect(s)}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:99, background:`${C.navy}15`, display:'flex',
                alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:800, color:C.navy, flexShrink:0 }}>
                {s.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>{s.name}</div>
                <div style={{ fontSize:11, color:C.sub, marginBottom:5 }}>{s.phone} · {s.batch||'No batch'}</div>
                <Bar pct={s.overall_pct||0} />
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:20, fontWeight:800, color:C.navy }}>{s.overall_pct||0}%</div>
                <div style={{ fontSize:10, color:C.sub }}>Progress</div>
              </div>
            </div>
          </Card>
        ))}
        {!filtered.length && <Empty icon="👥" text="No students assigned yet" />}
      </>}
    </>
  );
}

function AlertsTab({ mentor, onSelect }) {
  const [alerts, setAlerts]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('mentorGetAlerts', { mentor_id: mentor.mentor_id })
      .then(setAlerts).catch(console.error).finally(() => setLoading(false));
  }, [mentor.mentor_id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
        <span style={{ fontSize:20 }}>🚨</span>
        <div><div style={{ fontWeight:700, fontSize:15 }}>Students Needing Attention</div>
          <div style={{ fontSize:12, color:C.sub }}>{alerts.length} alerts</div></div>
      </div>
      {alerts.map(a => (
        <Card key={a.phone} onClick={() => onSelect(a)} style={{ borderLeft:`4px solid ${C.red}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontWeight:700, fontSize:14 }}>{a.name}</div>
              <div style={{ fontSize:11, color:C.sub, marginBottom:6 }}>{a.phone}</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {a.reasons.map((r,i) => <Pill key={i} color={r.type==='inactive'?C.red:C.amber} small>{r.msg}</Pill>)}
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:11, color:C.sub }}>Inactive</div>
              <div style={{ fontSize:18, fontWeight:800, color:C.red }}>{a.days_since_active}d</div>
            </div>
          </div>
        </Card>
      ))}
      {!alerts.length && <Empty icon="✅" text="All your students are on track!" />}
    </>
  );
}

function StudentDetail({ student, mentor, onBack }) {
  const [dash, setDash]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState('progress');
  const [note, setNote]       = useState('');
  const [saving, setSaving]   = useState(false);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    api('mentorGetStudentDetail', { mentor_id:mentor.mentor_id, phone:student.phone })
      .then(d => { setDash(d); setFeedback(d.feedback||[]); })
      .catch(console.error).finally(() => setLoading(false));
  }, [student.phone, mentor.mentor_id]);

  async function handleAddNote(e) {
    e.preventDefault();
    if (!note.trim()) return;
    setSaving(true);
    try {
      const res = await api('mentorAddFeedback', { mentor_id:mentor.mentor_id, student_phone:student.phone, note:note.trim() });
      const now = new Date().toLocaleString('en-IN');
      setFeedback(f => [{ id:res.id, mentor_id:mentor.mentor_id, student_phone:student.phone,
        note:note.trim(), created_date:now }, ...f]);
      setNote('');
    } catch(e) { alert('Failed to save note'); }
    finally { setSaving(false); }
  }

  const DTABS = [
    {key:'progress',     label:'Progress'},
    {key:'consistency',  label:'Consistency'},
    {key:'tests',        label:'Tests'},
    {key:'notes',        label:'Notes'},
  ];

  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer' }}>←</button>
          <div><div style={{ fontSize:15, fontWeight:700 }}>{student.name}</div>
            <div className="sub">{student.phone} · {student.batch||'No batch'}</div></div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{ display:'flex', borderBottom:`1px solid ${C.border}`, background:C.card, padding:'0 16px', overflowX:'auto' }}>
        {DTABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding:'10px 14px', fontSize:12, fontWeight:600, border:'none', background:'none', cursor:'pointer',
              whiteSpace:'nowrap', color:tab===t.key?C.blue:C.sub,
              borderBottom:tab===t.key?`2px solid ${C.blue}`:'2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="page" style={{ paddingBottom:20 }}>
        {loading ? <LoadingSpinner /> : !dash ? <Empty icon="📊" text="No data available" /> : <>

          {/* Progress */}
          {tab==='progress' && <>
            {/* Score summary */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              {[
                {label:'Pre Success',   value:`${dash.pre_success||0}%`,   color:C.blue},
                {label:'Mains Success', value:`${dash.mains_success||0}%`, color:C.purple},
                {label:'Consistency 7d',value:`${dash.consistency_7d||0}%`,color:C.teal},
                {label:'Overall',       value:`${dash.gs_summary?.[0]?.pct||0}%`, color:C.navy},
              ].map(m => (
                <Card key={m.label} style={{ textAlign:'center', padding:'12px 8px', marginBottom:0 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:m.color }}>{m.value}</div>
                  <div style={{ fontSize:10, color:C.sub, marginTop:2 }}>{m.label}</div>
                </Card>
              ))}
            </div>
            {/* Paper bars */}
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>Paper Progress</div>
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
            {/* Subject breakdown */}
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Subject Breakdown</div>
              {dash.subjects?.map(s => (
                <div key={s.subject} style={{ padding:'7px 0', borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                    <div>
                      <span style={{ fontSize:12, fontWeight:600 }}>{s.subject}</span>
                      <span style={{ fontSize:10, color:C.sub, marginLeft:5 }}>{s.gs_paper}</span>
                    </div>
                    <span style={{ fontSize:12, fontWeight:700, color:C.navy }}>{s.completion_pct}%</span>
                  </div>
                  <Bar pct={s.completion_pct} height={4}
                    color={s.exam_type==='pre'?C.blue:s.exam_type==='mains'?C.orange:C.teal} />
                </div>
              ))}
            </Card>
          </>}

          {/* Consistency */}
          {tab==='consistency' && <>
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>Consistency Overview</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, textAlign:'center' }}>
                {[
                  {label:'Weekly', value:`${dash.consistency?.weekly?.consistency_pct||0}%`},
                  {label:'Monthly', value:`${dash.consistency?.monthly?.consistency_pct||0}%`},
                  {label:'Overall', value:`${dash.consistency?.overall?.consistency_pct||0}%`},
                ].map(m => (
                  <div key={m.label} style={{ background:C.light, borderRadius:10, padding:'10px 6px' }}>
                    <div style={{ fontSize:18, fontWeight:800, color:C.teal }}>{m.value}</div>
                    <div style={{ fontSize:10, color:C.sub }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </Card>
            {/* 30-day heatmap from consistency data */}
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Recent Activity (30 days)</div>
              {dash.consistency?.heatmap ? (
                <div style={{ display:'flex', flexWrap:'wrap', gap:3 }}>
                  {dash.consistency.heatmap.map((d,i) => (
                    <div key={i} title={`${d.date}: ${d.score}%`}
                      style={{ width:16, height:16, borderRadius:3,
                        background: d.score>=80?'#16A34A':d.score>=50?'#65A30D':d.score>0?'#FCA5A5':'#E2E8F0' }} />
                  ))}
                </div>
              ) : <div style={{ fontSize:12, color:C.sub }}>No activity data</div>}
            </Card>
          </>}

          {/* Tests */}
          {tab==='tests' && <>
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Prelims Tests</div>
              {dash.test_scores?.prelims?.length ? dash.test_scores.prelims.slice(0,10).map((t,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:`1px solid ${C.border}`, fontSize:12 }}>
                  <span style={{ flex:1, marginRight:10 }}>{t.test_name}</span>
                  <span style={{ fontWeight:700 }}>{t.marks_scored}/{t.marks_total}</span>
                </div>
              )) : <div style={{ fontSize:12, color:C.sub }}>No tests attempted</div>}
            </Card>
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Mains Tests</div>
              {dash.test_scores?.mains?.length ? dash.test_scores.mains.slice(0,10).map((t,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:`1px solid ${C.border}`, fontSize:12 }}>
                  <span style={{ flex:1, marginRight:10 }}>{t.test_name}</span>
                  <span style={{ fontWeight:700 }}>{t.attempted}/{t.no_of_questions} Qs</span>
                </div>
              )) : <div style={{ fontSize:12, color:C.sub }}>No tests attempted</div>}
            </Card>
          </>}

          {/* Notes */}
          {tab==='notes' && <>
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Add Note / Feedback</div>
              <form onSubmit={handleAddNote}>
                <textarea value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Write feedback, observations or action items for this student..."
                  style={{ width:'100%', minHeight:80, padding:'10px 12px', borderRadius:10,
                    border:`1.5px solid ${C.border}`, fontSize:13, fontFamily:'inherit',
                    resize:'vertical', boxSizing:'border-box', outline:'none', marginBottom:10 }} />
                <button type="submit" className="btn btn-primary" style={{ width:'100%' }} disabled={saving||!note.trim()}>
                  {saving ? '...' : '📝 Save Note'}
                </button>
              </form>
            </Card>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:8, color:C.sub }}>
              Previous Notes ({feedback.length})
            </div>
            {feedback.length ? feedback.map(f => (
              <Card key={f.id} style={{ borderLeft:`3px solid ${C.teal}` }}>
                <div style={{ fontSize:13, color:C.text, marginBottom:6 }}>{f.note}</div>
                <div style={{ fontSize:10, color:C.sub }}>{f.created_date}</div>
              </Card>
            )) : <Empty icon="📝" text="No notes yet — add the first one above" />}
          </>}
        </>}
      </div>
    </div>
  );
}
