import { useState, useCallback } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export function useAIImprove() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [improved, setImproved] = useState(null)

  const improve = useCallback(async (text, context, field) => {
    if (!text || !text.trim()) return
    setLoading(true)
    setError(null)
    setImproved(null)

    try {
      const response = await fetch(`${API_BASE}/api/improve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context, field }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.detail || `Server error: ${response.status}`)
      }

      const data = await response.json()
      setImproved(data.improved)
      return data.improved
    } catch (err) {
      setError(err.message || 'Failed to improve text')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setImproved(null)
    setError(null)
  }, [])

  return { loading, error, improved, improve, reset }
}
