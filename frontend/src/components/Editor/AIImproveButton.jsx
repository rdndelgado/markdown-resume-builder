import React from 'react'

export default function AIImproveButton({ onClick, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      title="Improve with AI"
      className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 text-xs rounded transition-all ${
        loading
          ? 'bg-amber-100 text-amber-500 cursor-not-allowed'
          : disabled
          ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
          : 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200 hover:border-amber-300'
      }`}
    >
      {loading ? (
        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      ) : (
        <span className="text-sm leading-none">✨</span>
      )}
      <span className="hidden sm:inline">{loading ? 'Improving...' : 'Improve'}</span>
    </button>
  )
}
