import React from 'react'

const THEMES = [
  { id: 'classic', label: 'Classic', description: 'Traditional serif' },
  { id: 'modern', label: 'Modern', description: 'Two-column sidebar' },
  { id: 'minimal', label: 'Minimal', description: 'Ultra-clean' },
]

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 mr-1 hidden sm:inline">Theme:</span>
      <div className="flex gap-1">
        {THEMES.map(theme => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            title={theme.description}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              currentTheme === theme.id
                ? 'bg-gray-800 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  )
}
