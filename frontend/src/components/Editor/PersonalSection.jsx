import React from 'react'

const inputClass = "w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white placeholder-gray-400"
const labelClass = "block text-xs font-medium text-gray-600 mb-1"

export default function PersonalSection({ personal, onUpdate }) {
  const handleChange = (field) => (e) => onUpdate(field, e.target.value)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={personal.name}
            onChange={handleChange('name')}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Job Title</label>
          <input
            type="text"
            value={personal.title}
            onChange={handleChange('title')}
            placeholder="Software Engineer"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={personal.email}
            onChange={handleChange('email')}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={personal.phone}
            onChange={handleChange('phone')}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Location</label>
        <input
          type="text"
          value={personal.location}
          onChange={handleChange('location')}
          placeholder="San Francisco, CA"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>LinkedIn</label>
          <input
            type="text"
            value={personal.linkedin}
            onChange={handleChange('linkedin')}
            placeholder="linkedin.com/in/janesmith"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Website</label>
          <input
            type="text"
            value={personal.website}
            onChange={handleChange('website')}
            placeholder="janesmith.dev"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}
