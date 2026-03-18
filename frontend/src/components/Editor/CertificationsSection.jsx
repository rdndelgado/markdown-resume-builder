import React from 'react'

const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white placeholder-gray-400"
const labelClass = "block text-xs font-medium text-gray-600 mb-1"

function CertificationEntry({ cert, onUpdate, onRemove }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <label className={labelClass}>Certification Name</label>
          <input
            type="text"
            value={cert.name}
            onChange={(e) => onUpdate(cert.id, 'name', e.target.value)}
            placeholder="AWS Solutions Architect"
            className={inputClass}
          />
        </div>
        <button
          type="button"
          onClick={() => onRemove(cert.id)}
          className="mt-5 p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          title="Remove certification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Issuer</label>
          <input
            type="text"
            value={cert.issuer}
            onChange={(e) => onUpdate(cert.id, 'issuer', e.target.value)}
            placeholder="Amazon Web Services"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Year</label>
          <input
            type="text"
            value={cert.year}
            onChange={(e) => onUpdate(cert.id, 'year', e.target.value)}
            placeholder="2023"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}

export default function CertificationsSection({ certifications, onAdd, onUpdate, onRemove }) {
  return (
    <div className="space-y-3">
      {certifications.length === 0 && (
        <p className="text-sm text-gray-400 italic text-center py-4">
          No certifications yet.
        </p>
      )}
      {certifications.map(cert => (
        <CertificationEntry
          key={cert.id}
          cert={cert}
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
        Add Certification
      </button>
    </div>
  )
}
