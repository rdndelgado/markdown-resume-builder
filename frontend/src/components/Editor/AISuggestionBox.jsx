import React from 'react'

export default function AISuggestionBox({ improved, onAccept, onDiscard, error }) {
  if (!improved && !error) return null

  if (error) {
    return (
      <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded text-xs text-red-700">
        <div className="flex items-start gap-1.5">
          <span className="flex-shrink-0 mt-0.5">⚠️</span>
          <div>
            <span className="font-medium">AI Error: </span>{error}
          </div>
        </div>
        <button onClick={onDiscard} className="mt-1.5 text-red-600 hover:text-red-800 underline text-xs">
          Dismiss
        </button>
      </div>
    )
  }

  return (
    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded">
      <div className="flex items-center gap-1 mb-1.5">
        <span className="text-sm">✨</span>
        <span className="text-xs font-semibold text-amber-800">AI Suggestion</span>
      </div>
      <p className="text-xs text-gray-800 leading-relaxed mb-2.5">{improved}</p>
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="px-2.5 py-1 bg-amber-500 text-white text-xs font-medium rounded hover:bg-amber-600 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={onDiscard}
          className="px-2.5 py-1 bg-white text-gray-600 text-xs font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Discard
        </button>
      </div>
    </div>
  )
}
