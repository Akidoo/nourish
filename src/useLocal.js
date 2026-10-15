import { useState, useEffect } from 'react'
// Swap this hook for an API/db later; every page only talks to it.
export function useLocal(key, initial) {
  const [val, setVal] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : initial } catch { return initial }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} }, [key, val])
  return [val, setVal]
}
export const today = () => new Date().toISOString().slice(0, 10)
