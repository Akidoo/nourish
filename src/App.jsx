import { useState } from 'react'
import Today from './pages/Today.jsx'
import Plan from './pages/Plan.jsx'
import Move from './pages/Move.jsx'
import Support from './pages/Support.jsx'

const TABS = [
  ['today', 'Today', Today],
  ['plan', 'Plan', Plan],
  ['move', 'Move', Move],
  ['support', 'Support', Support],
]

export default function App() {
  const [tab, setTab] = useState('today')
  const Page = TABS.find(t => t[0] === tab)[2]
  return (
    <div className="shell">
      <header>
        <h1>Nourish</h1>
        <p className="sub">Regular meals, kind movement, no numbers.</p>
      </header>
      <nav aria-label="Sections">
        {TABS.map(([id, label]) => (
          <button key={id} aria-current={tab === id} onClick={() => setTab(id)}>{label}</button>
        ))}
      </nav>
      <main><Page goSupport={() => setTab('support')} /></main>
      <footer>
        Nourish supports recovery but is not treatment. If you feel unsafe, go to <button className="link" onClick={() => setTab('support')}>Support</button>.
      </footer>
    </div>
  )
}
