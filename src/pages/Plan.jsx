import { useLocal } from '../useLocal.js'
import { SLOTS, DAYS } from '../data.js'

// Planning = ideas and structure only. Deliberately no calories, macros or portions.
export default function Plan() {
  const [plan, setPlan] = useLocal('nourish:plan', {})
  const [day, setDay] = useLocal('nourish:planDay', 'Mon')
  const upd = (slot, v) => setPlan({ ...plan, [day]: { ...(plan[day] || {}), [slot]: v } })
  return (
    <section>
      <h2>Weekly plan</h2>
      <p className="hint">Write what you'd like to eat in your own words. If you work with a dietitian, follow their plan; this is just a place to hold it.</p>
      <div className="chips">
        {DAYS.map(x => <button key={x} aria-pressed={day === x} onClick={() => setDay(x)}>{x}</button>)}
      </div>
      {SLOTS.map(s => (
        <label className="field" key={s}>{s}
          <input value={plan[day]?.[s] || ''} onChange={e => upd(s, e.target.value)} placeholder="e.g. toast and eggs" />
        </label>
      ))}
    </section>
  )
}
