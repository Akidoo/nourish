import { useLocal, today } from '../useLocal.js'
import { MOVES } from '../data.js'

// No minutes, no calories burned, no streaks. Movement is optional and framed as care.
export default function Move() {
  const [picked, setPicked] = useLocal('nourish:move', {})
  const cur = picked[today()]
  return (
    <section>
      <h2>Gentle movement</h2>
      <p className="hint">Only choose something if your treatment team says movement is okay for you right now. Resting is always a valid pick.</p>
      {MOVES.map(m => (
        <button className="card" key={m} aria-pressed={cur === m}
          onClick={() => setPicked({ ...picked, [today()]: cur === m ? null : m })}>{m}</button>
      ))}
    </section>
  )
}
