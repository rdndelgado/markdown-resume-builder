import React, { useState, useEffect } from 'react'
import { useResumeState } from './hooks/useResumeState'
import Editor from './components/Editor'
import Preview from './components/Preview'
import ThemeSwitcher from './components/ThemeSwitcher'
import ExportBar from './components/ExportBar'

// Import print CSS for all themes
import './themes/classic-print.css'
import './themes/modern-print.css'
import './themes/minimal-print.css'

export default function App() {
  const [mobileTab, setMobileTab] = useState('editor') // 'editor' | 'preview'

  const {
    resumeData,
    updatePersonal,
    updateMeta,
    addExperience,
    updateExperience,
    removeExperience,
    updateBullet,
    addBullet,
    removeBullet,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    addCertification,
    updateCertification,
    removeCertification,
  } = useResumeState()

  const theme = resumeData?.meta?.theme || 'classic'

  // Apply print theme class to body for print CSS targeting
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header / Toolbar */}
      <header className="no-print sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">
              Resume<span className="text-gray-400 font-light">Builder</span>
            </h1>
            <span className="hidden sm:inline text-gray-300">|</span>
            <ThemeSwitcher
              currentTheme={theme}
              onThemeChange={(t) => updateMeta('theme', t)}
            />
          </div>
          <ExportBar resumeData={resumeData} />
        </div>

        {/* Mobile Tab Toggle */}
        <div className="md:hidden border-t border-gray-100 flex">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              mobileTab === 'editor'
                ? 'bg-gray-800 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              mobileTab === 'preview'
                ? 'bg-gray-800 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Preview
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Desktop: Split layout */}
        <div className="hidden md:flex flex-1 overflow-hidden">
          {/* Editor Panel */}
          <div className="w-2/5 overflow-y-auto bg-gray-50 border-r border-gray-200">
            <div className="p-4">
              <Editor
                resumeData={resumeData}
                onUpdatePersonal={updatePersonal}
                onAddExperience={addExperience}
                onUpdateExperience={updateExperience}
                onRemoveExperience={removeExperience}
                onUpdateBullet={updateBullet}
                onAddBullet={addBullet}
                onRemoveBullet={removeBullet}
                onAddEducation={addEducation}
                onUpdateEducation={updateEducation}
                onRemoveEducation={removeEducation}
                onUpdateSkills={updateSkills}
                onAddCertification={addCertification}
                onUpdateCertification={updateCertification}
                onRemoveCertification={removeCertification}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-3/5 overflow-y-auto bg-gray-100">
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Live Preview
                </span>
                <span className="text-xs text-gray-400 capitalize">{theme} theme</span>
              </div>
              <Preview resumeData={resumeData} />
            </div>
          </div>
        </div>

        {/* Mobile: Single panel with tabs */}
        <div className="md:hidden flex-1 overflow-y-auto">
          {mobileTab === 'editor' ? (
            <div className="p-4">
              <Editor
                resumeData={resumeData}
                onUpdatePersonal={updatePersonal}
                onAddExperience={addExperience}
                onUpdateExperience={updateExperience}
                onRemoveExperience={removeExperience}
                onUpdateBullet={updateBullet}
                onAddBullet={addBullet}
                onRemoveBullet={removeBullet}
                onAddEducation={addEducation}
                onUpdateEducation={updateEducation}
                onRemoveEducation={removeEducation}
                onUpdateSkills={updateSkills}
                onAddCertification={addCertification}
                onUpdateCertification={updateCertification}
                onRemoveCertification={removeCertification}
              />
            </div>
          ) : (
            <div className="p-3">
              <Preview resumeData={resumeData} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
