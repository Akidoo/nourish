const prev = s => new Date(Date.parse(s + 'T00:00:00Z') - 864e5).toISOString().slice(0, 10)
// Consecutive check-in days. Stays alive through today, so the run only ends once a full day is missed.
export function streak(dates, todayStr) {
  const set = new Set(dates)
  let d = set.has(todayStr) ? todayStr : prev(todayStr), n = 0
  while (set.has(d)) { n++; d = prev(d) }
  return n
}
export function lastDays(dates, todayStr, n = 7) {
  const set = new Set(dates); let d = todayStr, c = 0
  for (let i = 0; i < n; i++) { if (set.has(d)) c++; d = prev(d) }
  return c
}
