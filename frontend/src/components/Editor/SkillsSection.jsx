import React, { useState } from 'react'

function SkillsGroup({ label, skills, onChange }) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    if (!skills.includes(trimmed)) {
      onChange([...skills, trimmed])
    }
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAdd()
    }
    if (e.key === 'Backspace' && !input && skills.length > 0) {
      onChange(skills.slice(0, -1))
    }
  }

  const removeSkill = (skill) => {
    onChange(skills.filter(s => s !== skill))
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-2">{label}</label>
      <div className="flex flex-wrap gap-1.5 p-2 border border-gray-300 rounded bg-white min-h-[42px] focus-within:ring-1 focus-within:ring-gray-400 focus-within:border-gray-400 transition-colors">
        {skills.filter(s => s.trim()).map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-gray-400 hover:text-gray-600 leading-none"
            >
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleAdd}
          placeholder={skills.length === 0 ? 'Type a skill and press Enter...' : ''}
          className="flex-1 min-w-[120px] text-sm outline-none bg-transparent placeholder-gray-400"
        />
      </div>
      <p className="mt-1 text-xs text-gray-400">Press Enter or comma to add</p>
    </div>
  )
}

export default function SkillsSection({ skills, onUpdateSkills }) {
  return (
    <div className="space-y-4">
      <SkillsGroup
        label="Technical Skills"
        skills={skills.technical || []}
        onChange={(val) => onUpdateSkills('technical', val)}
      />
      <SkillsGroup
        label="Soft Skills"
        skills={skills.soft || []}
        onChange={(val) => onUpdateSkills('soft', val)}
      />
    </div>
  )
}
