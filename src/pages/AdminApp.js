import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

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
  { key:'mentors',     icon:'🧑‍🏫', label:'Mentors'   },
  { key:'tests',       icon:'📝', label:'Tests'      },
];
function Pill({ color='#2563EB', children, small }) {
  return <span style={{ background:`${color}18`, color, border:`1px solid ${color}40`, borderRadius:99,
    padding: small?'2px 7px':'3px 10px', fontSize:small?10:11, fontWeight:700 }}>{children}</span>;
}
function Card({ children, style={}, onClick }) {
  return <div onClick={onClick} style={{ background:C.card, borderRadius:14, padding:'16px',
    boxShadow:'0 1px 8px rgba(0,0,0,0.07)', marginBottom:12, ...(onClick?{cursor:'pointer'}:{}), ...style }}>{children}</div>;
}
function Bar({ pct=0, color=C.blue, height=6 }) {
  return <div style={{ background:'#E2E8F0', borderRadius:99, height, overflow:'hidden' }}>
    <div style={{ width:`${Math.min(100,pct)}%`, height, background:color, borderRadius:99, transition:'width 0.4s' }} /></div>;
}
function LoadingSpinner() {
  return <div style={{ textAlign:'center', padding:40 }}><div className="spinner spinner-dark" style={{ width:30, height:30, margin:'0 auto' }} /></div>;
}
function Empty({ icon, text }) {
  return <div className="empty"><div className="empty-icon">{icon}</div>{text}</div>;
}

export default function AdminApp({ user, onLogout }) {
  const [tab, setTab]     = useState('students');
  const [selected, setSelected] = useState(null);
  const [view, setView]   = useState(null);

  if (selected) return <StudentDetail student={selected} onBack={() => setSelected(null)} />;
  if (view === 'add_student') return <AddStudentForm onDone={() => setView(null)} onCancel={() => setView(null)} />;
  if (view === 'add_mentor')  return <AddMentorForm  onDone={() => setView(null)} onCancel={() => setView(null)} />;

  return (
    <div className="app-shell">
      <div className="topbar">
        <div><div style={{ fontSize:17, fontWeight:800 }}>⚙️ Admin Panel</div><div className="sub">{user.name}</div></div>
        <button onClick={onLogout} style={{ background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', borderRadius:8, padding:'6px 14px', fontSize:13, cursor:'pointer' }}>Logout</button>
      </div>
      <div className="page" style={{ paddingBottom:80 }}>
        {tab==='students'    && <StudentsTab    onSelect={setSelected} onAdd={() => setView('add_student')} />}
        {tab==='alerts'      && <AlertsTab      onSelect={setSelected} />}
        {tab==='leaderboard' && <LeaderboardTab onSelect={setSelected} />}
        {tab==='mentors'     && <MentorsTab     onAdd={() => setView('add_mentor')} />}
        {tab==='tests'       && <TestsTab />}
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
      a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='upsc_report.csv'; a.click();
    } catch(e) { alert('Download failed'); }
  }
  return (
    <>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input className="input-field" style={{ flex:1, margin:0 }} placeholder="🔍 Search name or phone..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <input className="input-field" style={{ width:90, margin:0 }} placeholder="Batch"
          value={batch} onChange={e => setBatch(e.target.value)} />
        <button className="btn btn-sm btn-primary" onClick={onAdd} style={{ flexShrink:0 }}>+ Add</button>
      </div>
      {loading ? <LoadingSpinner /> : <>
        <div style={{ fontSize:12, color:C.sub, marginBottom:8 }}>{filtered.length} students</div>
        {filtered.map(s => (
          <Card key={s.phone} onClick={() => onSelect(s)} style={{ borderLeft:`4px solid ${s.alerts?.length?C.red:C.blue}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:99, background:`${C.navy}15`, display:'flex',
                alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:800, color:C.navy, flexShrink:0 }}>
                {s.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
                  <span style={{ fontWeight:700, fontSize:14 }}>{s.name}</span>
                  {s.alerts?.length>0 && <span style={{ fontSize:11 }}>🚨</span>}
                </div>
                <div style={{ fontSize:11, color:C.sub }}>{s.phone} · {s.batch||'No batch'}</div>
                <div style={{ display:'flex', gap:6, marginTop:4, flexWrap:'wrap' }}>
                  {s.alerts?.includes('inactive') && <Pill color={C.red} small>Inactive {s.days_since_active}d</Pill>}
                  {s.alerts?.includes('low_consistency') && <Pill color={C.amber} small>Low consistency {s.consistency_7d}%</Pill>}
                </div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:20, fontWeight:800, color:C.navy }}>{s.overall_pct}%</div>
                <div style={{ fontSize:10, color:C.sub }}>Progress</div>
              </div>
            </div>
          </Card>
        ))}
        {!filtered.length && <Empty icon="👥" text="No students found" />}
        <button className="btn btn-outline" style={{ width:'100%', marginTop:8 }} onClick={handleDownload}>⬇️ Download CSV Report</button>
      </>}
    </>
  );
}

function StudentDetail({ student, onBack }) {
  const [dash, setDash]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]       = useState('summary');
  const [mentors, setMentors] = useState([]);
  const [selMentor, setSelMentor] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [removing, setRemoving]   = useState(false);

  useEffect(() => {
    api('adminGetStudentFull', { phone:student.phone }).then(setDash).catch(console.error).finally(() => setLoading(false));
    api('adminGetMentors').then(setMentors).catch(()=>{});
  }, [student.phone]);

  async function handleRemove() {
    if (!window.confirm(`Remove ${student.name}? This cannot be undone.`)) return;
    setRemoving(true);
    try { await api('adminRemoveStudent',{phone:student.phone}); onBack(); }
    catch(e) { alert('Failed'); setRemoving(false); }
  }
  async function handleAssign() {
    if (!selMentor) return; setAssigning(true);
    try { await api('adminAssignMentor',{mentor_id:selMentor,student_phone:student.phone,type:'general'}); alert('Assigned ✓'); }
    catch(e){alert('Failed');} finally{setAssigning(false);}
  }

  const DTABS = [{key:'summary',label:'Summary'},{key:'subjects',label:'Subjects'},{key:'tests',label:'Tests'},{key:'feedback',label:'Feedback'}];

  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onBack} style={{ background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer' }}>←</button>
          <div><div style={{ fontSize:15, fontWeight:700 }}>{student.name}</div><div className="sub">{student.phone} · {student.batch}</div></div>
        </div>
        <button onClick={handleRemove} disabled={removing} style={{ background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', borderRadius:8, padding:'6px 12px', fontSize:12, cursor:'pointer' }}>🗑 Remove</button>
      </div>
      <div style={{ display:'flex', borderBottom:`1px solid ${C.border}`, background:C.card, padding:'0 16px' }}>
        {DTABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding:'10px 14px', fontSize:12, fontWeight:600, border:'none', background:'none', cursor:'pointer',
              color:tab===t.key?C.blue:C.sub, borderBottom:tab===t.key?`2px solid ${C.blue}`:'2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="page" style={{ paddingBottom:20 }}>
        {loading ? <LoadingSpinner /> : !dash ? <Empty icon="📊" text="No data yet" /> : <>
          {tab==='summary' && <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              {[
                {label:'Pre Success',   value:`${dash.pre_success||0}%`,   color:C.blue},
                {label:'Mains Success', value:`${dash.mains_success||0}%`, color:C.purple},
                {label:'Consistency',   value:`${dash.consistency?.overall?.consistency_pct||0}%`, color:C.teal},
                {label:'Overall',       value:`${dash.gs_summary?.[0]?.pct||0}%`, color:C.navy},
              ].map(m => (
                <Card key={m.label} style={{ textAlign:'center', padding:'14px 10px', marginBottom:0 }}>
                  <div style={{ fontSize:24, fontWeight:800, color:m.color }}>{m.value}</div>
                  <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>{m.label}</div>
                </Card>
              ))}
            </div>
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
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Assign Mentor</div>
              <div style={{ display:'flex', gap:8 }}>
                <select value={selMentor} onChange={e => setSelMentor(e.target.value)}
                  style={{ flex:1, padding:'8px 10px', borderRadius:8, border:`1px solid ${C.border}`, fontSize:13 }}>
                  <option value="">Select mentor...</option>
                  {mentors.map(m => <option key={m.mentor_id} value={m.mentor_id}>{m.name} ({m.mentor_id})</option>)}
                </select>
                <button className="btn btn-primary btn-sm" onClick={handleAssign} disabled={assigning}>{assigning?'...':'Assign'}</button>
              </div>
            </Card>
          </>}
          {tab==='subjects' && <Card>
            {dash.subjects?.map(s => (
              <div key={s.subject} style={{ padding:'8px 0', borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <div><span style={{ fontSize:13, fontWeight:600 }}>{s.subject}</span>
                    <span style={{ fontSize:10, color:C.sub, marginLeft:6 }}>{s.gs_paper}</span></div>
                  <span style={{ fontSize:13, fontWeight:700, color:C.navy }}>{s.completion_pct}%</span>
                </div>
                <Bar pct={s.completion_pct} color={s.exam_type==='pre'?C.blue:s.exam_type==='mains'?C.orange:C.teal} />
              </div>
            ))}
          </Card>}
          {tab==='tests' && <>
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Prelims Tests</div>
              {dash.test_scores?.prelims?.length ? dash.test_scores.prelims.map((t,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${C.border}`, fontSize:12 }}>
                  <span>{t.test_name}</span><span style={{ fontWeight:700 }}>{t.marks_scored}/{t.marks_total}</span>
                </div>
              )) : <div style={{ fontSize:12, color:C.sub }}>No tests attempted</div>}
            </Card>
            <Card>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Mains Tests</div>
              {dash.test_scores?.mains?.length ? dash.test_scores.mains.map((t,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${C.border}`, fontSize:12 }}>
                  <span>{t.test_name}</span><span style={{ fontWeight:700 }}>{t.attempted}/{t.no_of_questions} Qs</span>
                </div>
              )) : <div style={{ fontSize:12, color:C.sub }}>No tests attempted</div>}
            </Card>
          </>}
          {tab==='feedback' && <Card>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Mentor Feedback</div>
            {dash.feedback?.length ? dash.feedback.map(f => (
              <div key={f.id} style={{ padding:'10px', background:C.light, borderRadius:8, marginBottom:8, borderLeft:`3px solid ${C.teal}` }}>
                <div style={{ fontSize:12 }}>{f.note}</div>
                <div style={{ fontSize:10, color:C.sub, marginTop:4 }}>{f.mentor_id} · {f.created_date}</div>
              </div>
            )) : <div style={{ fontSize:12, color:C.sub }}>No feedback yet</div>}
          </Card>}
        </>}
      </div>
    </div>
  );
}

function AlertsTab({ onSelect }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api('adminGetAlerts').then(setAlerts).catch(console.error).finally(() => setLoading(false)); }, []);
  if (loading) return <LoadingSpinner />;
  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
        <span style={{ fontSize:20 }}>🚨</span>
        <div><div style={{ fontWeight:700, fontSize:15 }}>Student Alerts</div>
          <div style={{ fontSize:12, color:C.sub }}>{alerts.length} students need attention</div></div>
      </div>
      {alerts.map(a => (
        <Card key={a.phone} onClick={() => onSelect(a)} style={{ borderLeft:`4px solid ${C.red}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontWeight:700, fontSize:14 }}>{a.name}</div>
              <div style={{ fontSize:11, color:C.sub }}>{a.phone} · {a.batch}</div>
              <div style={{ display:'flex', gap:6, marginTop:6, flexWrap:'wrap' }}>
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
      {!alerts.length && <Empty icon="✅" text="No alerts — all students on track!" />}
    </>
  );
}

function LeaderboardTab({ onSelect }) {
  const [board, setBoard]   = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api('adminGetLeaderboard').then(setBoard).catch(console.error).finally(() => setLoading(false)); }, []);
  if (loading) return <LoadingSpinner />;
  const MEDAL = ['🥇','🥈','🥉'];
  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
        <span style={{ fontSize:20 }}>🏆</span>
        <div><div style={{ fontWeight:700, fontSize:15 }}>Top 30 Students</div>
          <div style={{ fontSize:12, color:C.sub }}>Progress + consistency + activity</div></div>
      </div>
      {board.map((s, i) => (
        <Card key={s.phone} onClick={() => onSelect(s)}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ fontSize:i<3?24:15, fontWeight:800, color:C.sub, width:32, textAlign:'center', flexShrink:0 }}>
              {i<3?MEDAL[i]:`#${i+1}`}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:700, fontSize:13 }}>{s.name}</div>
              <div style={{ fontSize:11, color:C.sub }}>{s.batch||'No batch'}</div>
              <div style={{ display:'flex', gap:10, marginTop:4, flexWrap:'wrap' }}>
                <span style={{ fontSize:11, color:C.blue }}>📚 {s.overall_pct}%</span>
                <span style={{ fontSize:11, color:C.teal }}>🔥 {s.consistency_7d}%</span>
                <span style={{ fontSize:11, color:s.days_since_active<=1?C.green:C.sub }}>
                  ⚡ {s.days_since_active===0?'Today':`${s.days_since_active}d ago`}
                </span>
              </div>
            </div>
            <div style={{ fontWeight:800, fontSize:18, color:C.navy, flexShrink:0 }}>{s.leaderboard_score}</div>
          </div>
        </Card>
      ))}
      {!board.length && <Empty icon="🏆" text="No data yet" />}
    </>
  );
}

function MentorsTab({ onAdd }) {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api('adminGetMentors').then(setMentors).catch(console.error).finally(() => setLoading(false)); }, []);
  async function handleRemove(mentor_id, name) {
    if (!window.confirm(`Remove mentor ${name}?`)) return;
    try { await api('adminRemoveMentor',{mentor_id}); setMentors(m => m.filter(x => x.mentor_id!==mentor_id)); }
    catch(e){alert('Failed');}
  }
  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontWeight:700, fontSize:15 }}>Mentors ({mentors.length})</div>
        <button className="btn btn-primary btn-sm" onClick={onAdd}>+ Add Mentor</button>
      </div>
      {loading ? <LoadingSpinner /> : mentors.map(m => (
        <Card key={m.mentor_id}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontWeight:700, fontSize:14 }}>{m.name}</div>
              <div style={{ fontSize:11, color:C.sub }}>{m.phone} · ID: {m.mentor_id}</div>
              <div style={{ fontSize:11, color:C.blue, marginTop:4 }}>{m.student_count} student{m.student_count!==1?'s':''} assigned</div>
            </div>
            <button onClick={() => handleRemove(m.mentor_id, m.name)}
              style={{ background:'#FEE2E2', border:'none', color:C.red, borderRadius:6, padding:'4px 10px', fontSize:12, cursor:'pointer' }}>
              Remove
            </button>
          </div>
        </Card>
      ))}
      {!loading && !mentors.length && <Empty icon="🧑‍🏫" text="No mentors yet" />}
    </>
  );
}

function TestsTab() {
  const [adding, setAdding] = useState(false);
  const [form, setForm]     = useState({ category:'', test_code:'', test_name:'', marks_total:'100', test_type:'' });
  const [saving, setSaving] = useState(false);
  async function handleAdd(e) {
    e.preventDefault(); setSaving(true);
    try { await api('adminManageTest',{...form, action:'add'}); alert('Test added ✓'); setAdding(false); setForm({category:'',test_code:'',test_name:'',marks_total:'100',test_type:''}); }
    catch(e){alert('Failed: '+e.message);} finally{setSaving(false);}
  }
  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontWeight:700, fontSize:15 }}>Test Master</div>
        <button className="btn btn-primary btn-sm" onClick={() => setAdding(a=>!a)}>{adding?'Cancel':'+ Add Test'}</button>
      </div>
      {adding && <Card>
        <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>Add New Test</div>
        <form onSubmit={handleAdd}>
          {[
            {key:'category',    label:'Category',    placeholder:'e.g. GS Prelims'},
            {key:'test_code',   label:'Test Code',   placeholder:'e.g. EDGE-GS-001'},
            {key:'test_name',   label:'Test Name',   placeholder:'Full test name'},
            {key:'marks_total', label:'Total Marks', placeholder:'100', type:'number'},
            {key:'test_type',   label:'Test Type',   placeholder:'EDGE / LEEP / CMT'},
          ].map(f => (
            <div key={f.key} style={{ marginBottom:10 }}>
              <label style={{ fontSize:12, color:C.sub, display:'block', marginBottom:4 }}>{f.label}</label>
              <input className="input-field" type={f.type||'text'} style={{ margin:0 }} placeholder={f.placeholder}
                value={form[f.key]} onChange={e => setForm(v=>({...v,[f.key]:e.target.value}))} required={f.key!=='test_type'} />
            </div>
          ))}
          <button type="submit" className="btn btn-primary" style={{ width:'100%' }} disabled={saving}>{saving?'...':'Add Test'}</button>
        </form>
      </Card>}
      <Card>
        <div style={{ fontSize:12, color:C.sub, textAlign:'center', padding:'20px 0' }}>
          Add tests here to make them available in the student test logging interface.<br/>They will appear in Tests_Master sheet.
        </div>
      </Card>
    </>
  );
}

function AddStudentForm({ onDone, onCancel }) {
  const [form, setForm]   = useState({ phone:'', name:'', batch:'', target_year:'', optional:'' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setSaving(true);
    try { await api('adminAddStudent', form); onDone(); }
    catch(err){ setError(err.message); setSaving(false); }
  }
  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onCancel} style={{ background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer' }}>←</button>
          <div style={{ fontWeight:700, fontSize:16 }}>Add New Student</div>
        </div>
      </div>
      <div className="page"><Card>
        {error && <div style={{ background:'#FEE2E2', color:C.red, padding:'10px 12px', borderRadius:8, fontSize:13, marginBottom:12 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            {key:'phone',label:'Phone Number',type:'tel',req:true},
            {key:'name',label:'Full Name',type:'text',req:true},
            {key:'batch',label:'Batch',type:'text',req:false},
            {key:'target_year',label:'Target Year',type:'number',req:false},
            {key:'optional',label:'Optional Subject',type:'text',req:false},
          ].map(f => (
            <div key={f.key} className="input-group">
              <label>{f.label}</label>
              <input className="input-field" type={f.type} required={f.req}
                value={form[f.key]} onChange={e => setForm(v=>({...v,[f.key]:e.target.value}))} />
            </div>
          ))}
          <div style={{ display:'flex', gap:10 }}>
            <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex:1 }} disabled={saving}>{saving?'...':'Add Student'}</button>
          </div>
        </form>
      </Card></div>
    </div>
  );
}

function AddMentorForm({ onDone, onCancel }) {
  const [form, setForm]   = useState({ mentor_id:'', name:'', phone:'' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');
  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setSaving(true);
    try { await api('adminAddMentor', form); onDone(); }
    catch(err){ setError(err.message); setSaving(false); }
  }
  return (
    <div className="app-shell">
      <div className="topbar">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button onClick={onCancel} style={{ background:'none', border:'none', color:'#fff', fontSize:22, cursor:'pointer' }}>←</button>
          <div style={{ fontWeight:700, fontSize:16 }}>Add New Mentor</div>
        </div>
      </div>
      <div className="page"><Card>
        {error && <div style={{ background:'#FEE2E2', color:C.red, padding:'10px 12px', borderRadius:8, fontSize:13, marginBottom:12 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            {key:'mentor_id',label:'Mentor ID (unique)'},
            {key:'name',label:'Full Name'},
            {key:'phone',label:'Phone Number'},
          ].map(f => (
            <div key={f.key} className="input-group">
              <label>{f.label}</label>
              <input className="input-field" type="text" required
                value={form[f.key]} onChange={e => setForm(v=>({...v,[f.key]:e.target.value}))} />
            </div>
          ))}
          <div style={{ display:'flex', gap:10 }}>
            <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex:1 }} disabled={saving}>{saving?'...':'Add Mentor'}</button>
          </div>
        </form>
      </Card></div>
    </div>
  );
}
