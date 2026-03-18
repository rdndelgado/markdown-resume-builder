import React, { useState } from 'react'

const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white placeholder-gray-400"
const labelClass = "block text-xs font-medium text-gray-600 mb-1"

function EducationEntry({ edu, onUpdate, onRemove }) {
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
            {edu.degree || edu.institution || 'New Education'}
            {(edu.degree && edu.institution) ? ` — ${edu.institution}` : ''}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onRemove(edu.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
          title="Remove education"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-3">
          <div>
            <label className={labelClass}>Institution</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => onUpdate(edu.id, 'institution', e.target.value)}
              placeholder="MIT"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                placeholder="B.S."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Field of Study</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => onUpdate(edu.id, 'field', e.target.value)}
                placeholder="Computer Science"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Start Year</label>
              <input
                type="text"
                value={edu.start_date}
                onChange={(e) => onUpdate(edu.id, 'start_date', e.target.value)}
                placeholder="2018"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>End Year</label>
              <input
                type="text"
                value={edu.end_date}
                onChange={(e) => onUpdate(edu.id, 'end_date', e.target.value)}
                placeholder="2022"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EducationSection({ education, onAdd, onUpdate, onRemove }) {
  return (
    <div className="space-y-3">
      {education.length === 0 && (
        <p className="text-sm text-gray-400 italic text-center py-4">
          No education entries yet.
        </p>
      )}
      {education.map(edu => (
        <EducationEntry
          key={edu.id}
          edu={edu}
          onUpdate={onUpdate}
          onRemove={onRemove}
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
        Add Education
      </button>
    </div>
  )
}
