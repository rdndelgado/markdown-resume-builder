import React, { useState } from 'react'
import { useAIImprove } from '../../hooks/useAIImprove'
import AIImproveButton from './AIImproveButton'
import AISuggestionBox from './AISuggestionBox'

const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white placeholder-gray-400"
const labelClass = "block text-xs font-medium text-gray-600 mb-1"

function BulletRow({ expId, bulletIndex, bullet, role, company, onUpdate, onRemove, onAdd, isLast }) {
  const { loading, error, improved, improve, reset } = useAIImprove()

  const handleImprove = () => {
    const context = [role, company].filter(Boolean).join(' at ')
    improve(bullet, context, 'bullet')
  }

  const handleAccept = () => {
    onUpdate(expId, bulletIndex, improved)
    reset()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isLast) onAdd(expId)
    }
  }

  return (
    <div>
      <div className="flex items-start gap-1.5">
        <span className="mt-2.5 text-gray-400 text-sm flex-shrink-0">•</span>
        <input
          type="text"
          value={bullet}
          onChange={(e) => onUpdate(expId, bulletIndex, e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe an achievement or responsibility..."
          className="flex-1 px-2.5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white placeholder-gray-400"
        />
        <AIImproveButton
          onClick={handleImprove}
          loading={loading}
          disabled={!bullet?.trim()}
        />
        <button
          type="button"
          onClick={() => onRemove(expId, bulletIndex)}
          className="mt-0.5 p-1.5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          title="Remove bullet"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
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

function ExperienceEntry({ exp, onUpdate, onRemove, onUpdateBullet, onAddBullet, onRemoveBullet }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 bg-gray-50 rounded-t-lg">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 flex-1 text-left"
        >
          <svg
            className={`w-3.5 h-3.5 text-gray-500 transition-transform ${collapsed ? '-rotate-90' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="text-sm font-medium text-gray-700 truncate">
            {exp.role || exp.company || 'New Position'}
            {(exp.role && exp.company) ? ` @ ${exp.company}` : ''}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onRemove(exp.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
          title="Remove experience"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Job Title</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => onUpdate(exp.id, 'role', e.target.value)}
                placeholder="Software Engineer"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                placeholder="Acme Corp"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="text"
                value={exp.start_date}
                onChange={(e) => onUpdate(exp.id, 'start_date', e.target.value)}
                placeholder="Jan 2022"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input
                type="text"
                value={exp.end_date}
                onChange={(e) => onUpdate(exp.id, 'end_date', e.target.value)}
                placeholder="Present"
                disabled={exp.current}
                className={`${inputClass} ${exp.current ? 'bg-gray-50 text-gray-400' : ''}`}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => onUpdate(exp.id, 'current', e.target.checked)}
              className="w-4 h-4 text-gray-700 border-gray-300 rounded focus:ring-gray-400"
            />
            <span className="text-xs text-gray-600">Currently working here</span>
          </label>

          <div>
            <label className={labelClass}>Key Achievements / Responsibilities</label>
            <div className="space-y-2">
              {exp.bullets.map((bullet, index) => (
                <BulletRow
                  key={index}
                  expId={exp.id}
                  bulletIndex={index}
                  bullet={bullet}
                  role={exp.role}
                  company={exp.company}
                  onUpdate={onUpdateBullet}
                  onRemove={onRemoveBullet}
                  onAdd={onAddBullet}
                  isLast={index === exp.bullets.length - 1}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => onAddBullet(exp.id)}
              className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add bullet
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ExperienceSection({
  experience,
  onAdd,
  onUpdate,
  onRemove,
  onUpdateBullet,
  onAddBullet,
  onRemoveBullet
}) {
  return (
    <div className="space-y-3">
      {experience.length === 0 && (
        <p className="text-sm text-gray-400 italic text-center py-4">
          No experience entries yet. Add your first position below.
        </p>
      )}
      {experience.map(exp => (
        <ExperienceEntry
          key={exp.id}
          exp={exp}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onUpdateBullet={onUpdateBullet}
          onAddBullet={onAddBullet}
          onRemoveBullet={onRemoveBullet}
        />
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Experience
      </button>
    </div>
  )
}
