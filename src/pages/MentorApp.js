import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

// ── Design tokens (matching StudentApp) ──────────────────────
const NAVY   = '#1B3A6B';
const TEAL   = '#00838F';
const GREEN  = '#2E7D32';
const BLUE   = '#1565C0';
const ORANGE = '#E65100';
const PURPLE = '#6A1B9A';
const RED    = '#C62828';
const AMBER  = '#E65100';

const PAPER_COL = {
  'GS Paper 1': { top:'#2E7D32', bg:'#E8F5E9', text:'#2E7D32' },
  'GS Paper 2': { top:'#1565C0', bg:'#E3F0FF', text:'#1565C0' },
  'GS Paper 3': { top:'#E65100', bg:'#FFF3E0', text:'#E65100' },
  'GS Paper 4': { top:'#6A1B9A', bg:'#F3E5FF', text:'#6A1B9A' },
  'Essay':      { top:'#00695C', bg:'#E0F2F1', text:'#00695C' },
  'CSAT':       { top:'#1565C0', bg:'#E8EAF6', text:'#1565C0' },
  'Optional':   { top:'#7B3F00', bg:'#FFF8F0', text:'#7B3F00' },
};

// ── Shared components ─────────────────────────────────────────
function Card({ children, style={}, onClick }) {
  return (
    <div onClick={onClick}
      style={{ background:'#fff', borderRadius:14, padding:'14px 16px',
        boxShadow:'0 2px 8px rgba(0,0,0,0.07)', marginBottom:10,
        ...(onClick?{cursor:'pointer'}:{}), ...style }}>
      {children}
    </div>
  );
}
function Bar({ pct=0, color=BLUE, height=5 }) {
  return (
    <div style={{ background:'#F0F0F0', borderRadius:99, height, overflow:'hidden' }}>
      <div style={{ width:`${Math.min(100,pct)}%`, height, background:color,
        borderRadius:99, transition:'width 0.4s' }} />
    </div>
  );
}
function Pill({ color, bg, children }) {
  return (
    <span style={{ background: bg || color+'18', color,
      border:`1px solid ${color}40`, borderRadius:99,
      padding:'2px 8px', fontSize:10, fontWeight:700, whiteSpace:'nowrap' }}>
      {children}
    </span>
  );
}
function Avatar({ name, size=40, color=NAVY }) {
  return (
    <div style={{ width:size, height:size, borderRadius:'50%',
      background:`linear-gradient(135deg,${color},${TEAL})`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:size*0.38, fontWeight:800, color:'#fff', flexShrink:0 }}>
      {name?.[0]?.toUpperCase() || '?'}
    </div>
  );
}
function Spinner() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      padding:48, flexDirection:'column', gap:12 }}>
      <div style={{ width:36, height:36, borderRadius:'50%',
        border:`4px solid ${NAVY}`, borderTopColor:'transparent',
        animation:'spin 0.8s linear infinite' }} />
      <div style={{ color:'#9CA3AF', fontSize:13 }}>Loading…</div>
    </div>
  );
}
function Empty({ icon, text }) {
  return (
    <div style={{ textAlign:'center', padding:'36px 20px', color:'#9CA3AF' }}>
      <div style={{ fontSize:36, marginBottom:8 }}>{icon}</div>
      <div style={{ fontSize:13, fontWeight:600 }}>{text}</div>
    </div>
  );
}

function ScoreGrid({ items }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
      {items.map(s => (
        <div key={s.label} style={{ background:'#F8FAFF', borderRadius:10,
          padding:'10px 8px', textAlign:'center', border:'1px solid #E8EEFF' }}>
          <div style={{ fontSize:22, fontWeight:900, color:s.color }}>{s.val}%</div>
          <div style={{ fontSize:9, color:'#6B7280', fontWeight:600, marginTop:2, lineHeight:1.3 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Score colour helper ───────────────────────────────────────
function scoreColor(v) {
  if (v >= 70) return GREEN;
  if (v >= 40) return ORANGE;
  return RED;
}

// ── Student row used across tabs ──────────────────────────────
function StudentRow({ student: s, onSelect, rank }) {
  const succ = s.success_prob || Math.round(
    (s.proficiency_score||0)*0.40 + (s.exam_readiness||0)*0.35 + (s.consistency_score||0)*0.25);
  const isAlert = (s.days_since_active||0) >= 3 || (s.consistency_7d||0) < 50;
  return (
    <div onClick={() => onSelect(s.phone)}
      style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0',
        borderBottom:'1px solid #F0F0F0', cursor:'pointer' }}>
      {rank && (
        <div style={{ width:24, fontSize:13, fontWeight:800,
          color: rank<=3 ? ['#F59E0B','#9CA3AF','#CD7F32'][rank-1] : '#9CA3AF',
          textAlign:'center', flexShrink:0 }}>
          {rank<=3 ? ['🥇','🥈','🥉'][rank-1] : rank}
        </div>
      )}
      <Avatar name={s.name} size={36} color={isAlert ? RED : NAVY} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:NAVY,
          display:'flex', alignItems:'center', gap:6 }}>
          {s.name}
          {isAlert && <span style={{ fontSize:9, background:'#FEE2E2', color:RED,
            padding:'1px 5px', borderRadius:99, fontWeight:800 }}>NEEDS ATTENTION</span>}
        </div>
        <div style={{ fontSize:10, color:'#9CA3AF', marginTop:1 }}>
          {s.batch || 'No batch'} · {s.optional || '—'}
        </div>
        <div style={{ display:'flex', gap:6, marginTop:5, flexWrap:'wrap' }}>
          <Pill color={BLUE}>Prof {s.proficiency_score||0}%</Pill>
          <Pill color={ORANGE}>Ready {s.exam_readiness||0}%</Pill>
          <Pill color={TEAL}>Cons {s.consistency_score||0}%</Pill>
        </div>
      </div>
      <div style={{ textAlign:'right', flexShrink:0 }}>
        <div style={{ fontSize:20, fontWeight:900, color:scoreColor(succ) }}>{succ}%</div>
        <div style={{ fontSize:9, color:'#9CA3AF' }}>Success</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════
export default function MentorApp({ user, onLogout }) {
  const [tab, setTab]       = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const mentorId = user.mentor_id || user.phone;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [studs, alrts] = await Promise.all([
        api('mentorGetStudents', { mentor_id: mentorId }),
        api('mentorGetAlerts',   { mentor_id: mentorId }),
      ]);
      setStudents(Array.isArray(studs) ? studs : []);
      setAlerts(Array.isArray(alrts) ? alrts : []);
    } catch(e) { console.error(e); }
    setLoading(false);
  }, [mentorId]);

  useEffect(() => { load(); }, [load]);

  const alertCount = alerts.length;

  const TABS = [
    { key:'dashboard',   icon:'🏠', label:'Home'      },
    { key:'students',    icon:'👥', label:'Students'  },
    { key:'leaderboard', icon:'🏆', label:'Leaders'   },
    { key:'alerts',      icon:'🔔', label:'Alerts', badge: alertCount },
  ];
  const NAV_COLORS = { dashboard:GREEN, students:BLUE, leaderboard:ORANGE, alerts:RED };

  if (selected) return (
    <StudentDetail
      phone={selected}
      mentorId={mentorId}
      students={students}
      onBack={() => setSelected(null)}
    />
  );

  return (
    <div style={{ background:'#F8FAFC', minHeight:'100vh',
      fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      {/* Header */}
      <div style={{ background:NAVY, padding:'14px 16px 12px',
        display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:17, fontWeight:800, color:'#fff' }}>🧑‍🏫 Mentor Portal</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', marginTop:1 }}>
            {user.name} · {students.length} students
          </div>
        </div>
        <button onClick={onLogout} style={{ background:'rgba(255,255,255,0.12)',
          border:'1px solid rgba(255,255,255,0.25)', color:'#fff',
          borderRadius:8, padding:'6px 12px', fontSize:12, cursor:'pointer' }}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={{ padding:'12px 12px 90px' }}>
        {loading ? <Spinner /> : <>
          {tab === 'dashboard'   && <DashboardTab   students={students} alerts={alerts} onSelect={setSelected} />}
          {tab === 'students'    && <StudentsTab     students={students} onSelect={setSelected} />}
          {tab === 'leaderboard' && <LeaderboardTab  students={students} onSelect={setSelected} />}
          {tab === 'alerts'      && <AlertsTab       alerts={alerts}     onSelect={setSelected} onRefresh={load} />}
        </>}
      </div>

      {/* Bottom nav */}
      <nav style={{ display:'flex', justifyContent:'space-around', alignItems:'center',
        background:'#fff', borderTop:'1px solid #E5E7EB', padding:'6px 0 10px',
        position:'fixed', bottom:0, left:0, right:0, zIndex:100,
        boxShadow:'0 -2px 8px rgba(0,0,0,0.06)' }}>
        {TABS.map(t => {
          const isActive = tab === t.key;
          const c = NAV_COLORS[t.key] || NAVY;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2,
                background:'none', border:'none', cursor:'pointer', padding:'4px 12px',
                color: isActive ? c : '#9CA3AF', position:'relative' }}>
              {isActive && (
                <div style={{ position:'absolute', top:-6, left:'50%',
                  transform:'translateX(-50%)', width:28, height:3,
                  borderRadius:99, background:c }} />
              )}
              {(t.badge||0) > 0 && (
                <div style={{ position:'absolute', top:0, right:4, background:RED,
                  color:'#fff', borderRadius:99, fontSize:8, fontWeight:800,
                  padding:'1px 4px', minWidth:14, textAlign:'center' }}>
                  {t.badge}
                </div>
              )}
              <span style={{ fontSize:20,
                filter: isActive ? 'none' : 'grayscale(60%) opacity(0.55)' }}>
                {t.icon}
              </span>
              <span style={{ fontSize:10, fontWeight: isActive ? 800 : 500 }}>{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// DASHBOARD TAB
// ══════════════════════════════════════════════════════════════
function DashboardTab({ students, alerts, onSelect }) {
  if (!students.length) return <Empty icon="👥" text="No students assigned yet." />;

  const avg = k => Math.round(students.reduce((s,st) => s+(Number(st[k])||0), 0) / students.length);
  const avgProf  = avg('proficiency_score');
  const avgReady = avg('exam_readiness');
  const avgCons  = avg('consistency_score');
  const avgSucc  = Math.round(avgProf*0.40 + avgReady*0.35 + avgCons*0.25);

  const top3 = [...students]
    .sort((a,b) => (b.success_prob||0) - (a.success_prob||0))
    .slice(0,3);

  const atRiskCount = students.filter(s =>
    (s.days_since_active||0) >= 3 || (s.consistency_7d||0) < 50).length;

  const neverLogged = students.filter(s => (s.days_since_active||0) >= 999).length;
  const fullyActive = students.filter(s =>
    (s.days_since_active||0) < 2 && (s.consistency_7d||0) >= 80).length;

  return (
    <div>
      {/* Cohort overview */}
      <Card>
        <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:12 }}>
          📊 Cohort Overview
        </div>
        <ScoreGrid items={[
          { label:'Avg Success Prob',   val:avgSucc,  color:NAVY   },
          { label:'Avg Proficiency',    val:avgProf,  color:GREEN  },
          { label:'Avg Exam Readiness', val:avgReady, color:ORANGE },
          { label:'Avg Consistency',    val:avgCons,  color:TEAL   },
        ]} />
        {[
          { label:'Proficiency',    val:avgProf,  color:GREEN  },
          { label:'Exam Readiness', val:avgReady, color:ORANGE },
          { label:'Consistency',    val:avgCons,  color:TEAL   },
        ].map(s => (
          <div key={s.label} style={{ marginBottom:8 }}>
            <div style={{ display:'flex', justifyContent:'space-between',
              fontSize:10, color:'#6B7280', marginBottom:3 }}>
              <span>{s.label}</span>
              <span style={{ fontWeight:700, color:s.color }}>{s.val}%</span>
            </div>
            <Bar pct={s.val} color={s.color} />
          </div>
        ))}
      </Card>

      {/* Quick stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:10 }}>
        {[
          { label:'Total',        val:students.length, color:NAVY,   bg:'#EEF4FF' },
          { label:'Active Today', val:fullyActive,     color:GREEN,  bg:'#E8F5E9' },
          { label:'At Risk',      val:atRiskCount,     color:RED,    bg:'#FEE2E2' },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:12,
            padding:'12px 8px', textAlign:'center' }}>
            <div style={{ fontSize:24, fontWeight:900, color:s.color }}>{s.val}</div>
            <div style={{ fontSize:10, color:s.color, fontWeight:700, marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Alerts banner */}
      {alerts.length > 0 && (
        <div style={{ background:'#FEE2E2', border:'1.5px solid #EF4444',
          borderRadius:14, padding:'12px 14px', marginBottom:10 }}>
          <div style={{ fontSize:13, fontWeight:800, color:RED, marginBottom:8 }}>
            ⚠️ {alerts.length} Student{alerts.length>1?'s':''} Need Attention
          </div>
          {alerts.slice(0,3).map(a => (
            <div key={a.phone} onClick={() => onSelect(a.phone)}
              style={{ display:'flex', alignItems:'center', gap:10,
                background:'#fff', borderRadius:10, padding:'8px 10px',
                marginBottom:6, cursor:'pointer', border:'1px solid #FECACA' }}>
              <Avatar name={a.name} size={30} color={RED} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:NAVY }}>{a.name}</div>
                <div style={{ fontSize:10, color:RED, marginTop:1 }}>
                  {a.reasons?.map(r=>r.msg).join(' · ')}
                </div>
              </div>
              <span style={{ color:'#9CA3AF', fontSize:16 }}>›</span>
            </div>
          ))}
          {alerts.length > 3 && (
            <div style={{ fontSize:11, color:RED, textAlign:'center',
              marginTop:4, fontWeight:600 }}>
              +{alerts.length-3} more in Alerts tab
            </div>
          )}
        </div>
      )}

      {/* Top 3 */}
      <Card>
        <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:10 }}>
          🏆 Top Performers
        </div>
        {top3.map((s,i) => (
          <StudentRow key={s.phone} student={s} onSelect={onSelect} rank={i+1} />
        ))}
      </Card>

      {/* Study habit insights */}
      <Card>
        <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:10 }}>
          💡 Insights
        </div>
        {[
          atRiskCount > students.length * 0.3 &&
            `🔴 ${atRiskCount} students (${Math.round(atRiskCount/students.length*100)}%) are at risk — consider group intervention`,
          neverLogged > 0 &&
            `📵 ${neverLogged} student${neverLogged>1?'s':''} have never logged a study session`,
          avgCons < 50 &&
            `📉 Cohort consistency is low (${avgCons}%) — recommend daily check-ins`,
          avgProf > 60 && avgReady < 40 &&
            `⚠️ Proficiency is good but Exam Readiness is lagging — focus on test series`,
          avgSucc >= 60 &&
            `✅ Cohort is on track — keep up the momentum!`,
        ].filter(Boolean).map((msg, i) => (
          <div key={i} style={{ fontSize:12, color:'#374151', padding:'7px 10px',
            background:'#F8FAFF', borderRadius:8, marginBottom:6, lineHeight:1.5 }}>
            {msg}
          </div>
        ))}
        {!atRiskCount && avgCons >= 50 && (
          <div style={{ fontSize:12, color:GREEN, fontWeight:600 }}>
            ✅ All students are on track this week!
          </div>
        )}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STUDENTS TAB
// ══════════════════════════════════════════════════════════════
function StudentsTab({ students, onSelect }) {
  const [search, setSearch] = useState('');
  const [sort, setSort]     = useState('success');

  const SORT_OPTIONS = [
    { key:'success',     label:'Success' },
    { key:'proficiency', label:'Proficiency' },
    { key:'readiness',   label:'Readiness' },
    { key:'consistency', label:'Consistency' },
    { key:'name',        label:'Name' },
  ];

  const filtered = students
    .filter(s => !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      String(s.phone).includes(search))
    .sort((a,b) => {
      if (sort==='name') return a.name?.localeCompare(b.name);
      if (sort==='proficiency') return (b.proficiency_score||0)-(a.proficiency_score||0);
      if (sort==='readiness')   return (b.exam_readiness||0)-(a.exam_readiness||0);
      if (sort==='consistency') return (b.consistency_score||0)-(a.consistency_score||0);
      return (b.success_prob||0)-(a.success_prob||0);
    });

  return (
    <div>
      {/* Search */}
      <div style={{ display:'flex', gap:8, marginBottom:10 }}>
        <input
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="🔍 Search student…"
          style={{ flex:1, padding:'9px 12px', borderRadius:10,
            border:'1.5px solid #E5E7EB', fontSize:13, outline:'none',
            background:'#fff' }} />
      </div>
      {/* Sort pills */}
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:10 }}>
        {SORT_OPTIONS.map(o => (
          <button key={o.key} onClick={() => setSort(o.key)}
            style={{ padding:'5px 12px', borderRadius:99, border:'none', cursor:'pointer',
              fontSize:11, fontWeight:700,
              background: sort===o.key ? NAVY : '#F0F0F0',
              color: sort===o.key ? '#fff' : '#6B7280' }}>
            {o.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize:11, color:'#9CA3AF', marginBottom:8 }}>
        {filtered.length} students · sorted by {sort}
      </div>
      <Card style={{ padding:'8px 14px' }}>
        {filtered.length
          ? filtered.map(s => <StudentRow key={s.phone} student={s} onSelect={onSelect} />)
          : <Empty icon="👥" text="No students found" />}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// LEADERBOARD TAB
// ══════════════════════════════════════════════════════════════
function LeaderboardTab({ students, onSelect }) {
  const [metric, setMetric] = useState('overall');

  const METRICS = [
    { key:'overall',     label:'Overall',     field:'success_prob',      color:NAVY   },
    { key:'proficiency', label:'Proficiency', field:'proficiency_score',  color:GREEN  },
    { key:'readiness',   label:'Readiness',   field:'exam_readiness',     color:ORANGE },
    { key:'consistency', label:'Consistency', field:'consistency_score',  color:TEAL   },
  ];
  const cur = METRICS.find(m=>m.key===metric);

  const top10 = [...students]
    .sort((a,b) => (Number(b[cur.field])||0) - (Number(a[cur.field])||0))
    .slice(0,10);

  return (
    <div>
      {/* Metric selector */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:6, marginBottom:12 }}>
        {METRICS.map(m => (
          <button key={m.key} onClick={() => setMetric(m.key)}
            style={{ padding:'8px 4px', borderRadius:10, border:'none', cursor:'pointer',
              fontSize:10, fontWeight:800, textAlign:'center',
              background: metric===m.key ? m.color : m.color+'15',
              color: metric===m.key ? '#fff' : m.color,
              boxShadow: metric===m.key ? `0 2px 6px ${m.color}40` : 'none' }}>
            {m.label}
          </button>
        ))}
      </div>

      <div style={{ fontSize:11, color:'#9CA3AF', marginBottom:8, fontWeight:600 }}>
        Top 10 by {cur.label}
      </div>

      <Card style={{ padding:'8px 14px' }}>
        {top10.length ? top10.map((s,i) => {
          const val = Number(s[cur.field]) || 0;
          return (
            <div key={s.phone} onClick={() => onSelect(s.phone)}
              style={{ display:'flex', alignItems:'center', gap:10,
                padding:'10px 0', borderBottom:'1px solid #F0F0F0', cursor:'pointer' }}>
              {/* Rank */}
              <div style={{ width:28, textAlign:'center', flexShrink:0,
                fontSize: i<3?16:13, fontWeight:800,
                color: i===0?'#F59E0B': i===1?'#9CA3AF': i===2?'#CD7F32': '#9CA3AF' }}>
                {i===0?'🥇': i===1?'🥈': i===2?'🥉': i+1}
              </div>
              <Avatar name={s.name} size={36} color={cur.color} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:NAVY }}>{s.name}</div>
                <div style={{ fontSize:10, color:'#9CA3AF', marginTop:1 }}>
                  {s.batch||'No batch'} · {s.optional||'—'}
                </div>
                <div style={{ marginTop:5 }}>
                  <Bar pct={val} color={cur.color} height={4} />
                </div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:20, fontWeight:900, color:cur.color }}>{val}%</div>
                <div style={{ fontSize:9, color:'#9CA3AF' }}>{cur.label}</div>
              </div>
            </div>
          );
        }) : <Empty icon="🏆" text="No data yet" />}
      </Card>

      {/* Distribution summary */}
      {students.length > 0 && (() => {
        const vals = students.map(s=>Number(s[cur.field])||0);
        const avg  = Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
        const high = vals.filter(v=>v>=70).length;
        const med  = vals.filter(v=>v>=40&&v<70).length;
        const low  = vals.filter(v=>v<40).length;
        return (
          <Card>
            <div style={{ fontSize:12, fontWeight:800, color:NAVY, marginBottom:10 }}>
              📈 {cur.label} Distribution
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:6 }}>
              {[
                { label:'Average', val:`${avg}%`, color:NAVY   },
                { label:'High 70+', val:high,     color:GREEN  },
                { label:'Mid 40-70',val:med,       color:ORANGE },
                { label:'Low <40',  val:low,       color:RED    },
              ].map(s=>(
                <div key={s.label} style={{ background:'#F8FAFF', borderRadius:10,
                  padding:'8px 4px', textAlign:'center' }}>
                  <div style={{ fontSize:16, fontWeight:900, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:9, color:'#6B7280', marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Card>
        );
      })()}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// ALERTS TAB
// ══════════════════════════════════════════════════════════════
function AlertsTab({ alerts, onSelect, onRefresh }) {
  const inactive   = alerts.filter(a => a.reasons?.some(r=>r.type==='inactive'));
  const lowCons    = alerts.filter(a => a.reasons?.some(r=>r.type==='low_consistency'));

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'center', marginBottom:10 }}>
        <div>
          <div style={{ fontSize:15, fontWeight:800, color:NAVY }}>
            ⚠️ Students Needing Attention
          </div>
          <div style={{ fontSize:11, color:'#9CA3AF', marginTop:2 }}>
            {alerts.length} alerts · tap any student to view details
          </div>
        </div>
        <button onClick={onRefresh}
          style={{ background:'#F0F0F0', border:'none', borderRadius:8,
            padding:'6px 10px', fontSize:11, cursor:'pointer', color:'#6B7280' }}>
          🔄 Refresh
        </button>
      </div>

      {!alerts.length && <Empty icon="✅" text="All students are on track!" />}

      {inactive.length > 0 && (
        <>
          <div style={{ fontSize:11, fontWeight:800, color:RED,
            marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }}>
            📵 Inactive ({inactive.length})
          </div>
          {inactive.map(a => <AlertRow key={a.phone} alert={a} onSelect={onSelect} />)}
        </>
      )}

      {lowCons.length > 0 && (
        <>
          <div style={{ fontSize:11, fontWeight:800, color:AMBER,
            marginTop:10, marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }}>
            📉 Low Consistency ({lowCons.length})
          </div>
          {lowCons.filter(a=>!a.reasons?.some(r=>r.type==='inactive'))
            .map(a => <AlertRow key={a.phone} alert={a} onSelect={onSelect} color={AMBER} />)}
        </>
      )}
    </div>
  );
}

function AlertRow({ alert: a, onSelect, color=RED }) {
  return (
    <div onClick={() => onSelect(a.phone)}
      style={{ display:'flex', alignItems:'center', gap:10,
        background:'#fff', borderRadius:12, padding:'12px 14px',
        marginBottom:8, cursor:'pointer', border:`1.5px solid ${color}30`,
        borderLeft:`4px solid ${color}`,
        boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
      <Avatar name={a.name} size={36} color={color} />
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:700, color:NAVY }}>{a.name}</div>
        <div style={{ fontSize:10, color:'#9CA3AF', marginTop:1 }}>
          {a.batch||'No batch'}
        </div>
        <div style={{ display:'flex', gap:6, marginTop:5, flexWrap:'wrap' }}>
          {a.reasons?.map((r,i) => (
            <Pill key={i} color={r.type==='inactive'?RED:AMBER}>{r.msg}</Pill>
          ))}
        </div>
      </div>
      <div style={{ textAlign:'right', flexShrink:0 }}>
        <div style={{ fontSize:18, fontWeight:900, color }}>
          {a.days_since_active >= 999 ? '∞' : `${a.days_since_active}d`}
        </div>
        <div style={{ fontSize:9, color:'#9CA3AF' }}>inactive</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STUDENT DETAIL (drill-down)
// ══════════════════════════════════════════════════════════════
function StudentDetail({ phone, mentorId, students, onBack }) {
  const studentMeta = students.find(s => s.phone === phone) || {};
  const [dash, setDash]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState('overview');
  const [note, setNote]         = useState('');
  const [saving, setSaving]     = useState(false);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    api('mentorGetStudentDetail', { mentor_id: mentorId, phone })
      .then(d => { setDash(d); setFeedback(d.feedback||[]); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [phone, mentorId]);

  async function addNote() {
    if (!note.trim()) return;
    setSaving(true);
    try {
      const res = await api('mentorAddFeedback', {
        mentor_id: mentorId, student_phone: phone, note: note.trim()
      });
      const now = new Date().toLocaleString('en-IN');
      setFeedback(f => [{ id:res.id, mentor_id:mentorId,
        student_phone:phone, note:note.trim(), created_date:now }, ...f]);
      setNote('');
    } catch(e) { alert('Failed to save'); }
    setSaving(false);
  }

  const DTABS = [
    { key:'overview',    label:'Overview'    },
    { key:'subjects',    label:'Subjects'    },
    { key:'consistency', label:'Consistency' },
    { key:'tests',       label:'Tests'       },
    { key:'notes',       label:'Notes'       },
  ];

  const succ = dash
    ? Math.round((dash.proficiency_score||0)*0.40+(dash.exam_readiness||0)*0.35+(dash.consistency_score||0)*0.25)
    : 0;

  return (
    <div style={{ background:'#F8FAFC', minHeight:'100vh',
      fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      {/* Header */}
      <div style={{ background:NAVY, padding:'12px 16px',
        display:'flex', alignItems:'center', gap:10 }}>
        <button onClick={onBack}
          style={{ background:'rgba(255,255,255,0.12)', border:'none',
            color:'#fff', fontSize:20, cursor:'pointer', borderRadius:8,
            padding:'4px 10px', lineHeight:1 }}>
          ←
        </button>
        <Avatar name={studentMeta.name} size={36} color={TEAL} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15, fontWeight:800, color:'#fff' }}>
            {studentMeta.name || phone}
          </div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', marginTop:1 }}>
            {studentMeta.batch||'No batch'} · {studentMeta.optional||'—'} · {phone}
          </div>
        </div>
        {!loading && dash && (
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:20, fontWeight:900, color:'#fff' }}>{succ}%</div>
            <div style={{ fontSize:9, color:'rgba(255,255,255,0.6)' }}>Success</div>
          </div>
        )}
      </div>

      {/* Sub-tabs */}
      <div style={{ display:'flex', background:'#fff',
        borderBottom:'1px solid #E5E7EB', overflowX:'auto',
        padding:'0 12px' }}>
        {DTABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding:'10px 14px', fontSize:12, fontWeight:600,
              border:'none', background:'none', cursor:'pointer',
              whiteSpace:'nowrap', color: tab===t.key ? BLUE : '#9CA3AF',
              borderBottom: tab===t.key ? `2px solid ${BLUE}` : '2px solid transparent' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding:'12px 12px 30px' }}>
        {loading ? <Spinner /> : !dash
          ? <Empty icon="📊" text="No data available" />
          : <>
            {/* ── Overview ── */}
            {tab === 'overview' && (
              <div>
                <ScoreGrid items={[
                  { label:'Success Probability', val:succ,                         color:NAVY   },
                  { label:'Proficiency',         val:dash.proficiency_score||0,    color:GREEN  },
                  { label:'Exam Readiness',      val:dash.exam_readiness||0,       color:ORANGE },
                  { label:'Consistency',         val:dash.consistency_score||0,    color:TEAL   },
                ]} />

                {/* Paper progress */}
                <Card>
                  <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:12 }}>
                    📋 Paper Progress
                  </div>
                  {dash.gs_summary?.map(g => {
                    const col = PAPER_COL[g.gs_paper] || PAPER_COL['GS Paper 1'];
                    return (
                      <div key={g.gs_paper} style={{ marginBottom:10 }}>
                        <div style={{ display:'flex', justifyContent:'space-between',
                          marginBottom:3 }}>
                          <span style={{ fontSize:12, fontWeight:600,
                            color:col.text }}>{g.gs_paper}</span>
                          <span style={{ fontSize:12, fontWeight:800,
                            color:col.text }}>{g.pct||0}%</span>
                        </div>
                        <Bar pct={g.pct||0} color={col.top} />
                      </div>
                    );
                  })}
                </Card>

                {/* Consistency 7d + study time */}
                <Card>
                  <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:10 }}>
                    🔥 Recent Activity
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                    {[
                      { label:'7-Day Consistency', val:`${dash.consistency_7d||0}%`,  color:TEAL   },
                      { label:'Days Inactive',      val:studentMeta.days_since_active>=999?'Never':
                          `${studentMeta.days_since_active||0}d`,  color:RED    },
                      { label:'Weekly Cons.',       val:`${dash.consistency?.weekly?.consistency_pct||0}%`, color:GREEN },
                    ].map(s => (
                      <div key={s.label} style={{ background:'#F8FAFF', borderRadius:10,
                        padding:'10px 4px', textAlign:'center' }}>
                        <div style={{ fontSize:16, fontWeight:900, color:s.color }}>{s.val}</div>
                        <div style={{ fontSize:9, color:'#6B7280', marginTop:2, lineHeight:1.3 }}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* ── Subjects ── */}
            {tab === 'subjects' && (
              <div>
                {(() => {
                  // Group subjects by GS paper
                  const byPaper = {};
                  (dash.subjects||[]).forEach(s => {
                    if (!byPaper[s.gs_paper]) byPaper[s.gs_paper] = [];
                    byPaper[s.gs_paper].push(s);
                  });
                  return Object.entries(byPaper).map(([paper, subs]) => {
                    const col = PAPER_COL[paper] || PAPER_COL['GS Paper 1'];
                    const avg = Math.round(subs.reduce((s,sb)=>s+(sb.completion_pct||0),0)/subs.length);
                    return (
                      <Card key={paper} style={{ borderTop:`4px solid ${col.top}` }}>
                        <div style={{ display:'flex', justifyContent:'space-between',
                          alignItems:'center', marginBottom:10 }}>
                          <div style={{ fontSize:13, fontWeight:800, color:col.text }}>
                            {paper}
                          </div>
                          <div style={{ fontSize:12, fontWeight:800, color:col.text }}>
                            {avg}% avg
                          </div>
                        </div>
                        {subs.map(s => (
                          <div key={s.subject} style={{ marginBottom:8 }}>
                            <div style={{ display:'flex', justifyContent:'space-between',
                              marginBottom:3 }}>
                              <div style={{ fontSize:11, fontWeight:600, color:NAVY }}>
                                {s.subject}
                              </div>
                              <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                                {s.exam_type === 'both' ? (
                                  <span style={{ fontSize:10, color:'#9CA3AF' }}>
                                    P:{s.pre_pct||0}% M:{s.mains_pct||0}%
                                  </span>
                                ) : (
                                  <span style={{ fontSize:11, fontWeight:700, color:col.top }}>
                                    {s.completion_pct||0}%
                                  </span>
                                )}
                              </div>
                            </div>
                            <Bar pct={s.completion_pct||0} color={col.top} height={4} />
                          </div>
                        ))}
                      </Card>
                    );
                  });
                })()}
              </div>
            )}

            {/* ── Consistency ── */}
            {tab === 'consistency' && (
              <div>
                <Card>
                  <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:12 }}>
                    📊 Consistency Overview
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                    {[
                      { label:'This Week',  val:`${dash.consistency?.weekly?.consistency_pct||0}%`,  color:BLUE  },
                      { label:'This Month', val:`${dash.consistency?.monthly?.consistency_pct||0}%`, color:GREEN },
                      { label:'Overall',    val:`${dash.consistency?.overall?.consistency_pct||0}%`, color:TEAL  },
                    ].map(m => (
                      <div key={m.label} style={{ background:'#F8FAFF', borderRadius:10,
                        padding:'10px 4px', textAlign:'center' }}>
                        <div style={{ fontSize:18, fontWeight:900, color:m.color }}>{m.val}</div>
                        <div style={{ fontSize:9, color:'#6B7280', marginTop:2 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 30-day heatmap */}
                {dash.consistency?.heatmap && (
                  <Card>
                    <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:10 }}>
                      🔥 30-Day Activity
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:3 }}>
                      {dash.consistency.heatmap.map((d,i) => {
                        const s = d.score;
                        const bg = s===null?'#F0F0F0': s>=100?'#1B5E20': s>=60?'#F5A623':'#FECACA';
                        return (
                          <div key={i} title={`${d.date}: ${s!==null?s+'%':'No log'}`}
                            style={{ width:16, height:16, borderRadius:3, background:bg }} />
                        );
                      })}
                    </div>
                    <div style={{ display:'flex', gap:10, marginTop:10,
                      fontSize:10, color:'#6B7280', flexWrap:'wrap' }}>
                      {[['#1B5E20','Qualifying'],['#F5A623','Partial'],
                        ['#FECACA','Low'],['#F0F0F0','No log']].map(([c,l])=>(
                        <div key={l} style={{ display:'flex', gap:4, alignItems:'center' }}>
                          <div style={{ width:10, height:10, borderRadius:2, background:c }} />
                          <span>{l}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* ── Tests ── */}
            {tab === 'tests' && (
              <div>
                {[
                  { label:'📝 Prelims Tests', data:dash.test_scores?.prelims },
                  { label:'✍️ Mains Tests',   data:dash.test_scores?.mains   },
                ].map(({ label, data }) => (
                  <Card key={label}>
                    <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:10 }}>
                      {label}
                    </div>
                    {data?.length ? data.slice(0,10).map((t,i) => (
                      <div key={i} style={{ display:'flex', justifyContent:'space-between',
                        padding:'8px 0', borderBottom:'1px solid #F0F0F0', fontSize:12 }}>
                        <div style={{ flex:1, marginRight:10 }}>
                          <div style={{ fontWeight:600, color:NAVY }}>{t.test_name||t.test_code}</div>
                          <div style={{ fontSize:10, color:'#9CA3AF', marginTop:1 }}>{t.date}</div>
                        </div>
                        <div style={{ textAlign:'right', flexShrink:0 }}>
                          <div style={{ fontWeight:800, color:BLUE }}>
                            {t.marks_scored}/{t.marks_total}
                          </div>
                          <div style={{ fontSize:10, color:'#9CA3AF' }}>
                            {t.marks_total>0
                              ? Math.round(t.marks_scored/t.marks_total*100)+'%' : '—'}
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div style={{ fontSize:12, color:'#9CA3AF', textAlign:'center', padding:12 }}>
                        No tests attempted yet
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* ── Notes ── */}
            {tab === 'notes' && (
              <div>
                <Card>
                  <div style={{ fontSize:13, fontWeight:800, color:NAVY, marginBottom:10 }}>
                    📝 Add Note / Feedback
                  </div>
                  <textarea
                    value={note} onChange={e=>setNote(e.target.value)}
                    placeholder="Write feedback, observations or action items…"
                    style={{ width:'100%', minHeight:90, padding:'10px 12px',
                      borderRadius:10, border:'1.5px solid #E5E7EB', fontSize:13,
                      fontFamily:'inherit', resize:'vertical',
                      boxSizing:'border-box', outline:'none', marginBottom:10 }} />
                  <button
                    onClick={addNote}
                    disabled={saving || !note.trim()}
                    style={{ width:'100%', padding:'12px', borderRadius:10,
                      border:'none', cursor: saving||!note.trim() ? 'not-allowed':'pointer',
                      background: saving||!note.trim() ? '#E5E7EB' : NAVY,
                      color: saving||!note.trim() ? '#9CA3AF' : '#fff',
                      fontSize:13, fontWeight:700 }}>
                    {saving ? 'Saving…' : '💾 Save Note'}
                  </button>
                </Card>

                <div style={{ fontSize:12, color:'#9CA3AF', marginBottom:8, fontWeight:600 }}>
                  Previous Notes ({feedback.length})
                </div>
                {feedback.length ? feedback.map(f => (
                  <Card key={f.id} style={{ borderLeft:`3px solid ${TEAL}` }}>
                    <div style={{ fontSize:13, color:NAVY, lineHeight:1.5, marginBottom:6 }}>
                      {f.note}
                    </div>
                    <div style={{ fontSize:10, color:'#9CA3AF' }}>{f.created_date}</div>
                  </Card>
                )) : <Empty icon="📝" text="No notes yet — add the first one above" />}
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
}
