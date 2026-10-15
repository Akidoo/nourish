import { useLocal, today } from '../useLocal.js'
import { SLOTS, STATUS, HUNGER, FEELINGS } from '../data.js'

export default function Today({ goSupport }) {
  const [log, setLog] = useLocal('nourish:log', {})
  const d = log[today()] || { meals: {}, hunger: null, feelings: [], note: '' }
  const set = patch => setLog({ ...log, [today()]: { ...d, ...patch } })
  const toggleFeeling = f =>
    set({ feelings: d.feelings.includes(f) ? d.feelings.filter(x => x !== f) : [...d.feelings, f] })

  return (
    <>
      <section>
        <h2>Meal rhythm</h2>
        <p className="hint">Eating regularly is the work. Tap what's true right now. "Partly" is a real answer.</p>
        {SLOTS.map(s => (
          <div className="row" key={s}>
            <span>{s}</span>
            <div className="seg" role="group" aria-label={s}>
              {STATUS.map(st => (
                <button key={st} aria-pressed={(d.meals[s] || 'Not yet') === st}
                  onClick={() => set({ meals: { ...d.meals, [s]: st } })}>{st}</button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2>How does your body feel?</h2>
        <div className="chips">
          {HUNGER.map(h => (
            <button key={h} aria-pressed={d.hunger === h} onClick={() => set({ hunger: h })}>{h}</button>
          ))}
        </div>
        <h2>And you?</h2>
        <div className="chips">
          {FEELINGS.map(f => (
            <button key={f} aria-pressed={d.feelings.includes(f)} onClick={() => toggleFeeling(f)}>{f}</button>
          ))}
        </div>
        <textarea placeholder="Anything you want to remember or tell your treatment team?"
          value={d.note} onChange={e => set({ note: e.target.value })} />
        {(d.feelings.includes('Overwhelmed') || d.feelings.includes('Guilty')) && (
          <p className="nudge">That sounds heavy. <button className="link" onClick={goSupport}>Open your toolkit</button></p>
        )}
      </section>
    </>
  )
}
