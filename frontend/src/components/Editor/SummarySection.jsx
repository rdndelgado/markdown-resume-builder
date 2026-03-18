import React from 'react'
import { useAIImprove } from '../../hooks/useAIImprove'
import AIImproveButton from './AIImproveButton'
import AISuggestionBox from './AISuggestionBox'

export default function SummarySection({ summary, name, title, onUpdate }) {
  const { loading, error, improved, improve, reset } = useAIImprove()

  const handleImprove = () => {
    const context = [title, name].filter(Boolean).join(' — ')
    improve(summary, context, 'summary')
  }

  const handleAccept = () => {
    onUpdate(improved)
    reset()
  }

  return (
    <div>
      <div className="flex items-start gap-2">
        <textarea
          value={summary}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Write a brief professional summary highlighting your key experience and goals..."
          rows={4}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white placeholder-gray-400 resize-none"
        />
        <div className="pt-0.5">
          <AIImproveButton
            onClick={handleImprove}
            loading={loading}
            disabled={!summary?.trim()}
          />
        </div>
      </div>
      <AISuggestionBox
        improved={improved}
        error={error}
        onAccept={handleAccept}
        onDiscard={reset}
      />
    </div>
  )
}
