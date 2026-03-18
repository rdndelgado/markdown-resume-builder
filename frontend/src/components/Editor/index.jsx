import React, { useState } from 'react'
import PersonalSection from './PersonalSection'
import SummarySection from './SummarySection'
import ExperienceSection from './ExperienceSection'
import EducationSection from './EducationSection'
import SkillsSection from './SkillsSection'
import CertificationsSection from './CertificationsSection'

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: '👤' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'certifications', label: 'Certifications', icon: '🏆' },
]

function AccordionSection({ id, label, icon, isOpen, onToggle, children }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{icon}</span>
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? '' : '-rotate-90'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 py-4 bg-gray-50 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Editor({
  resumeData,
  onUpdatePersonal,
  onAddExperience,
  onUpdateExperience,
  onRemoveExperience,
  onUpdateBullet,
  onAddBullet,
  onRemoveBullet,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
  onUpdateSkills,
  onAddCertification,
  onUpdateCertification,
  onRemoveCertification,
}) {
  const [openSections, setOpenSections] = useState(new Set(['personal']))

  const toggleSection = (id) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const { personal, experience, education, skills, certifications } = resumeData

  return (
    <div className="space-y-2">
      <AccordionSection
        id="personal"
        label="Personal Info"
        icon="👤"
        isOpen={openSections.has('personal')}
        onToggle={toggleSection}
      >
        <PersonalSection personal={personal} onUpdate={onUpdatePersonal} />
      </AccordionSection>

      <AccordionSection
        id="summary"
        label="Summary"
        icon="📝"
        isOpen={openSections.has('summary')}
        onToggle={toggleSection}
      >
        <SummarySection
          summary={personal.summary}
          name={personal.name}
          title={personal.title}
          onUpdate={(val) => onUpdatePersonal('summary', val)}
        />
      </AccordionSection>

      <AccordionSection
        id="experience"
        label="Experience"
        icon="💼"
        isOpen={openSections.has('experience')}
        onToggle={toggleSection}
      >
        <ExperienceSection
          experience={experience}
          onAdd={onAddExperience}
          onUpdate={onUpdateExperience}
          onRemove={onRemoveExperience}
          onUpdateBullet={onUpdateBullet}
          onAddBullet={onAddBullet}
          onRemoveBullet={onRemoveBullet}
        />
      </AccordionSection>

      <AccordionSection
        id="education"
        label="Education"
        icon="🎓"
        isOpen={openSections.has('education')}
        onToggle={toggleSection}
      >
        <EducationSection
          education={education}
          onAdd={onAddEducation}
          onUpdate={onUpdateEducation}
          onRemove={onRemoveEducation}
        />
      </AccordionSection>

      <AccordionSection
        id="skills"
        label="Skills"
        icon="⚡"
        isOpen={openSections.has('skills')}
        onToggle={toggleSection}
      >
        <SkillsSection skills={skills} onUpdateSkills={onUpdateSkills} />
      </AccordionSection>

      <AccordionSection
        id="certifications"
        label="Certifications"
        icon="🏆"
        isOpen={openSections.has('certifications')}
        onToggle={toggleSection}
      >
        <CertificationsSection
          certifications={certifications}
          onAdd={onAddCertification}
          onUpdate={onUpdateCertification}
          onRemove={onRemoveCertification}
        />
      </AccordionSection>
    </div>
  )
}
