import { useState } from 'react'
import { useLocal, today } from '../useLocal.js'
import { MOVE_TYPES } from '../data.js'

export default function Move() {
  const [cfg, setCfg] = useLocal('nourish:moveCfg', { on: false, target: 20 })
  const [logs, setLogs] = useLocal('nourish:moves', [])
  const [type, setType] = useState('Walk')
  const [min, setMin] = useState('')
  const key = today()
  const mine = logs.filter(l => l.date === key)
  const total = mine.reduce((a, l) => a + l.min, 0)
  const reached = total >= cfg.target
  const R = 40, C = 2 * Math.PI * R
  const add = () => { const m = Math.round(+min); if (m >= 1 && m <= 180) { setLogs([...logs, { id: Date.now(), date: key, type, min: m, src: 'Manual' }]); setMin('') } }

  if (!cfg.on) return (
    <section>
      <h2>Gentle movement</h2>
      <p className="hint">Movement tracking is off. Resting is always a good choice. Only turn this on if your treatment team has said movement is okay for you right now.</p>
      <button onClick={() => setCfg({ ...cfg, on: true })}>My team is fine with it. Turn on tracking</button>
    </section>)

  return (
    <section>
      <h2>Movement today</h2>
      <svg width="110" height="110" viewBox="0 0 100 100" role="img" aria-label={`${total} of ${cfg.target} minutes`}>
        <circle cx="50" cy="50" r={R} fill="none" stroke="var(--line)" strokeWidth="9" />
        <circle cx="50" cy="50" r={R} fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - Math.min(1, total / cfg.target))} transform="rotate(-90 50 50)" />
        <text x="50" y="55" textAnchor="middle" fontSize="16" fill="currentColor">{total}/{cfg.target}</text>
      </svg>
      {reached && <p className="nudge">You've met today's goal. You're welcome to rest now, and there's no need to do more.</p>}
      <div className="chips">{MOVE_TYPES.map(t => <button key={t} aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>)}</div>
      <label className="field">Minutes (1 to 180)<input type="number" min="1" max="180" value={min} onChange={e => setMin(e.target.value)} /></label>
      <button onClick={add} disabled={!(+min >= 1 && +min <= 180)}>Log it</button>
      {mine.length === 0 && <p className="hint">Nothing logged today. Rest counts too.</p>}
      {mine.map(l => <div className="row" key={l.id}><span>{l.type}, {l.min} min <span className="hint">({l.src})</span></span>
        <button onClick={() => setLogs(logs.filter(x => x.id !== l.id))}>Remove</button></div>)}
      <label className="field">Daily goal (minutes)
        <input type="number" min="5" max="60" step="5" value={cfg.target} onChange={e => setCfg({ ...cfg, target: Math.min(60, Math.max(5, +e.target.value || 5)) })} /></label>
      <p className="hint">Movement is never a way to make up for eating. Everything here is logged by you; nothing is imported from a device.</p>
      <button className="link" onClick={() => setCfg({ ...cfg, on: false })}>Turn off tracking</button>
    </section>
  )
}