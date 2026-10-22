import { useState } from 'react'
import { useLocal, today } from '../useLocal.js'
import { SLOTS, STATUS, HUNGER, FEELINGS, QUOTES, SHOW_STREAK } from '../data.js'
import { streak, lastDays } from '../streak.js'

const music = d => {
  const f = d.feelings
  if ((d.stress ?? 0) >= 7 || f.includes('Anxious') || f.includes('Overwhelmed')) return ['slow, soft instrumentals', 'calming ambient piano']
  if (f.includes('Sad') || f.includes('Tired')) return ['gentle acoustic music', 'gentle acoustic chill']
  return ['light, easy listening', 'relaxing acoustic morning']
}

export default function Today({ goSupport }) {
  const [log, setLog] = useLocal('nourish:log', {})
  const [days, setDays] = useLocal('nourish:checkins', [])
  const [act, setAct] = useState('')
  const key = today()
  const d = { meals: {}, hunger: null, feelings: [], note: '', acts: [], stress: null, ...log[key] }
  const set = p => setLog({ ...log, [key]: { ...d, ...p } })
  const done = days.includes(key)
  const quote = QUOTES[Math.floor(Date.parse(key) / 864e5) % QUOTES.length]
  const [mLabel, mQuery] = music(d)
  const past = Object.keys(log).filter(k => k !== key).sort().reverse().slice(0, 14)
  const addAct = () => { if (act.trim()) { set({ acts: [...d.acts, { t: act.trim(), done: true }] }); setAct('') } }

  return (
    <>
      <section>
        <h2>Meal rhythm</h2>
        <p className="hint">Tap what's true right now. "Partly" is a real answer.</p>
        {SLOTS.map(s => (
          <div className="row" key={s}><span>{s}</span>
            <div className="seg" role="group" aria-label={s}>
              {STATUS.map(st => <button key={st} aria-pressed={(d.meals[s] || 'Not yet') === st}
                onClick={() => set({ meals: { ...d.meals, [s]: st } })}>{st}</button>)}
            </div></div>
        ))}
      </section>

      <section>
        <h2>How does your body feel?</h2>
        <div className="chips">{HUNGER.map(h => <button key={h} aria-pressed={d.hunger === h} onClick={() => set({ hunger: h })}>{h}</button>)}</div>
        <h2>Mood</h2>
        <div className="chips">{FEELINGS.map(f => <button key={f} aria-pressed={d.feelings.includes(f)}
          onClick={() => set({ feelings: d.feelings.includes(f) ? d.feelings.filter(x => x !== f) : [...d.feelings, f] })}>{f}</button>)}</div>
        <label className="field">Stress right now: {d.stress ?? 'not set'}{d.stress ? ' of 10' : ''}
          <input type="range" min="1" max="10" value={d.stress ?? 5} onChange={e => set({ stress: +e.target.value })} />
        </label>
        {(d.feelings.includes('Overwhelmed') || d.feelings.includes('Guilty') || d.stress >= 9) &&
          <p className="nudge">That sounds heavy. <button className="link" onClick={goSupport}>Open your toolkit</button></p>}
      </section>

      <section>
        <h2>What did you do today?</h2>
        {d.acts.length === 0 && <p className="hint">Nothing added yet. Anything counts: a shower, a call, a task.</p>}
        {d.acts.map((a, i) => (
          <label className="row" key={i}><span><input type="checkbox" checked={a.done} style={{ display: 'inline', width: 'auto' }}
            onChange={() => set({ acts: d.acts.map((x, j) => j === i ? { ...x, done: !x.done } : x) })} /> {a.t}</span>
            <button onClick={() => set({ acts: d.acts.filter((_, j) => j !== i) })} aria-label={`Remove ${a.t}`}>Remove</button></label>
        ))}
        <input value={act} placeholder="Add your own" onChange={e => setAct(e.target.value)} onKeyDown={e => e.key === 'Enter' && addAct()} />
        <button onClick={addAct} disabled={!act.trim()}>Add</button>
        <textarea placeholder="Anything you want to remember or tell your treatment team?" value={d.note} onChange={e => set({ note: e.target.value })} />
      </section>

      <section>
        <h2>Check in</h2>
        <button aria-pressed={done} disabled={done} onClick={() => setDays([...new Set([...days, key])])}>
          {done ? 'Checked in today' : 'Check in for today'}</button>
        <p className="hint">{lastDays(days, key)} of the last 7 days{SHOW_STREAK && streak(days, key) > 0 ? ` · ${streak(days, key)} days in a row` : ''}. Missing a day never erases anything.</p>
        {done && <p className="nudge">{quote}</p>}
        {(d.stress != null || d.feelings.length > 0) && (
          <p className="hint">If it helps, you might try {mLabel}:{' '}
            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(mQuery)}`} target="_blank" rel="noreferrer">search for it</a>.
            Nourish doesn't play music, and this isn't treatment or a diagnosis.</p>)}
      </section>

      <section>
        <details><summary>Past check-ins</summary>
          {past.length === 0 && <p className="hint">Your earlier days will show up here.</p>}
          {past.map(k => <p key={k}><strong>{k}</strong>{log[k].stress ? ` · stress ${log[k].stress}/10` : ''}{log[k].feelings?.length ? ` · ${log[k].feelings.join(', ')}` : ''}<br />{log[k].note}</p>)}
        </details>
      </section>
    </>
  )
}
