import { COPING, RESOURCES } from '../data.js'

export default function Support() {
  return (
    <>
      <section className="alert">
        <h2>If you're in immediate danger</h2>
        <p>Contact emergency services or someone near you right now.</p>
        {RESOURCES.map(r => <p key={r.name}><strong>{r.name}</strong><br />{r.detail}</p>)}
      </section>
      <section>
        <h2>When an urge hits</h2>
        <p className="hint">Pick one. You don't have to do all of them.</p>
        <ul>{COPING.map(c => <li key={c}>{c}</li>)}</ul>
      </section>
    </>
  )
}
