import { useLocal } from '../useLocal.js'
import { SLOTS, DAYS } from '../data.js'
import { RECIPES } from '../recipes.js'

// Stored as 'r:<recipeId>' | 'o:<free text>' (plain strings from older versions are treated as free text).
const parse = v => !v ? ['', ''] : v.startsWith('r:') ? [v.slice(2), ''] : [ '__other', v.replace(/^o:/, '')]

export default function Plan() {
  const [plan, setPlan] = useLocal('nourish:plan', {})
  const [day, setDay] = useLocal('nourish:planDay', 'Mon')
  const put = (slot, v) => setPlan({ ...plan, [day]: { ...(plan[day] || {}), [slot]: v } })
  const planned = SLOTS.filter(s => plan[day]?.[s]).length
  return (
    <section>
      <h2>Weekly plan</h2>
      <p className="hint">Pick a recipe or write your own. Changes save automatically; choose the blank option to remove one.</p>
      <div className="chips">{DAYS.map(x => <button key={x} aria-pressed={day === x} onClick={() => setDay(x)}>{x} {SLOTS.some(s => plan[x]?.[s]) ? '•' : ''}</button>)}</div>
      {planned === 0 && <p className="hint">Nothing planned for {day} yet. That's okay.</p>}
      {SLOTS.map(s => {
        const [sel, text] = parse(plan[day]?.[s])
        const rec = RECIPES.find(r => r.id === sel)
        return (
          <label className="field" key={s}>{s}
            <select value={sel} onChange={e => put(s, e.target.value === '__other' ? 'o:' : e.target.value ? 'r:' + e.target.value : '')}>
              <option value="">Not planned</option>
              {RECIPES.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
              <option value="__other">Other…</option>
            </select>
            {rec && <span className="hint"> {rec.note}</span>}
            {sel === '__other' && <input value={text} placeholder="What would you like to eat?" onChange={e => put(s, 'o:' + e.target.value)} />}
          </label>
        )
      })}
    </section>
  )
}